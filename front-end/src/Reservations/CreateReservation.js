import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Form from "./Form"

function NewReservations() {
  const initialState = {
    "first_name": "",
    "last_name": "",
    "mobile_number": "",
    "reservation_date": "",
    "reservation_time": "",
    "people": 0,
  };

  const history = useHistory();
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(initialState);

  
  function submitHandler(e) {
  reservation.people = Number(reservation.people)
    e.preventDefault();
    let abortController = new AbortController();
    async function newReservation() {
      try {
        await createReservations(reservation, abortController.signal)
        let date = reservation.reservation_date
        setReservation(initialState)
        history.push(`/dashboard?date=${date}`)
      } catch (error) {
        setError(error);
      }
    }
    newReservation();
    return () => {
      abortController.abort();
    };
  }

  return (
    <div>
    <ErrorAlert error={error} /> 
    <Form initialState={reservation} submitHandler={submitHandler} />
    </div>
  );
}

export default NewReservations;
