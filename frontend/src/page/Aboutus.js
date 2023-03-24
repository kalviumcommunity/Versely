import React from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import logo from "../asset/logo2.png";

function Aboutus() {
  return (
    <div>
      <Navbar />
      <div className="aboutus-container">
        <div>
          <h1>About Us</h1>
          <img className="logo2img" src={logo} alt="" />
          <ul>
            <li>
              Versely is a free and open source platform for music lovers to
              upload and explore song lyrics from around the world. Our mission
              is to connect people through the universal language of music.
              world.
            </li>
            <li>
              Our platform allows users to write song lyrics in more than one
              language, making it easier for people to discover and appreciate
              the beauty of music in different languages and cultures.
            </li>
            <li>
              At Versely, we believe that music has the power to bring people
              together, regardless of their backgrounds or beliefs. We are run
              completely with the help and support of music lovers like you, who
              share our vision for a more inclusive and diverse music community.
            </li>
            <li>
              Thank you for being a part of the Versely community. Together, we
              can continue to promote creativity, diversity, and inclusivity in
              the music. We can't wait to see what lyrics you'll share with us
              next!
            </li>
          </ul>
          <div className="backtohome">
            <Link to="/">Back to Home</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Aboutus;
