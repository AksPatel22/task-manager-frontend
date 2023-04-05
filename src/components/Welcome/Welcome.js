import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../actions/authConstant";
import "./Welcome.css";

const Welcome = () => {
  let auth = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };
  return (
    <div>
      <h1>Welcome</h1>
      <p onClick={logout}>Go back</p>
    </div>
  );
};

export default Welcome;
