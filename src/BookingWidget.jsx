import {useContext, useEffect, useState} from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import {UserContext} from "./UserContext.jsx";
import { Navigate, useNavigate } from "react-router-dom";

export default function BookingWidget({place}) {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [numberOfGuests,setNumberOfGuests] = useState(1);
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [redirect,setRedirect] = useState('');
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  async function bookThisPlace() {
    if (!user) {
      alert('Please log in to book this place');
      setRedirect('/login');
      return;
    }

    navigate('/payment', { state: { place, checkIn, checkOut, numberOfGuests, name, phone, numberOfNights } });

    // const response = await axios.post(`/places/${place.id}/bookings`, {
    //   checkIn,
    //   checkOut,
    //   numberOfGuests: Number(numberOfGuests),
    //   name,
    //   phone,
    //   price:numberOfNights * place.price,
    // });
    // const bookingId = response.data.id;
    // console.log(response.data.id);
    // console.log(`Booking created with ID: ${bookingId}`);
    // setRedirect(`/bookings/${bookingId}`);
  }

  if (redirect) {
    return <Navigate to={redirect} />
  }

  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: Ksh {place.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check in:</label>
            <input type="date"
                   value={checkIn}
                   onChange={ev => setCheckIn(ev.target.value)}/>
          </div>
          <div className="py-3 px-4 border-l">
            <label>Check out:</label>
            <input type="date" value={checkOut}
                   onChange={ev => setCheckOut(ev.target.value)}/>
          </div>
        </div>
        <div className="py-3 px-4 border-t">
          <label>Number of guests:</label>
          <input type="number"
                 value={numberOfGuests}
                 onChange={ev => setNumberOfGuests(ev.target.value)}/>
        </div>
        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
                   value={name}
                   onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
                   value={phone}
                   onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
      </div>

      <button onClick={bookThisPlace} className="primary mt-4">
        {user ? "Book this place" : "Login first to book"}
        {user && numberOfNights > 0 && (
          <span> @ Ksh {numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
}