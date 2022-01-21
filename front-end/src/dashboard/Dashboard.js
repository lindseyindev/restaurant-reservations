import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
//import {formatTime} from "../utils/format-reservation-time";
//import formatAsDate from "../utils/format-reservation-date";
import {
  previous,
  next,
  today,
  formatAsTime,
  formatAsDate,
} from "../utils/date-time";

/* Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */

function Dashboard({ date }) {
  const query = useQuery();
  const getDate = query.get("date");

  if (getDate) {
    date = getDate;
  } else {
    date = today();
  }

  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [error, setError] = useState(null);

  useEffect(loadReservations, [date]);
  useEffect(loadTables, []);

  function loadReservations() {
    const abortController = new AbortController();
    setError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setError);
    return () => abortController.abort();
  }

  function loadTables() {
    const abortController = new AbortController();
    setError(null)
    listTables(abortController.signal).then(setTables).catch(setError)
    return () => abortController.abort()
  }

  const history = useHistory();

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`);
  }

  function handleClick(nextOrPrev) {
    pushDate(nextOrPrev);
  }

  const displayReservations = reservations.map((reservation) => {
    return (
      <div>
        <tr>
          <th>{`reservation id: ${reservation.reservation_id}`}</th>
        </tr>
        <th>Name</th>
        <tr>
          <td>{reservation.first_name}</td>
        </tr>
        <tr>
          <td>{reservation.last_name}</td>
        </tr>
        <th>Phone</th>
        <tr>
          <td>{reservation.mobile_number}</td>
        </tr>
        <th>Reservation Date and Time</th>
        <tr>
          <td>
            {formatAsDate(reservation.reservation_date)}{" "}
            {formatAsTime(reservation.reservation_time)}
          </td>
        </tr>
        <th>Party Size</th>
        <tr>
          <td>{reservation.people}</td>
        </tr>
        <button
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          href={`/reservations/${reservation.reservation_id}/seat`}
        >
          Seat
        </button>
      </div>
    );
  });

  const displayTables = tables.map((table, index) => {
    return (
      <div key={index}>
        <li>Table Name: {table.table_name}</li>
        <li>Capacity: {table.capacity}</li>
        <li data-table-id-status={table.table_id}>
          Free or Occupied Placeholder...
        </li>
      </div>
    );
  });

  return (
    <main className="min-h-screen m-12">
      <h1 className="p-10">Dashboard</h1>
      <div className="p-10 d-md-flex mb-3">
        <h4 className="mb-4">{`Reservations for ${date}`}</h4>
        <div className="p-2 bg-emerald-500">
          <table className="table-fixed border-separate border border-indigo-500">
            {displayReservations}
          </table>
        </div>
        <div className="p-2 bg-indigo-200">
          <ol className="table-fixed border-separate border border-emerald-500">
            {displayTables}
          </ol>
        </div>
        <div className="p-5 inline-flex">
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="button"
            onClick={(e) => handleClick(previous(date))}
          >
            Previous
          </button>
          <button
            className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            type="button"
            onClick={(e) => handleClick(next(date))}
          >
            Next
          </button>
        </div>
      </div>
      <ErrorAlert error={error} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
