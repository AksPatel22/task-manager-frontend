import axios from "axios";
import { authConstants } from "./constants";

const headers = {
  "Content-Type": "application/json",
};

export const loginUser = (TYPE, Data) => {
  return async (dispatch) => {
    dispatch({
      type:
        TYPE === "login"
          ? authConstants.LOGIN_REQUEST
          : authConstants.REGISTER_REQUEST,
    });
    const response = await axios.post(
      "https://task-manager-server-5gxe.onrender.com/api/v1/auth/login",
      JSON.stringify(Data),
      { headers }
    );
    const { data, status, message } = response;
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type:
          TYPE === "login"
            ? authConstants.LOGIN_SUCCESS
            : authConstants.REGISTER_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type:
          TYPE === "login"
            ? authConstants.LOGIN_FAILURE
            : authConstants.REGISTER_FAILURE,
        payload: {
          message,
          status,
          error: response.data.error,
        },
      });
    }
  };
};
