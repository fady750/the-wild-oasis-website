"use client"
import { useOptimistic } from "react"
import ReservationCard from "./ReservationCard"
import { deleteReservation } from '../_lib/action';


function ReservationList({bookings}) {
    const [OptimisticBookings, OptimisticDelete ] = useOptimistic(bookings, 
        (curBookings, bookingId)=>{
            return curBookings.filter((booking)=>booking.id !== bookingId)
    });
    async function handleDelete(bookingId){
        OptimisticDelete(bookingId);
        await deleteReservation(bookingId);
    }
    return (
        <ul className="space-y-6">
            {OptimisticBookings.map((booking) => (
                <ReservationCard onDelete={handleDelete} booking={booking} key={booking.id} />
            ))}
        </ul>
    )
}

export default ReservationList
