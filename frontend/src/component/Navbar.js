import React,{useState} from 'react'
import { NavLink,Link } from 'react-router-dom'
import './navbar.css'
import logo from '../asset/logo.png'
import Hamburger from '../asset/hamburger.svg'

function Navbar() {
    const [showNavbar, setShowNavbar] = useState(false)

    const handleShowNavbar = () => {
      setShowNavbar(!showNavbar)
    }
  
    return (
      <nav className="navbar">
        <div className="container">
          <div className="logonav">
            <Link to="/"><img className='versely' src={logo} alt="" /></Link>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <img src={Hamburger} alt="" />
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              <li>
                <NavLink to="/Explore">Explore</NavLink>
              </li>
              <li>
                <NavLink to="/Contribute">Contribute</NavLink>
              </li>
              <li>
                <a href="/Login">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  
      }


export default Navbar
