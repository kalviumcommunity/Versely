import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginpic from "../asset/loginpic.png";
import logo from "../asset/logo.png";
import google from "../asset/google.png";
import { useNavigate } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "./GoogleAuth";

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    let x = document.getElementById("showpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const emailREGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const passwordREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const PostData = () => {
    setLoading(true);
    if (!emailREGEX.test(email)) {
      setLoading(false);
      toast.error("invalid email");
      return;
    }
    if (!passwordREGEX.test(password)) {
      setLoading(false);
      toast.error(
        "password should not be less than 6 characters and must contain atleast one number, one uppercase, one lowercase"
      );
      return;
    }
    fetch(process.env.REACT_APP_API + "api/user/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
          toast.error(`${data.error}`);
          console.log(data.error);
        } else {
          toast.success("Successfully Signed Up");
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ToastContainer />
      <div className="login-container">
        <div className="loginvectordiv">
          <img className="loginvector" src={loginpic} alt="img" />
        </div>

        <div className="Login-form">
          <div>
            <img className="logo" src={logo} alt="logo" />
          </div>
          <br />
          <br />

          <div className="Name input">
            <label>Name</label>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="Email input">
            <label>Email Id</label>
            <input
              type="email"
              placeholder="Email id"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="Password input">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="showpassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div style={{ fontSize: "2.2vh" }}>
            <input
              type="checkbox"
              onClick={showPassword}
              style={{ marginLeft: "2vh" }}
            />
            &nbsp;Show Password
          </div>
          <div>
            <button
              className="Signup-button"
              onClick={PostData}
              disabled={loading}
            >
              {loading && (
                <div>
                  <ScaleLoader color="white" height={15} />
                </div>
              )}
              {!loading && <span>Sign up</span>}
            </button>
          </div>
          <div>
            <div>
              <GoogleAuth />
            </div>
          </div>
          <div>
            <p className="Login-Title">
              Already have an account{" "}
              <Link style={{ color: "#3A54AA" }} to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
