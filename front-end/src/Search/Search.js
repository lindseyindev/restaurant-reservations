import React, { useState, useEffect } from "react";
import { search } from "../utils/api";
import {
    formatAsTime,
    formatAsDate,
  } from "../utils/date-time";
  
function Search() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);

  function changeHandler({ target: { value } }) {
    setNumber(value);
  }

  //   useEffect(submitSearch, [number]);
//   failed consolelog
//   .then((data) => {
//     console.log(data)
//     return setReservations(data);
//     })

  function submitSearch() {
    const abortController = new AbortController();
    setError(null);
    search(number, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  const displayReservations = reservations.map((reservation) => {
    const { reservation_id } = reservation;
    return (
      <div className="p-2 m-4 hover:bg-yellow-200">
        <tr className="p-2 m-2">
          <th>{`reservation id: ${reservation_id}`}</th>
        </tr>
        <th>Name</th>
        <tr className="p-2 m-2">
          <td>
            {reservation.first_name} {reservation.last_name}
          </td>
        </tr>
        <th className="p-2 m-2">Phone</th>
        <tr>
          <td>{reservation.mobile_number}</td>
        </tr>
        <th className="p-2 m-2">Reservation Date and Time</th>
        <tr>
          <td>
            {formatAsDate(reservation.reservation_date)}{" "}
            {formatAsTime(reservation.reservation_time)}
          </td>
        </tr>
        <th className="p-2 m-2 mb-2">Party Size</th>
        <tr className="mb-2">
          <td>{reservation.people}</td>
        </tr>
        <th className="p-2 m-2">Status</th>
        <tr>
          <td>{reservation.status}</td>
        </tr>
      </div>
    );
  });

  return (
    <div className="m-4 ">
      <h3>Find a reservation</h3>
      <form onSubmit={(e) => submitSearch(e)}>
        <input
          className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          name="mobile_number"
          type="tel"
          id="mobile_number"
          value={number}
          onChange={(e) => changeHandler(e)}
          placeholder="Enter a customer's phone number"
        />
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          type="submit"
        >
          Find
        </button>
      </form>

      {reservations.length > 0 ? (
        <table className="table-auto mx-4 flex-row border-separate border border-indigo-500">
          {displayReservations}
        </table>
      ) : null}
    </div>
  );
}

export default Search;
