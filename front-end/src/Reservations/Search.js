import React, { useState } from "react";
import { search, updateStatus } from "../utils/api";
import { formatAsTime, formatAsDate } from "../utils/date-time";
import ErrorAlert from "../layout/ErrorAlert";

function Search() {
  const [number, setNumber] = useState("");
  const [error, setError] = useState("");
  const [reservations, setReservations] = useState([]);
  function changeHandler({ target: { value } }) {
    setNumber(value);
  }

  function submitSearch(e) {
    e.preventDefault();
    const abortController = new AbortController();
    setError(null);
    setReservations([]);
    search(number, abortController.signal)
      .then((response) => {
        if (response.length) {
          return setReservations(response);
        } else {
          setError({ message: "No reservations found." });
        }
      })
      .catch(setError);
    return () => abortController.abort();
  }

  

  async function handleCancelClick(e, reservation_id) {
    if (
      window.confirm(
        "Do you wish to cancel this reservation? This cannot be undone"
      )
    ) {
      const abortController = new AbortController();
      await updateStatus(reservation_id, "cancelled", abortController.signal);
      window.location.reload(false)
      return () => abortController.abort();
    }
  }

  const displayReservations = reservations.map((reservation) => {
    const { reservation_id } = reservation;
    return (
      <tr className="p-2 m-4 hover:bg-yellow-200">
        <td className="p-2 m-2">{reservation_id}</td>
        <td className="p-2 m-2">{reservation.first_name}</td>
        <td className="p-2 m-2">{reservation.last_name}</td>
        <td className="p-2 m-2">{reservation.mobile_number}</td>
        <td className="p-2 m-2">{formatAsDate(reservation.reservation_date)}</td>
        <td className="p-2 m-2">{formatAsTime(reservation.reservation_time)}</td>
        <td className="mb-2">{reservation.people}</td>
        <td>{reservation.status}</td>
         <td>
           <a
            href={`/reservations/${reservation.reservation_id}/edit`}
            className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >Edit
          </a></td>

          <td>
          <button data-reservation-id-cancel={reservation.reservation_id}
            onClick={(e)=> handleCancelClick(e, reservation.reservation_id)}
            className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >Cancel
          </button>
          </td>

      </tr>
    );
  });

  return (
    <div className="m-4 ">
      <h3>Find a reservation</h3>
      <form onSubmit={submitSearch}>
        <input
          className="appearance-none block w-1/4 bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          name="mobile_number"
          type="text"
          id="mobile_number"
          value={number}
          onChange={changeHandler}
          placeholder="Enter a customer's phone number"
        />
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          type="submit"
        >
          Find
        </button>
      </form>
      <ErrorAlert error={error} />
      <div className="flex flex-col md:flex-row">
        <div className="p-4 m-5 bg-emerald-500">
          <h4 className="mb-4">{`Reservations for ${number}`}</h4>
          <table className="table-auto mx-4 border-separate border border-indigo-500">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Reservation Date</th>
                <th scope="col">Reservation Time</th>
                <th scope="col">Status</th>
                <th scope="col">Party size</th>
                <th scope="col">Edit</th>
                <th scope="col">Cancel</th>
              </tr>
            </thead>
            {displayReservations}
          </table>
        </div>
        </div>
    </div>
  );
}

export default Search;
