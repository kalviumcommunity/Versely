import React from "react";
import "./navbar.css";

function FormPopup({ isOpen, notOpen }) {
  const modalfunction = () => {
    if (isOpen) {
      notOpen(false);
    }
  };

  return (
    <div className="Modal">
      <div className="FormPopup-container">
        <h3>Help Us Improve</h3>
        <br />
        <div className="Formpopup-container-input" style={{ padding: "2vh" }}>
          <p>
            Mail us at praduman03k@gmail.com to give suggestion and provide us
            with the Song name and what to improve.
            <br />
            Thank you.
          </p>
        </div>
        <button className="form-cancel-button" onClick={modalfunction}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FormPopup;
