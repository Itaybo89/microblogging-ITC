import React, { useContext, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavFunc from "./Componenets/NavFunc/NavFunc";
import HomePage from "./Componenets/HomePage/HomePage";
import Profile from "./Componenets/Profile/Profile";
import "./App.css";
import SignUp from "./Componenets/SignUp/SignUp";
import LoginPage from "./Componenets/LoginPage/LoginPage";
import { TootContext } from "./MyContext";

function App() {
  const {userId} = useContext(TootContext);

  return (
    <Router>
      <div id="App">
        <NavFunc />
        <Routes>
          <Route path="/" element={<LoginPage />} exact />
          <Route path="/SignUp" element={<SignUp />} exact />
          <Route path="/HomePage" element={<HomePage/>} exact />
          <Route path="/Profile" element={<Profile/>} exact />
          {/* {userId && <Route path="/HomePage" element={<HomePage />} exact />}
          {userId && <Route path="/Profile" element={<Profile />} exact />} */}
        </Routes>
      </div>

    </Router>
  );
}

export default App;
