import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
const GoogleAuth = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  console.log(process.env.REACT_APP_GOOGLE);
  const handleCallbackResponse = async (response) => {
    const fetchdata = await fetch(
      "http://localhost:7000/api/user/auth/googleauth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: response.credential,
        }),
      }
    );
    const jsondata = await fetchdata.json();

    sessionStorage.setItem("jwt", jsondata.jwtoken);
    sessionStorage.setItem("user", JSON.stringify(jsondata.user));
    dispatch({ type: "USER", payload: jsondata.user });
    navigate("/");
    setLoading(false);
  };
  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE,
      callback: handleCallbackResponse,
    });
    google.accounts.id.renderButton(document.getElementById("signindiv"), {
      theme: "outline",
      width: "360",
    });
  }, []);

  return (
    <div>
      <div
        style={{
          marginBottom: "3vh",
          marginTop: "2vh",
          borderRadius: "7vh",
          paddingLeft: "1vh",
        }}
        id="signindiv"
      ></div>
    </div>
  );
};

export default GoogleAuth;
