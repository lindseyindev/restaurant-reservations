import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import CreateReservation from "../Reservations/CreateReservation";
import CreateTables from "../Tables/CreateTables";
import { today } from "../utils/date-time";
import AssignSeat from "../Tables/AssignSeat.js";
import Search from "../Reservations/Search";
import EditReservation from "../Reservations/EditReservation";

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={today()} />
      </Route>
      <Route exact={true} path="/reservations/new">
        <CreateReservation />
      </Route>
      <Route exact={true} path="/tables/new">
        <CreateTables />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat">
        <AssignSeat />
      </Route>
      <Route exact={true} path="/search">
        <Search />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
