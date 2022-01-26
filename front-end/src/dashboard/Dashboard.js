import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations, listTables, updateStatus } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
//import {formatTime} from "../utils/format-reservation-time";
//import formatAsDate from "../utils/format-reservation-date";
import Occupied from "./Occupied";

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
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  const history = useHistory();

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`);
  }

  function handleClick(nextOrPrev) {
    pushDate(nextOrPrev);
  }

  function statusChanger(reservation_id, status) {
    const abortController = new AbortController();
    updateStatus(reservation_id, status, abortController.signal).catch(
      setError
    );
    return () => abortController.abort();
  }


  //tr wrapping all tds NO THS
  const displayReservations = reservations.map((reservation) => {
    const { reservation_id } = reservation;
    return (
      <tbody className="p-2 m-4 hover:bg-yellow-200">
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
        {reservation.status === "booked" ? (
          <a href={`/reservations/${reservation_id}/seat`}>
            <button
              onClick={(e) =>
                statusChanger(reservation.reservation_id, "seated")
              }
              className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >
              Seat
            </button>
          </a>
        ) : null}
      </tbody>
    );
  });

  const displayTables = tables.map((table, index) => {
    return (
      <div className="p-2 m-2 hover:bg-gray-200" key={index}>
        <li>Table Name: {table.table_name}</li>
        <li>Capacity: {table.capacity}</li>
        <li data-table-id-status={table.table_id}>
          {table.reservation_id ? (
            <Occupied table_id={table.table_id} />
          ) : (
            "Free"
          )}
        </li>
      </div>
    );
  });

  return (
    <main className="min-h-screen m-12">
      <h1 className="p-10">Dashboard</h1>
      <div className="flex flex-row">
        <div className="p-4 m-5 bg-emerald-500">
          <h4 className="mb-4">{`Reservations for ${date}`}</h4>
          <table className="table-auto mx-4 flex-row border-separate border border-indigo-500">
            {displayReservations}
          </table>
        </div>
        <div className="p-4 m-5 bg-indigo-200">
          {" "}
          Tables
          <ol className="table-auto border-separate border border-emerald-500">
            {displayTables}
          </ol>
        </div>
        <div className="m-auto">
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
