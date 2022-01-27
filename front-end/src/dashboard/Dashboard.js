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
  async function handleCancelClick(e, reservation_id) {
    if (
      window.confirm(
        "Do you want to cancel this reservation? This cannot be undone"
      )
    ) {
      const abortController = new AbortController();
      await updateStatus(reservation_id, "cancelled", abortController.signal);
      window.location.reload(false);
      return () => abortController.abort();
    }
  }

  //tr wrapping all tds NO THS
  //make head in main return with tr filled with ths for each column name
  const displayReservations = reservations.map((reservation) => {
    const { reservation_id } = reservation;
    return (
      <tr className="p-2 m-4 hover:bg-yellow-200">
        <td className="p-2 m-2">{reservation_id}</td>
        <td className="p-2 m-2">{reservation.first_name}</td>
        <td className="p-2 m-2">{reservation.last_name}</td>
        <td className="p-2 m-2">{reservation.mobile_number}</td>
        <td className="p-2 m-2">
          {formatAsDate(reservation.reservation_date)}
        </td>
        <td className="p-2 m-2">
          {formatAsTime(reservation.reservation_time)}
        </td>
        <td className="mb-2">{reservation.people}</td>
        <td>{reservation.status}</td>
        <td>
          <a
            href={`/reservations/${reservation.reservation_id}/edit`}
            className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Edit
          </a>
        </td>

        <td>
          <button
            data-reservation-id-cancel={reservation.reservation_id}
            onClick={(e) => handleCancelClick(e, reservation.reservation_id)}
            className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            Cancel
          </button>
        </td>
        {reservation.status === "booked" ? (
          <button
            onClick={(e) => statusChanger(reservation.reservation_id, "seated")}
            className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          >
            <a href={`/reservations/${reservation_id}/seat`}>Seat</a>
          </button>
        ) : null}
      </tr>
    );
  });

  const displayTables = tables.map((table, index) => {
    return (
      <tr className="p-2 m-2 hover:bg-gray-200" key={table.table_id}>
        <th scope="row">{table.table_id}</th>
        <td>{table.table_name}</td>
        <td>{table.capacity}</td>
        <td data-table-id-status={table.table_id}>
          {table.reservation_id ? (
            <Occupied table_id={table.table_id} />
          ) : (
            "Free"
          )}
        </td>
      </tr>
    );
  });

  return (
    <main className="min-h-screen m-12">
      <h1 className="p-10">Dashboard</h1>
      <div className="flex flex-col md:flex-row">
        <div className="p-4 m-5 bg-emerald-500">
          <h4 className="mb-4">{`Reservations for ${date}`}</h4>
          <div className="container flex justify-center mx-auto">
            <div className="flex flex-col">
              <div className="w-full">
                <div className="border-b border-gray-200 shadow">
                  <table className="divide-y divide-gray-300 ">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-2 text-xs text-gray-500">ID</th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          First name
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Last Name
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Mobile Number
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Date
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Time
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Party Size
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Status
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Edit
                        </th>

                        <th className="px-6 py-2 text-xs text-gray-500">
                          Cancel
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                          Seat
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                      {displayReservations}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 m-5 bg-indigo-200">
          {" "}
          Tables
          <table className="table-auto border-separate border border-emerald-500">
            <tbody className="">
            {displayTables}
            </tbody>
          </table>
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
