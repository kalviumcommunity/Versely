import React from "react";
import { Link } from "react-router-dom";
import logo from "../asset/whitelogo.png";
import linkedin from "../asset/linkedin.svg";
import github from "../asset/github.svg";
import whatsapp from "../asset/whatsapp.svg";

function Footer() {
  return (
    <div className="footer-container">
      <section className="contact-area" id="contact">
        <div className="container">
          <div className="row">
            {/* <div className="col-lg-6 offset-lg-3"> */}
            <div className="contact-content text-center">
              <Link to="/">
                <img src={logo} alt="logo" />
              </Link>
              <p>
                Versely: A platform to upload and discover song lyrics from
                around the world, connecting music lovers everywhere.
              </p>
              <div className="hr"></div>

              <div className="contact-social">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/explore">Explore</Link>
                  </li>
                  <li>
                    <Link to="/aboutus">About</Link>
                  </li>
                  <li>
                    <Link to="/termsandcondition">T&C</Link>
                  </li>
                </ul>
              </div>
              <div className="contact-social">
                <ul>
                  <li>
                    <a href="https://www.linkedin.com/in/praduman03/">
                      <img src={linkedin} alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover-target"
                      href="https://github.com/praduman03"
                    >
                      <img src={github} alt="" />
                    </a>
                  </li>
                  <li>
                    <a
                      className="hover-target"
                      href="https://wa.me/919680193899?text=Hello%2C%20I%20have%20a%20question%20about%20your%20website%20%22Versely%22%20can%20you%20please%20help%20me%3F"
                    >
                      <img src={whatsapp} alt="" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <p>Copyright &copy; 2023 VERSELY All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Footer;
