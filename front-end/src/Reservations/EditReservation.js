import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { findReservation, editReservation } from "../utils/api";
import Form from "./Form";

function Edit() {
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState({});
  const history = useHistory();
  const { reservation_id } = useParams();

  function loadReservation() {
    const abortController = new AbortController();
    setError(null);
    findReservation(reservation_id, abortController.signal)
      .then(setReservation)
      .catch(setError);
    return () => abortController.abort();
  }

  useEffect(loadReservation, []);

  function submitHandler(e) {
    e.preventDefault();
    let abortController = new AbortController();
    async function updateReservation() {
      try {
        await editReservation(reservation, abortController.signal);
        // history.push(`/dashboard`);
      } catch (error) {
        setError(error);
      }
    }
    updateReservation();
    return () => {
      abortController.abort();
    };
  }

  
  return <Form initialState={reservation} submitHandler={submitHandler} />;
}

export default Edit;
