import { authConstants } from "../actions/constants";

const initialState = {
  userName: "",
  message: "",
  token: "",
  status: "",
  loading: false,
  error: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOGOUT_REQUEST:
      state = initialState;
      break;
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        userName: action.payload.data.user.name,
        status: "success",
        loading: false,
        error: "",
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstants.REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.REGISTER_SUCCESS:
      state = {
        ...state,
        userName: action.payload.data.user.name,
        status: "success",
        loading: false,
      };
      break;
    case authConstants.REGISTER_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    default:
      state = { ...state };
  }
  return state;
};
