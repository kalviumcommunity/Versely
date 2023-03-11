import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginpic3 from "../asset/loginpic3.png";
import logo from "../asset/logo.png";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const PostData = () => {
    setLoading(true);
    fetch(process.env.REACT_APP_API + "/api/user/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
        } else {
          toast.success({ html: data.message });
          setLoading(false);
          setTimeout(() => {
            navigate("/login");
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
              {!loading && <span>reset password</span>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
