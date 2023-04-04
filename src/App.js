import React from "react";
import "./App.css";
import Login from "./components/loginPage/Login";
import Welcome from "./components/Welcome/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
};
export default App;
