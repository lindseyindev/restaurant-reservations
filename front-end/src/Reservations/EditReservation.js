import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { findReservation, editReservation } from "../utils/api";
import Form from "./Form";
import {formatAsDate} from "../utils/date-time"

function EditReservation() {
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(null);
  const { reservation_id } = useParams();

  function loadReservation() {
    const abortController = new AbortController();
    setError(null);
    findReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }

  useEffect(loadReservation, [reservation_id]);

  async function submitHandler(e, reservation) {
    e.preventDefault();
    let abortController = new AbortController();
    async function updateReservation() {
      try {
        await editReservation(reservation, abortController.signal);
      } catch (error) {
        setError(error);
      }
    }
    updateReservation();
    return () => {
      abortController.abort();
    };
  }

  if(reservation){
    reservation.reservation_date = formatAsDate(reservation.reservation_date)
  }
  
  return (
    <div>
      {console.log(`from edit: ${reservation}`)}
      <h1 className="m-4">Edit Reservation</h1>
      <ErrorAlert error={error} /> 

      {reservation && <Form initialState={reservation} submitHandler={submitHandler} />}

  </div>
  )
}

export default EditReservation;
