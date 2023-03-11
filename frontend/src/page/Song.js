import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Song() {
  const { id } = useParams();
  const [lyrics, setLyrics] = useState(null);
  const [loading, setLoading] = useState(true);

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
              </article>
            </div>
            <div className="Song-lyrics-div">
              <div>
                <p>{lyrics.lyric.lyrics}</p>
              </div>
              <div>
                {lyrics.lyric.aboutLyrics ? (
                  <div className="AboutSongBox">
                    <h3>About the Song</h3>
                    <p>{lyrics.lyric.aboutLyrics}</p>
                    <button className="improvementbutton">
                      Suggest an improvement
                    </button>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Song;
