import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Explore() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [List, setList] = useState("");

  useEffect(() => {
    fetch(process.env.REACT_APP_API + "api/alllyric", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.posts);
        setLoading(false);
      });
  }, []);

  const letdata = Object.values(data);
  const search_parameters = ["SongName", "Artist"];

  function search(data) {
    return data.filter((item) =>
      search_parameters.some((parameter) =>
        item[parameter].toString().toLowerCase().includes(List)
      )
    );
  }

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
        <h1 className="Exploretitle">Explore Song Lyrics</h1>
        <div>
          <div className="Search-button-div">
            <input
              className="Search-button"
              type="text"
              placeholder="Search Lyrics here..."
              onChange={(e) => setList(e.target.value)}
            />
          </div>
          <div className="songdiv">
            {search(letdata).map((item) => {
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

export default Explore;
