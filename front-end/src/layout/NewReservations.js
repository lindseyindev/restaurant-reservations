import React from "react"
import {useHistory} from "react-router-dom"

function NewReservations(){
const history = useHistory()

//dont put functions here for submit
// make a reusable form for add and edit

//new reservations and edit reservations function and button will be diff

//form component only needs state of inputs, change handler
//import submit handler and state variables and button handlers

//for edit form add placeholder as specific name???

//tuesday, when you create a new date in js it uses your computers timezone, the new date will be the time that's in your timezone

//have to convert the people form as a number


return (
<div>
<form className="w-full max-w-lg">
  <div className="flex flex-wrap mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
        First Name
      </label>
      <input name="first_name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="First Name"/>
      <p className="text-red-500 text-xs italic">Please fill out this field.</p>
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
        Last Name
      </label>
      <input name="last_name" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Last Name"/>
    </div>
  </div>
  <div className="flex flex-wrap mx-3 mb-6">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-mobile-number">
        Mobile Number
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" placeholder="000-000-0000" name="mobile_number" type="tel" />
      <p className="text-gray-600 text-xs italic">Please use the format 000-000-0000  </p>
    </div>
    <div className="w-full md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-mobile-people">
        Party Size
      </label>
      <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" name="people" id="grid-password" type="number" min="0" placeholder="1"/>
    </div>
  </div>
  <div className="flex flex-wrap mx-3 mb-2">
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-reservation-date">
        Reservation Date
      </label>
      <input name="reservation_date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-date" type="date" />
    </div>
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-reservation-time">
        Reservation Time
      </label>
      <input name="reservation_time" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-date" type="time" />
    </div>
  </div>
</form>
<button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit">
            Next
          </button>
          <button type="cancel" onClick={(e) => history.goBack}>Cancel</button>
          </div>



)
}

export default NewReservations