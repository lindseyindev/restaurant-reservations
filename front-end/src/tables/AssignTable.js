import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import { updateTables, listTables } from "../utils/api";

function AssignSeat() {
  const history = useHistory();
  const [error, setError] = useState(null);
  const [tables, setTables] = useState([]);
  const [selectTable, setSelectTable] = useState({});
  const { reservation_id } = useParams();

  function changeHandler({ target: { name, value } }) {
    setSelectTable((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setError(null);
    listTables(abortController.signal).then(setTables).catch(setError);
    return () => abortController.abort();
  }

  function submitHandler(e) {
    e.preventDefault();
    let abortController = new AbortController();
    async function assignTable() {
      try {
        await updateTables(reservation_id, selectTable.table_id, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setError(error);
      }
    }
    assignTable();
    return () => {
      abortController.abort();
    };
  }

  const tableOptions = tables.map((table) => {
    return (
      <option value={table.table_id} key={table.table_id}>
        {table.table_name} - {table.capacity}
      </option>
    );
  });

  return (
    <div className="font-Staatliches w-full h-full mt-20 p-20 text-center">
      <ErrorAlert error={error} />
      <form className="text-2xl flex flex-col" onSubmit={submitHandler}>
        
        <label className="text-4xl" htmlFor="tables">Assign Table:</label>
        <div className="text-center">
        <select name="table_id" className="my-12 mx-4 w-1/3 font-Inconsolata text-center" onChange={changeHandler}
        required>
          <option value=""> -- Please select a table -- </option>
          {tableOptions}
        </select>
        </div>
        <div className="text-center my-12">
        <button
          className="w-1/7 mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
          type="submit"
        >
          Submit
        </button>
        <button className="w-1/7 mx-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="button" onClick={(e) => history.goBack()}>
          Cancel
        </button>
        </div>
      </form>
    </div>
  );
}

export default AssignSeat;
