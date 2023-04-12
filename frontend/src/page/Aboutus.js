import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Versely: Connecting Music Lovers Worldwide through Open Source
                Lyrics Platform
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Versely is a free and open source platform for music lovers to
                upload and explore song lyrics from around the world. Our
                mission is to connect people through the universal language of
                music. world.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                Discover and Share Song Lyrics from Around the World with
                Versely
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Our platform allows users to write song lyrics in more than one
                language, making it easier for people to discover and appreciate
                the beauty of music in different languages and cultures.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                The Power of Music in Creating an Inclusive and Diverse
                Community: Versely's Mission
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                At Versely, we believe that music has the power to bring people
                together, regardless of their backgrounds or beliefs. We are run
                completely with the help and support of music lovers like you,
                who share our vision for a more inclusive and diverse music
                community.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>
                "Joining Forces for Creativity and Inclusivity: Thank You for
                Being a Part of Versely's Community
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Thank you for being a part of the Versely community. Together,
                we can continue to promote creativity, diversity, and
                inclusivity in the music. We can't wait to see what lyrics
                you'll share with us next!
              </Typography>
            </AccordionDetails>
          </Accordion>

          <div>
            <h4>
              Support my work by donating! Your contribution will ensure
              continued development of this website and further educational
              opportunities. Thank you!
            </h4>
            <button
              className="improvementbutton"
              style={{
                display: "flex",
                justifyContent: "center",
                marginInline: "auto",
              }}
            >
              <Link className="linkbutton" to="/pay">
                Buy me a coffee
              </Link>
            </button>
          </div>
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
