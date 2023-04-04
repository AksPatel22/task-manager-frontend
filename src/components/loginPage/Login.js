import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../actions/authConstant";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [data, setData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleRegister = () => {
    setLogin(!login);
    setEmail("");
    setName("");
    setPassword("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setData({ email: email, password: password });
    dispatch(loginUser("login", data));
  };
  return (
    <>
      <div className="container">
        <div className="img-container"></div>
        <div className="form-container">
          <div className="form-description">
            <h1>Welcome</h1>
            <p>
              "Stay on top of your tasks with just a click - log in now to our
              task-manager app!"
            </p>
          </div>
          {login ? (
            <form action="" noValidate>
              <input
                type="email"
                name=""
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                name=""
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="login-btn"
                onClick={handleSubmit}
              >
                Log In
              </button>
              <p>
                Click here to <span onClick={handleRegister}>Register</span>
              </p>
            </form>
          ) : (
            <form action="" noValidate>
              <input
                type="text"
                name=""
                placeholder="username"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <input
                type="email"
                name=""
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              <input
                type="password"
                name=""
                id=""
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="login-btn"
                onClick={handleSubmit}
              >
                Register
              </button>
              <p>
                Existing User? <span onClick={handleRegister}>Sign In</span>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default Login;
