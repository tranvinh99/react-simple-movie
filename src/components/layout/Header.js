import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header text-white flex items-center justify-center gap-x-5 py-10 mb-5">
      <NavLink
        className={({ isActive }) => (isActive ? "text-primary" : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "text-primary" : "")}
        to="/movies"
      >
        Movies
      </NavLink>
    </header>
  );
};

export default Header;
