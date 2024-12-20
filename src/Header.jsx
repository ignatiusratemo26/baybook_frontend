import {Link} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "./UserContext.jsx";
import baybookLogo from '../src/assets/baybook.png';

export default function Header() {
  const {user} = useContext(UserContext);
  return (
    <header className="flex justify-between">
      <Link to={'/'} className="flex items-center gap-1">

        <img src={baybookLogo} alt="BayBook Logo" className="w-8 h-8" />

        <span className="font-bold text-xl text-teal-700">BayBook.ke</span>
      </Link>
      
      
      {/* <form className="flex gap-2 items-center max-w-sm mx-auto">   
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
      </form> */}

      
      <Link to={user?'/account':'/login'} className="flex items-center gap-2 border border-gray-300 rounded-none py-2 px-4 ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
        <div className="bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>
        {!!user && (
          <div>
            {user.name}
          </div>
        )}
      </Link>
    </header>
  );
}