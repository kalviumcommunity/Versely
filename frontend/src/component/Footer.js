import React from "react";
import logo from "../asset/logo.png";
import linkedin from "../asset/linkedin.svg";
import github from "../asset/github.svg";
import whatsapp from "../asset/whatsapp.svg";

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer">
          <div className="footer-div">
            <img className="footer-logo" src={logo} alt="" />
          </div>
          <div className="footer-link-div">
            <a href="https://www.linkedin.com/in/praduman03/">
              <img className="footer-link" src={linkedin} alt="" />
            </a>
            <a href="https://github.com/praduman03">
              <img className="footer-link" src={github} alt="" />
            </a>
            <a href="https://wa.me/919680193899?text=Hello%2C%20I%20have%20a%20question%20about%20your%20website%20%22Versely%22%20can%20you%20please%20help%20me%3F">
              <img className="footer-link" src={whatsapp} alt="" />
            </a>
          </div>
        </div>
        <p className="copyright">Versely &copy; 2023</p>
      </footer>
    </div>
  );
}

export default Footer;
