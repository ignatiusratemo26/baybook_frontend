import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";

export default function BookingPage() {
  const {bookingId} = useParams();
  const [booking,setBooking] = useState(null);
  useEffect(() => {
    console.log("Booking ID:", bookingId);
    if (bookingId) {
      
      axios.get('/bookings').then(response => {
        const foundBooking = response.data.find(({id}) => id === bookingId);
        if (foundBooking) {
          setBooking(foundBooking);
        }
        console.log(foundBooking)
      });
    }
  }, [bookingId]);

  if (!booking) {
    return 'none';
  }

  return (
    <div className="my-8">
      <h1 className="text-3xl">{booking.place.title}</h1>
      <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
      <div className="bg-red-50 p-6 my-6 rounded-2xl flex items-center justify-between shadow-xl">
        <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total price</div>
          <div className="text-3xl">Ksh {booking.price}</div>
        </div>
      </div>
      <PlaceGallery place={booking.place} />
    </div>
  );
}