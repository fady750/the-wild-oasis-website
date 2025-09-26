
import FormButton from "@/app/_components/FormButton";
import { updateReservation } from "@/app/_lib/action";
import { getBooking, getCabin } from "@/app/_lib/data-service";



export async function generateMetadata({params}){
    return{
      title:`reservation ${params.reservationID}`,
  }
}

export default async function Page({params}) {
  const {reservationID} = params;
  const booking = await getBooking(reservationID);
  const {cabinId, numGuests, observations} = booking;
  const cabin = await getCabin(cabinId);
  const {maxCapacity} = cabin;
  console.log(booking);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservation #{reservationID}
      </h2>

      <form className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col" action={updateReservation} >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
            defaultValue={numGuests}
          >
            <option  value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
          <input value={reservationID} name="reservationID" className=" hidden"/>
        </div>

        <div className="flex justify-end items-center gap-6">
            <FormButton updatingLabel="editing">
              Edit now
            </FormButton>
        </div>
      </form>
    </div>
  );
}

