import React, { useState } from "react";
import { useHistory } from "react-router-dom";
// import { createReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import { createTables } from "../utils/api";
import { today } from "../utils/date-time";

function CreateTables() {
  const initialState = {
    table_name: "",
    capacity: 0,
  };

  const history = useHistory();
  const [error, setError] = useState(null);
  const [table, setTable] = useState(initialState);

  function changeHandler({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  function changeHandlerNum({ target: { name, value } }) {
    setTable((prevState) => ({
      ...prevState,
      [name]: Number(value),
    }));
  }

  function submitHandler(e) {
    table.capacity = Number(table.capacity);
    e.preventDefault();
    let abortController = new AbortController();
    async function newTable() {
      try {
        await createTables(table, abortController.signal);
        //let date = reservation.reservation_date
        setTable(initialState);
        history.push(`/dashboard?date=${today()}`);
      } catch (error) {
        setError(error);
      }
    }
    newTable();
    return () => {
      abortController.abort();
    };
  }

  return (
    <div className="font-Staatliches w-full min-h-screen mt-20 p-20 text-center">
      <ErrorAlert error={error} />
      <div className="p-8 container text-center ">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={(e) => submitHandler(e)}
        >
          <div className="flex flex-wrap mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Table Name
              </label>
              <input
                name="table_name"
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="table-name"
                type="text"
                value={table.table_name}
                placeholder="Table Name"
                onChange={(e) => changeHandler(e)}
                required
              />
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xl font-bold mb-2"
                htmlFor="grid-mobile-people"
              >
                Party Size
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                name="capacity"
                id="capacity"
                type="number"
                min={1}
                value={table.capacity}
                placeholder="1"
                onChange={(e) => changeHandlerNum(e)}
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap mx-3 ">
            <div className="text-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                type="submit"
              >
                Submit
              </button>
            </div>
            <div className="text-center w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <button
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                type="button"
                onClick={(e) => history.goBack()}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTables;
