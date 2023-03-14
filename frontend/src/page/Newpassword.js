import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginpic from "../asset/loginpic.png";
import logo from "../asset/logo.png";
import google from "../asset/google.png";
import { useNavigate, useParams } from "react-router-dom";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Newpassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const { token } = useParams();
  console.log(token);
  const [loading, setLoading] = useState(false);

  const showPassword = () => {
    let x = document.getElementById("showpassword");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  };

  const passwordREGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  const PostData = () => {
    setLoading(true);

    if (!passwordREGEX.test(password)) {
      setLoading(false);
      toast.error(
        "password should not be less than 6 characters and must contain atleast one number, one uppercase, one lowercase"
      );
      return;
    }

    fetch(process.env.REACT_APP_API + "api/user/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        token,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setLoading(false);
          toast.error(`${data.error}`);
          console.log(data.error);
        } else {
          toast.success(data.message);
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
      <div className="reset-container">
        {/* <div className="loginvectordiv">
          <img className="loginvector" src={loginpic} alt="img" />
        </div> */}

        <div className="Login-form">
          <div>
            <img className="logo" src={logo} alt="logo" />
          </div>
          <br />
          <br />

          <div className="Password input">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter new Password"
              value={password}
              id="showpassword"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <input
              type="checkbox"
              onClick={showPassword}
              style={{ marginLeft: "2vh" }}
            />
            Show Password
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
              {!loading && <span>Reset Password</span>}
            </button>
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

export default Newpassword;
