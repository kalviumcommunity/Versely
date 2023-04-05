import Home from "./page/Home";
import React, { createContext, useReducer } from "react";
import Explore from "./page/Explore";
import Contribute from "./page/Contribute";
import Login from "./page/Login";
import Signup from "./page/Signup";
import GoogleAuth from "./page/GoogleAuth";
import { Route, Routes } from "react-router-dom";
import Song from "./page/Song";
import ResetPassword from "./page/ResetPassword";
import Newpassword from "./page/Newpassword";
import { reducer, initialState } from "./reducers/userReducer";
import User from "./page/User";
import Terms from "./page/T&C";
import Aboutus from "./page/Aboutus";
import Error from "./page/Error";
export const UserContext = createContext();

const Routing = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/contribute" element={<Contribute />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/song/:id" element={<Song />} />
        <Route path="/googleauth" element={<GoogleAuth />} />
        <Route exact path="/reset" element={<ResetPassword />} />
        <Route path="/reset/:token" element={<Newpassword />} />
        <Route path="/user" element={<User />} />
        <Route path="/termsandcondition" element={<Terms />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="*" element={<Error />} />
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
