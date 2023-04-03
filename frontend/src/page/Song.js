import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import FormPopup from "../component/FormPopup";

function Song() {
  const { id } = useParams();
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [language, setLanguage] = useState("English");

  const handleState = (e) => {
    setModal(e);
  };

  const suggestImprovement = () => {
    if (modal === false) {
      setModal(true);
    } else {
      setModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.REACT_APP_API + `api/lyric/${id}`
      );
      const json = await response.json();
      setLyrics(json);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <Navbar />
          <div
            className="loader"
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ScaleLoader color="#3A54AA" size={150} />
          </div>
          <Footer />
        </div>
      ) : (
        <div>
          <Navbar />
          <div className="Song-container">
            <div className="Song-name-div">
              <img src={lyrics.lyric.image} alt="" />
              <article>
                <h1>{lyrics.lyric.SongName}</h1>
                <h3>{lyrics.lyric.Artist}</h3>
                <p>posted by: {lyrics.lyric.postedBy.name}</p>
                {lyrics.lyric.language ? (
                  <div>
                    <p>Available language:</p>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option>English</option>
                      <option>{lyrics.lyric.language}</option>
                    </select>
                  </div>
                ) : null}
                <button
                  className="improvementbutton"
                  onClick={suggestImprovement}
                >
                  Suggest an improvement
                </button>
              </article>
            </div>
            <div className="Song-lyrics-div">
              <div>
                {language === "English" ? (
                  <p>{lyrics.lyric.lyrics}</p>
                ) : (
                  <p>{lyrics.lyric.LangLyrics}</p>
                )}
              </div>
              <div>
                {lyrics.lyric.aboutLyrics ? (
                  <div className="AboutSongBox">
                    <h3>About the Song</h3>
                    <p>{lyrics.lyric.aboutLyrics}</p>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
            <div>
              {modal ? (
                <FormPopup
                  isOpen={modal}
                  notOpen={handleState}
                  lyrics={lyrics}
                />
              ) : (
                <div></div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Song;
