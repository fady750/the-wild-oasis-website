"use server"

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth"
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction(){
    await signIn("google", {redirectTo:"/account"})
}

export async function updateProfile(formDate){
    const session = await auth();
    if(!session) throw new Error ("You must be logged in");
    const nationalID = formDate.get("nationalID");
    const [nationality, countryFlag] = formDate.get("nationality").split("%");

    if(!/^[a-zA-z0-9]{6,12}$/.test(nationalID)) throw new Error("Please Provide a valid national ID");

    const updateDate = { nationality, countryFlag, nationalID }
    const { data, error } = await supabase
    .from('guests')
    .update(updateDate)
    .eq('id', session.user.guestId);
    if (error) { throw new Error('Guest could not be updated'); }    
    revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId){
    const session = await auth();
    if(!session) throw new Error ("You must be logged in");

    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking)=>booking.id);
    
    if(!guestBookingsIds.includes(bookingId)) throw new Error("you are not allowed to delete this booking ");
    const { data, error } = await supabase.from('bookings').delete().eq('id', bookingId);

    if (error) {
        throw new Error('Booking could not be deleted');
    }
    revalidatePath("/account/reservations");

}

export async function updateReservation(formDate){
    const session = await auth();
    if(!session) throw new Error ("You must be logged in");

    const numGuests = Number(formDate.get("numGuests"));
    const reservationID = Number(formDate.get("reservationID"));
    const observations = formDate.get("observations");
    if(numGuests <= 0) throw new Error("please select correct guest number");
    const guestBookings = await getBookings(session.user.guestId);
    const guestBookingsIds = guestBookings.map((booking)=>booking.id);

    if(!guestBookingsIds.includes(reservationID)) {
        throw new Error("you are not allowed to edit this booking ");
    }

    const updatedFields = {observations, numGuests};

    const { error } = await supabase
    .from('bookings')
    .update(updatedFields)
    .eq('id', reservationID);

    if (error) {
        throw new Error('Booking could not be updated');
    }
    revalidatePath(`/account/reservations/edit/${reservationID}`);
    revalidatePath(`/account/reservations`);
    redirect("/account/reservations");
}

export async function createBooking(bookingData,formDate){  
    const session = await auth();
    if(!session) throw new Error ("You must be logged in");

    const newBooking = {
        ...bookingData,
        guestId:session.user.guestId,
        numGuests:Number(formDate.get("numGuests")),
        observations:formDate.get("observations").slice(0, 1000),
        extrasPrice:0,
        totalPrice:bookingData.cabinPrice,
        isPaid:false,
        hasBreakfast:false,
        status:"unconfirmed",
    }
    console.log(bookingData.cabinId);

    const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()
    .single();
    if (error) {
        throw new Error('Booking could not be created');
    }
    revalidatePath(`/cabins/${bookingData.cabinId}`);
    revalidatePath(`/account/reservations`);
    redirect(`/account/reservations`)

}

export async function signOutAction(){
    await signOut({redirectTo:"/"})
}
