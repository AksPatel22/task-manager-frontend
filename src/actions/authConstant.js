import axios from "axios";
import { authConstants } from "./constants";

const headers = {
  "Content-Type": "application/json",
};

export const loginUser = (Data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGIN_REQUEST,
    });
    let response = "";
    try {
      response = await axios.post(
        "https://task-manager-server-5gxe.onrender.com/api/v1/auth/login",
        JSON.stringify(Data),
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { data, status, message } = response;
    if (response.status === 200) {
      localStorage.setItem("jwt", response.data.token);
      localStorage.setItem("name", response.data.user.name);
      console.log("test");
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const registerUser = (Data) => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.REGISTER_REQUEST,
    });
    let response = "";
    try {
      response = await axios.post(
        "https://task-manager-server-5gxe.onrender.com/api/v1/auth/register",
        JSON.stringify(Data),
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { data, status, message } = response;
    if (response.status === 201) {
      dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type: authConstants.REGISTER_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch({
      type: authConstants.LOGOUT_REQUEST,
    });
  };
};
