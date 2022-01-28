import React, { useState } from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap ">
        <div className="w-full">
          <nav className="relative flex flex-wrap items-center justify-between px-2 py-3">
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
              <div className="w-full relative flex justify-between lg:w-auto px-4 lg:static lg:block lg:justify-start">
                <Link
                  to="/"
                  className="text-2xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase "
                >
                  <div className="mx-3">Book a Table</div>
                </Link>
                <button
                  className=" cursor-pointer text-2xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
                  type="button"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <i className="fas fa-bars"></i>
                </button>
              </div>
              <div
                className={
                  "lg:flex flex-grow items-center" +
                  (menuOpen ? " flex" : " hidden")
                }
                id="example-navbar-info"
              >
                <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug  hover:opacity-75"
                      to="/dashboard"
                    >
                      <span className="ml-2">Dashboard</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      to="/search"
                      className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug  hover:opacity-75"
                    >
                      <span className="ml-2">Search</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug  hover:opacity-75"
                      to="/reservations/new"
                    >
                      <span className="ml-2">New Reservation</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-2xl uppercase font-bold leading-snug  hover:opacity-75"
                      to="/tables/new"
                    >
                      <span className="ml-2"> New Table</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Menu;
