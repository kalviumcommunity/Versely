import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Contribute() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [SongName, setSongName] = useState("");
  const [Artist, setArtist] = useState("");
  const [lyrics, setlyrics] = useState("");
  const [about, setAbout] = useState("");
  const [url, setUrl] = useState("");

  setTimeout(() => {
    setLoading(false);
  }, 700);

  // useEffect(() => {
  //   if (url) {
  //     fetch("/api/createlyric", {
  //       method: "post",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + localStorage.getItem("jwt"),
  //       },
  //       body: JSON.stringify({
  //         SongName,
  //         Artist,
  //         lyrics,
  //         aboutLyrics: about,
  //         image: url,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.error) {
  //           setError(data.error);
  //         } else {
  //           setMessage(data.message);
  //           window.alert(
  //             "Lyric created successfully,Thankyou for contributing"
  //           );
  //           setLoading(true);
  //           navigate("/Explore");
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }
  // },);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", url);
    data.append("upload_preset", "Versely");
    data.append("cloud_name", "dccplpniz");
    fetch("https://api.cloudinary.com/v1_1/dccplpniz/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

    fetch("/api/createlyric", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        SongName,
        Artist,
        lyrics,
        aboutLyrics: about,
        image: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setMessage(data.message);
          window.alert("Lyric created successfully,Thankyou for contributing");
          setLoading(true);
          navigate("/Explore");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <div>
      <Navbar />
      <div className="Form">
        <h1>Add a Song Lyric</h1>
        <div className="Form-div">
          <div className="Input-text-area">
            <label>Song Name</label>
            <input
              type="text"
              placeholder=" Song Name"
              value={SongName}
              onChange={(e) => setSongName(e.target.value)}
            />
          </div>
          <br />
          <div className="Input-text-area">
            <label>Artist</label>
            <input
              type="text"
              placeholder=" Artist's Name"
              value={Artist}
              onChange={(e) => setArtist(e.target.value)}
            />
          </div>
          <div className="contributeflex">
            <div className="Songtextarea">
              <label>Song lyrics</label>
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
              <label>About Song and Explanation</label>
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
        </div>
        <label
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            marginRight: "2vh",
          }}
        >
          Upload Song Image
        </label>
        <input
          className="contributeimagebutton"
          type="file"
          accept="image/png, image/jpg, image/gif, image/jpeg"
          onChange={(e) => setUrl(e.target.files[0])}
        />
        <button className="contributebutton" onClick={() => postDetails()}>
          Submit
        </button>
        {error && <p className="error"> {error} </p>}
        {message && <p className="message"> {message} </p>}
      </div>
      <Footer />
    </div>
  );
}

export default Contribute;
