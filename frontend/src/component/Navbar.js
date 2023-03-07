import React, { useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./navbar.css";
import logo from "../asset/logo.png";
import Hamburger from "../asset/hamburger.svg";

function Navbar() {
  const Navigate = useNavigate();
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const { state, dispatch } = useContext(UserContext);
  const renderList = () => {
    return state
      ? [
          <li>
            <NavLink to="/">Home</NavLink>
          </li>,
          <li>
            <NavLink to="/Explore">Explore</NavLink>
          </li>,
          <li>
            <NavLink to="/Contribute">Contribute</NavLink>
          </li>,
          <li>
            <button
              className="logout-button"
              onClick={() => {
                localStorage.clear();
                dispatch({ type: "CLEAR" });
                Navigate("/login");
              }}
            >
              Logout
            </button>
          </li>,
        ]
      : [
          <li>
            <NavLink to="/">Home</NavLink>
          </li>,
          <li>
            <NavLink to="/Signup">Signup</NavLink>
          </li>,
          <NavLink to="/Login">Login</NavLink>,
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
