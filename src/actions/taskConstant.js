import axios from "axios";
import { taskConstants } from "./constants";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
};

export const createTask = (Data) => {
  return async (dispatch) => {
    dispatch({
      type: taskConstants.CREATE_SINGLE_REQUEST,
    });
    let response = "";
    try {
      response = await axios.post(
        "https://task-manager-server-5gxe.onrender.com/api/v1/tasks",
        JSON.stringify(Data),
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { data, status } = response;
    if (response.status === 201) {
      dispatch({
        type: taskConstants.CREATE_SINGLE_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type: taskConstants.CREATE_SINGLE_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const getAllTask = () => {
  return async (dispatch) => {
    dispatch({
      type: taskConstants.GET_ALL_TASK_REQUEST,
    });
    let response = "";
    try {
      response = await axios.get(
        "https://task-manager-server-5gxe.onrender.com/api/v1/tasks",
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { data, status } = response;
    console.log(response);
    if (response.status === 200) {
      dispatch({
        type: taskConstants.GET_ALL_TASK_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type: taskConstants.GET_ALL_TASK_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const getTask = (id) => {
  return async (dispatch) => {
    dispatch({
      type: taskConstants.GET_SINGLE_SUCCESS,
      payload: {
        data: id,
      },
    });
  };
};

export const editTask = (Data, id) => {
  return async (dispatch) => {
    dispatch({
      type: taskConstants.UPDATE_SINGLE_REQUEST,
    });
    let response = "";
    try {
      response = await axios.patch(
        `https://task-manager-server-5gxe.onrender.com/api/v1/tasks/${id}`,
        JSON.stringify(Data),
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { data, status } = response;
    if (response.status === 200) {
      dispatch({
        type: taskConstants.UPDATE_SINGLE_SUCCESS,
        payload: {
          data,
          status,
        },
      });
    } else {
      dispatch({
        type: taskConstants.UPDATE_SINGLE_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const deleteTask = (id) => {
  return async (dispatch) => {
    dispatch({
      type: taskConstants.DELETE_SINGLE_REQUEST,
    });
    let response = "";
    try {
      response = await axios.delete(
        `https://task-manager-server-5gxe.onrender.com/api/v1/tasks/${id}`,
        { headers }
      );
    } catch (error) {
      response = error.response;
    }
    const { status } = response;
    if (response.status === 200) {
      dispatch({
        type: taskConstants.DELETE_SINGLE_SUCCESS,
        payload: {
          id,
          status,
        },
      });
    } else {
      dispatch({
        type: taskConstants.DELETE_SINGLE_FAILURE,
        payload: {
          status: response.status,
          error: response.data.msg,
        },
      });
    }
  };
};

export const clearSingleTask = () => {
  return async (dispatch) => {
    dispatch({ type: taskConstants.CLEAR_SINGLE_TASK });
  };
};

export const clearData = () => {
  return async (dispatch) => {
    dispatch({ type: taskConstants.CLEAR_DATA });
  };
};
