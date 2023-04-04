import { authConstants } from "../actions/constants";

const initialState = {
  userName: "",
  message: "",
  token: "",
  status: "fail",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        userName: action.payload.data.user.name,
        status: "success",
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
      };
      break;
    case authConstants.REGISTER_REQUEST:
      state = {
        ...state,
      };
      break;
    case authConstants.REGISTER_SUCCESS:
      state = {
        ...state,
      };
      break;
    case authConstants.REGISTER_FAILURE:
      state = {
        ...state,
      };
      break;
  }
  return state;
};
