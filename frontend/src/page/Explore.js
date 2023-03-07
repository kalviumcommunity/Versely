import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  }, []);

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
      <div>
        <h1 className="Exploretitle">Explore Song Lyircs</h1>
        <div>
          <div className="songdiv">
            {data.map((item) => {
              return (
                <Link className="text-link" to={`/Song/${item._id}`}>
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

export default Explore;
