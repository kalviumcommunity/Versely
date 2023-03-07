import Home from "./page/Home";
import React, { useEffect, createContext, useReducer, useContext } from "react";
import Explore from "./page/Explore";
import Contribute from "./page/Contribute";
import Login from "./page/Login";
import Signup from "./page/Signup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Song from "./page/Song";
import { reducer, initialState } from "./reducers/userReducer";

export const UserContext = createContext();

const Routing = () => {
  const Navigate = useNavigate();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "USER", payload: user });
      Navigate("/");
    } else {
      Navigate("/Login");
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/Contribute" element={<Contribute />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Song/:id" element={<Song />} />
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
