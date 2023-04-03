import React, { useState, useContext } from "react";
import { UserContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import loginpic3 from "../asset/loginpic3.png";
import logo from "../asset/logo.png";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GoogleAuth from "./GoogleAuth";

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const showPassword = () => {
    let x = document.getElementById("showpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const PostData = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + "api/user/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
        } else {
          sessionStorage.setItem("jwt", data.token);
          sessionStorage.setItem("user", JSON.stringify(data.user));
          toast.success("Successfully Logged In");
          dispatch({ type: "USER", payload: data.user });
          setLoading(false);
          setTimeout(() => {
            navigate("/");
          }, 3000);
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
          <img className="loginvector3" src={loginpic3} alt="img" />
        </div>

        <div className="Login-form">
          <div>
            <img className="logo" src={logo} alt="logo" />
          </div>
          <br />
          <br />
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
              {!loading && <span>Login</span>}
            </button>
          </div>
          <div>
            <p className="Login-Title">
              Forgot password?&nbsp;&nbsp;
              <Link style={{ color: "#3A54AA" }} to="/reset">
                reset
              </Link>
            </p>
          </div>
          <div>
            <div>
              <GoogleAuth />
            </div>
          </div>
          <div>
            <p className="Login-Title">
              Don't have an account ?&nbsp;&nbsp;
              <Link style={{ color: "#3A54AA" }} to="/Signup">
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
