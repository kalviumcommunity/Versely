import Home from "./page/Home";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import Explore from "./page/Explore";
import Contribute from "./page/Contribute";
import Login from "./page/Login";
import Signup from "./page/Signup";
import GoogleAuth from "./page/GoogleAuth";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Song from "./page/Song";
import ResetPassword from "./page/ResetPassword";
import Newpassword from "./page/Newpassword";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      navigate("/");
    } else {
      if (!location.pathname.startsWith("/reset")) navigate("/login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/googleauth" element={<GoogleAuth/>}/>
        <Route exact path="/reset" element={<ResetPassword />} />
        <Route path="/reset/:token" element={<Newpassword />} />
      </Routes>
    </>
  );
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <Routing />
      </div>
    </UserContext.Provider>
  );
}

export default App;
