import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import Footer from "../component/Footer";

function Terms() {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://versely-go.onrender.com/getposts");
      const json = await response.json();
      setData(json);
      console.log(json);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="terms-container">
        <h1>Terms And Condition</h1>
        <div>
          <ul>
            {data &&
              data.posts.map((items) => {
                return <li>{items.Body}</li>;
              })}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;
