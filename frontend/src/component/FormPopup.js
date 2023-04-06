import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import "react-toastify/dist/ReactToastify.css";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../App";

function FormPopup({ isOpen, notOpen, lyrics }) {
  const [option1, setOption1] = useState(false);
  const [option2, setOption2] = useState(false);
  const [option3, setOption3] = useState(false);
  const [option4, setOption4] = useState(false);
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!state) {
      alert("Kindly login before continuing");
      navigate("/login");
    }
  }, []);

  const modalfunction = () => {
    if (isOpen) {
      notOpen(false);
    }
  };
  const submitSuggestion = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + "api/suggest", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
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
          setLoading(false);
          setError(data.error);
          toast.error(error);
        } else {
          setLoading(false);
          toast.success("Thankyou for Contributing");
          setTimeout(() => {
            navigate("/explore");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="Modal">
      <ToastContainer />
      <div className="FormPopup-container">
        <h2>Help Us Improve</h2>
        <br />
        <div className="Formpopup-container-input">
          <form>
            <label style={{ fontWeight: "600" }}>Select a reason:</label>
            <br />
            <div>
              <input
                type="radio"
                name="option"
                id="option1"
                value={option1}
                onChange={(e) => setOption1(true)}
              />
              <label htmlFor="option1">improve the lyrics</label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="option2"
                value={option2}
                onChange={(e) => setOption2(true)}
              />
              <label htmlFor="option2">improve about song</label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="option3"
                value={option3}
                onChange={(e) => setOption3(true)}
              />
              <label htmlFor="option3">add something else</label>
            </div>
            <div>
              <input
                type="radio"
                name="option"
                id="option4"
                value={option4}
                onChange={(e) => setOption4(true)}
              />
              <label htmlFor="option4">other</label>
            </div>
            <br />
            <div className="Formtextareadiv">
              <label style={{ fontWeight: "600" }}>
                Suggest an Improvement here..
              </label>
              <textarea
                cols="50"
                rows="10"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </form>
        </div>
        <div>
          <button
            className="form-submit-button"
            onClick={submitSuggestion}
            disabled={loading}
          >
            {loading && (
              <div>
                <ScaleLoader color="white" height={15} />
              </div>
            )}
            {!loading && <span>Submit</span>}
          </button>
        </div>
        <button className="form-cancel-button" onClick={modalfunction}>
          Close
        </button>
      </div>
    </div>
  );
}

export default FormPopup;
