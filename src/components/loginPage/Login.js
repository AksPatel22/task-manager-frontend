import React, { useEffect, useState } from "react";
import "./Login.css";
import { useFetcher, useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../../actions/authConstant";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  let auth = useSelector((state) => state.auth);
  let loading = useSelector((state) => state.auth.loading);
  let errorMsg = useSelector((state) => state.auth.error);

  const [error, setError] = useState(errorMsg);
  const [login, setLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInputs = (email, password, name) => {
    if (!regex.test(email)) {
      setError("invalid email");
      return;
    }
    if (login) {
      if (email === "" || password === "") {
        setError("please provide all the details");
        return;
      }
    } else {
      if (email === "" || password === "" || name === "") {
        setError("please provide all the details");
        return;
      }
    }
    return true;
  };
  const handleRegister = () => {
    setLogin(!login);
    setEmail("");
    setName("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs(email, password, name)) {
      if (login) {
        dispatch(loginUser({ email, password }));
      } else {
        dispatch(registerUser({ name, email, password }));
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      navigate("/home", { replace: true });
    }
  }, [auth]);

  useEffect(() => {
    setError(errorMsg);
  }, [errorMsg]);

  return (
    <>
      <div className="login-container">
        <div className="img-container"></div>
        <div className="form-container">
          <div className="form-description">
            <h1>TaskMaster</h1>
            <p>
              "Stay on top of your tasks with just a click - log in now to our
              task-manager app!"
            </p>
          </div>
          {login ? (
            <form action="" noValidate className="login-form">
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
                {!loading ? "Log In" : ""}
                {loading ? (
                  <i className="fa fa-spinner fa-spin loader"></i>
                ) : (
                  ""
                )}
              </button>
              <p>
                Click here to <span onClick={handleRegister}>Register</span>
              </p>
            </form>
          ) : (
            <form action="" noValidate className="login-form">
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
                {!loading ? "Register" : ""}
                {loading ? (
                  <i className="fa fa-spinner fa-spin loader"></i>
                ) : (
                  ""
                )}
              </button>
              <p>
                Existing User? <span onClick={handleRegister}>Sign In</span>
              </p>
            </form>
          )}
          <div className="error-handler">
            <h4>{error}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
