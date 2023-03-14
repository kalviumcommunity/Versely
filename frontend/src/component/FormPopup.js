import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { toast } from "react-toastify";

function FormPopup({ isOpen, notOpen, lyrics }) {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const modalfunction = () => {
    if (isOpen) {
      notOpen(false);
    }
  };
  const submitSuggestion = () => {
    fetch(process.env.REACT_APP_API + "api/suggest", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        option1,
        option2,
        option3,
        option4,
        content,
        SongName: lyrics.lyric.SongName,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          toast.success("Thankyou for Contributing");
          navigate("/explore");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Modal">
      <div className="FormPopup-container">
        <h3>Help Us Improve</h3>
        <br />
        <div className="Formpopup-container-input" style={{ padding: "2vh" }}>
          {/* <p>
            Mail us at praduman03k@gmail.com to give suggestion and provide us
            with the Song name and what to improve.
            <br />
            Thank you.
          </p> */}
          <form>
            <h2>Help us Improve</h2>
            <br />
            <label>Select a reason:</label>
            <br />
            <input
              type="radio"
              name="option"
              id="option1"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <label htmlFor="option1">improve the lyrics</label>
            <input
              type="radio"
              name="option"
              id="option2"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            <label htmlFor="option2">improve about song</label>
            <input
              type="radio"
              name="option"
              id="option3"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
            <label htmlFor="option3">add something else</label>
            <input
              type="radio"
              name="option"
              id="option4"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
            <label htmlFor="option4">other</label>
            <br />
            <label>Suggest an Improvement here..</label>
            <textarea
              cols="30"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </form>
        </div>
        <button onClick={submitSuggestion}>Submit</button>
        {error && <div>{error}</div>}
        <button className="form-cancel-button" onClick={modalfunction}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FormPopup;
