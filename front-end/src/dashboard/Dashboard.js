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
  //make head in main return with tr filled with ths for each column name
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
                            <th className="px-6 py-2 text-xs text-gray-500">
                                ID
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                                Name
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                                Email
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                                Created_at
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                                Edit
                            </th>
                            <th className="px-6 py-2 text-xs text-gray-500">
                                Delete
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                    Jon doe
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">jhondoe@example.com</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                2021-1-12
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                    Jon doe
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">jhondoe@example.com</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                2021-1-12
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
                        <tr className="whitespace-nowrap">
                            <td className="px-6 py-4 text-sm text-gray-500">
                                1
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-900">
                                    Jon doe
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="text-sm text-gray-500">jhondoe@example.com</div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                2021-1-12
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </a>
                            </td>
                            <td className="px-6 py-4">
                                <a href="#">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </a>
                            </td>
                        </tr>
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
            {displayTables}
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
