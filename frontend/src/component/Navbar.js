import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { UserContext } from "../App";
import "./navbar.css";
import logo from "../asset/logo.png";
import Hamburger from "../asset/hamburger.svg";

function Navbar() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = () => {
    sessionStorage.clear();
    dispatch({ type: "CLEAR" });
  };

  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    return state
      ? [
          <li>
            <NavLink to="/">Home</NavLink>
          </li>,
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>,
          <li>
            <NavLink to="/contribute">Contribute</NavLink>
          </li>,
          <li>
            <NavLink to="/user">My Profile</NavLink>
          </li>,
          <li>
            <NavLink onClick={logout} to="/login">
              Logout
            </NavLink>
          </li>,
        ]
      : [
          <li>
            <NavLink to="/">Home</NavLink>
          </li>,
          <li>
            <NavLink to="/explore">Explore</NavLink>
          </li>,
          <li>
            <NavLink to={state ? "/contribute" : "/login"}>Contribute</NavLink>
          </li>,
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>,
          <NavLink to="/login">Login</NavLink>,
        ];
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logonav">
          <Link to={state ? "/" : "/login"}>
            <img className="versely" src={logo} alt="" />
          </Link>
        </div>
        <div className="menu-icon" onClick={handleShowNavbar}>
          <img src={Hamburger} alt="" />
        </div>
        <div className={`nav-elements  ${showNavbar && "active"}`}>
          <ul>{renderList()}</ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
