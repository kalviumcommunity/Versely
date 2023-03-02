import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Home1 from "../asset/Home1.png";
import Home2 from "../asset/Home2.jpg";
import Home3 from "../asset/Home3.png";
import Songimage from "../asset/songimage1.png";
import Songimage2 from "../asset/songimage2.jpg";
import Songimage3 from "../asset/songimage3.jpg";
import Songimage4 from "../asset/songimage4.png";

function Home() {
  const Navigate = useNavigate();
  return (
    <div>
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
        <div>
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
        <button>{Navigate("/Song")}</button>
        <div className="songdiv">
          <Link to="/Song/63fee27773593adf8c1223a6">
            <div className="songcard">
              <img src={Songimage} alt="" />
              <h3>Until I Found You</h3>
              <p>Stephen Sanchez</p>
            </div>
          </Link>
          <Link to="/Song/640033003ddfd670c13fcf67">
            <div className="songcard">
              <img src={Songimage2} alt="" />
              <h3>Thunderstruck</h3>
              <p>AC/DC</p>
            </div>
          </Link>
          <Link to="/Song/640034353ddfd670c13fcf83">
            <div className="songcard">
              <img src={Songimage3} alt="" />
              <h3>Agar Tum Sath Ho</h3>
              <p>Alka Yagnik, Arjit Singh</p>
            </div>
          </Link>
          <Link to="/Song/640033ae3ddfd670c13fcf76">
            <div className="songcard">
              <img src={Songimage4} alt="" />
              <h3>Mood</h3>
              <p>24KGoldn</p>
            </div>
          </Link>
        </div>
        <button className="explorebutton">
          <Link className="linkbutton" to="/Explore">
            Explore more..
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Home;
