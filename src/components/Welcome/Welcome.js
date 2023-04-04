import React from "react";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Welcome</h1>
      <p onClick={() => navigate("/", { replace: true })}>Go back</p>
    </div>
  );
};

export default Welcome;
