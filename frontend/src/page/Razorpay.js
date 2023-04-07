import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Razorpay() {
  const [amount1, setAmount] = useState();
  const displayRazorpay = async () => {
    const data = await fetch(process.env.REACT_APP_API + "api/user/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount1,
      }),
    }).then((result) => result.json());

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: data.currency,
      amount: amount1,
      description: "Wallet Transaction",
      order_id: data.id,
      handler: function (response) {
        alert("PAYMENT ID:" + response.razorpay_payment_id);
        alert("ORDER ID:" + response.razorpay_order_id);
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
  }, []);
  return (
    <div>
      <Navbar />
      <div className="Donate-container">
        <h2>
          If you've found my project useful, I would greatly appreciate your
          support by buying me a coffee.
        </h2>
        <div className="Amount-input">
          <label htmlFor="">Amount(&#8377;):</label>
          <input
            type="number"
            value={amount1}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
      </div>
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
        Proceed
      </button>
    </div>
  );
}

export default Razorpay;
