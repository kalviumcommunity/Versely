import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import Avatar from "@mui/material/Avatar";

function User() {
  const [lyrics, setLyrics] = useState(null);
  const [user, setUser] = useState("");
  const loggedinUser = JSON.parse(sessionStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API}api/mylyric`, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("jwt"),
        },
      });
      const json = await response.json();
      setLyrics(json);
    };

    setUser(loggedinUser);
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="profilepage">
        <div className="profile-detail-container">
          <div className="Avatar-div">
            <Avatar
              alt="Remy Sharp"
              sx={{ width: 200, height: 200, bgcolor: "#3a54aa" }}
            />
          </div>
          <div className="Profile-detail">
            <h2 style={{ color: "#3a54aa" }}>{user.name}</h2>
            <h2 style={{ color: "#000000" }}>{user.email}</h2>
          </div>
        </div>
        <div className="Song-container">
          <h1>Lyrics Contributed By you</h1>
          <br />
          <div className="songdiv">
            {lyrics &&
              lyrics.mylyric.map((item) => {
                return (
                  <Link className="text-link" to={`/song/${item._id}`}>
                    <div className="songcard" key={item._id}>
                      <img src={item.image} alt="" />
                      <div>
                        <h3>{item.SongName}</h3>
                        <p>{item.Artist}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default User;
