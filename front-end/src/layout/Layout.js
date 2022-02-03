import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";

import "./Layout.css";

function Layout() {
  return (
    <div className="bg-gradient-to-t from-yellow-500 to-orange-500 min-h-100">
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
