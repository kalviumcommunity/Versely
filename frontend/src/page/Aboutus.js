import React, { useEffect } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Link } from "react-router-dom";
import logo from "../asset/logo2.png";

function Aboutus() {
  const loggedinUser = JSON.parse(sessionStorage.getItem("user"));
  const displayRazorpay = async () => {
    const data = await fetch(process.env.REACT_APP_API + "api/user/razorpay", {
      method: "POST",
    }).then((result) => result.json());

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: data.currency,
      amount: data.amount,
      description: "Wallet Transaction",
      image: { logo },
      order_id: data.id,
      handler: function (response) {
        alert("PAYMENT ID:" + response.razorpay_payment_id);
        alert("ORDER ID:" + response.razorpay_order_id);
      },
      prefill: {
        name: loggedinUser.name,
        email: loggedinUser.email,
      },
    };

    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;
      script.onload = () => {
        resolve(true);
      };

      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });

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
          <div>
            <h4>
              Support my work by donating! Your contribution will ensure
              continued development of this website and further educational
              opportunities. Thank you!
            </h4>
            <button
              style={{
                display: "flex",
                justifyContent: "center",
                marginRight: "auto",
                marginLeft: "auto",
              }}
              className="improvementbutton"
              onClick={displayRazorpay}
            >
              Donate
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
