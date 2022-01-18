import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import useQuery from "../utils/useQuery";
//import {formatTime} from "../utils/format-reservation-time";
//import formatAsDate from "../utils/format-reservation-date";
import {previous, next, today, formatAsTime} from "../utils/date-time";


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
    date = today()
  }

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }


  const history = useHistory();
 

  function pushDate(dateToMove) {
    history.push(`/dashboard?date=${dateToMove}`);
  }

  function handleClick(nextOrPrev){
    pushDate(nextOrPrev)
  }

  const resTable = reservations.map((reservation) => {
    return (
      <tr key={reservation.reservation_id}>
        <td>{reservation.reservation_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{reservation.mobile_number}</td>
        <td>{formatAsTime(reservation.reservation_time)}</td>
        <td>{reservation.people}</td>
      </tr>
    );
  });

  return (
    <main className="min-h-screen m-12">
      <h1 className="p-10">Dashboard</h1>
      <div className="p-10 d-md-flex mb-3">
        <h4 className="mb-4">{`Reservations for ${date}`}</h4>
        <div className="p-2">{resTable}</div>
        <div className="p-5 inline-flex">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="button" onClick={(e) => handleClick(previous(date))}>
            Previous
          </button>
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="button" onClick={(e) => handleClick(next(date))}>
            Next
          </button>
        </div>
      
      </div>
      <ErrorAlert error={reservationsError} />
      {JSON.stringify(reservations)}
    </main>
  );
}

export default Dashboard;
