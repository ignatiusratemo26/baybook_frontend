import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios
      .get('/places')
      .then(response => {
        setPlaces(response.data || []); // Ensure it's an array
      })
      .catch(() => {
        setPlaces([]); // Handle the error by setting it to an empty array
      });
  }, []);

  return (
    <div className="mt-4">

      <div>
        <form className="flex gap-2 items-center max-w-sm mx-auto">   
          <label htmlFor="simple-search" className="sr-only">Search</label>
          <div className="relative w-full">

              <input type="text" id="simple-search" className="bg-gray-700 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full ps-10 p-2.5  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-teal-500 dark:focus:border-teal-500" placeholder="Search hotel ..." required />
          </div>
          <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-black bg-teal-700 rounded-lg border border-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 dark:focus:ring-teal-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
              <span className="sr-only">Search</span>
          </button>
      </form>
      </div>

     <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:text-sm">
      {places.length > 0 ? (
        places.map(place => (
          <Link to={`/place/${place.id}`} key={place.id}>
            <div className="bg-gray-500 mb-2 rounded-2xl flex">
              {place.photos?.[0] && (
                <Image
                  className="rounded-2xl object-cover aspect-square"
                  src={place.photos[0]}
                  alt=""
                />
              )}
            </div>
            <h2 className="font-bold">{place.address}</h2>
            <h3 className="text-sm text-gray-500">{place.title}</h3>
            <div className="mt-1">
              <span className="font-bold">Ksh {place.price}</span> per night
            </div>
          </Link>
        ))
      ) : (
        <p>No places available.</p> // Show a fallback message
      )}
    </div>
    </div>
  );
}
