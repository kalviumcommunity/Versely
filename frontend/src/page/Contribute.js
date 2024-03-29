import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import "react-toastify/dist/ReactToastify.css";

function Contribute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [SongName, setSongName] = useState("");
  const [Artist, setArtist] = useState("");
  const [lyrics, setlyrics] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("");
  const [LangLyrics, setLangLyrics] = useState("");

  const postDetails = () => {
    setLoading(true);
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "Versely");
    data.append("cloud_name", "dccplpniz");
    fetch(process.env.REACT_APP_CLOUDAPI, {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
        setError(data.error);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetch(process.env.REACT_APP_API + "api/createlyric", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        SongName,
        Artist,
        lyrics,
        language,
        LangLyrics,
        aboutLyrics: about,
        image: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          navigate("/explore");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [url]);

  return (
    <div>
      <Navbar />
      <div className="Form">
        <h1>Add a Song Lyric</h1>
        <div className="Form-div">
          <div className="Input-text-area">
            <label>*Song Name</label>
            <input
              type="text"
              placeholder=" Song Name"
              value={SongName}
              onChange={(e) => setSongName(e.target.value)}
            />
          </div>
          <br />
          <div className="Input-text-area">
            <label>*Artist</label>
            <input
              type="text"
              placeholder=" Artist's Name"
              value={Artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="contributeflex">
            <div className="Songtextarea">
              <label style={{ marginBottom: "1vh" }}>*Song lyrics</label>
              <textarea
                className="ContributeTextArea"
                rows="12"
                cols="60"
                placeholder="Song lyrics"
                value={lyrics}
                onChange={(e) => setlyrics(e.target.value)}
              />
            </div>
            <div className="Abouttextarea">
              <label style={{ marginBottom: "1vh" }}>
                About Song and Explanation(optional)
              </label>
              <textarea
                className="ContributeTextArea"
                rows="12"
                cols="60"
                placeholder="About the Song"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div className="Input-text-area">
              <label style={{ marginBottom: "1vh" }}>
                Lyrics in other language(optional)
              </label>
              <input
                type="text"
                placeholder="Enter Language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div className="Songtextarea">
              <label style={{ marginBottom: "1vh" }}>
                Lyrics in other language(optional){" "}
              </label>
              <textarea
                className="ContributeTextArea"
                rows="12"
                cols="60"
                placeholder="Lyrics in other language"
                value={LangLyrics}
                onChange={(e) => setLangLyrics(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <label
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginRight: "2vh",
          }}
        >
          Upload Song Image(optional)
        </label>
        <input
          className="contributeimagebutton"
          type="file"
          onChange={(e) => setUrl(e.target.files[0])}
        />
        {loading && (
          <div>
            <ScaleLoader
              style={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "5vh",
              }}
              color="#3a54aa"
              height={15}
            />
          </div>
        )}
        {!loading && (
          <div>
            <button className="contributebutton" onClick={postDetails}>
              Submit
            </button>
          </div>
        )}
        {error && (
          <div
            style={{ textAlign: "center", color: "red", marginBottom: "5vh" }}
          >
            *Please fill the required fields
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Contribute;
