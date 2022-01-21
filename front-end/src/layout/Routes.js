import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservations from "./NewReservations";
import CreateTables from "../tables/CreateTables";
import { today } from "../utils/date-time";
import AssignSeat from "../tables/AssignSeat";

/**
 * Defines all the routes for the application.
 *
 * You will need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
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
      <Route exact={true} path="/reservations/new" >
        <NewReservations />
      </Route>
      <Route exact={true} path="/tables/new" >
        <CreateTables />
      </Route>
      <Route exact={true} path="/reservations/:reservation_id/seat" >
        <AssignSeat />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
