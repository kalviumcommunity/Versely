import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function User() {
  const [lyrics, setLyrics] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${process.env.REACT_APP_API}api/mylyric`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      });
      const json = await response.json();
      setLyrics(json);
    };
    const loggedinUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedinUser);
    fetchData();
  }, []);

  return (
    <div className="profilepage">
      <Navbar />
      <h1>My Profile</h1>
      <div>
        <h2>
          <h2 style={{ color: "#3a54aa" }}>{user.name}</h2>
        </h2>
        <h3>
          <h2>{user.email}</h2>
        </h3>
        <h4
          style={{
            marginBottom: "2vh",
            marginTop: "2vh",
            color: "#3a54aa",
            textDecoration: "none",
          }}
        >
          <Link to="/reset">Reset Password</Link>
        </h4>
      </div>
      <div>
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
      <Footer />
    </div>
  );
}

export default User;
