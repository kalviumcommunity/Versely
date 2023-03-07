import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Home1 from "../asset/Home1.png";
import Home2 from "../asset/Home2.jpg";
import Home3 from "../asset/Home3.png";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import ScaleLoader from "react-spinners/ScaleLoader";

function Home() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/alllyric", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result.posts[0]._id);
        setData(result.posts);
      });
  }, []);

  // setLoading(false);

  if (loading) {
    return (
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
    );
  }

  return (
    <div>
      <Navbar />
      <div className="Box">
        <h1>Elevating the music experience.</h1>
        <img src={Home1} alt="" />
      </div>
      <div className="Box1">
        <div>
          <h2>
            Enhancing your
            <br />
            music experience
          </h2>
          <p>
            Search and explore various songs <br />
            lyrics their explanation with translation <br />
            in different languages and more...
          </p>
        </div>
        <div className="imgdiv">
          <img src={Home2} alt="" />
        </div>
      </div>
      <div className="Box2">
        <div className="Content">
          <h2>
            Making lyrics better,
            <br />
            together.
          </h2>
          <p>
            Contribute to add about music facts and explanation of the lyrics
            and take yours and others musical experience to next level and earn
            points.
          </p>
        </div>
        <div>
          <img src={Home3} alt="" />
        </div>
      </div>
      <div className="Box3">
        <h2>Explore Song Lyrics</h2>
        <div className="songdiv">
          {data.slice(0, 4).map((item) => {
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
        <button className="explorebutton">
          <Link className="linkbutton" to="/explore">
            Explore more..
          </Link>
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
