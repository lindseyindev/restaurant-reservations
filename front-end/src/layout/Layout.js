import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="bg-gradient-to-t from-yellow-600 to-orange-600 via-yellow-600 min-h-100">
      <div className="">
        <div className="">
          <Menu />
        </div>
        <div className="min-h-full">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
