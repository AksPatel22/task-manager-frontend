import { taskConstants } from "../actions/constants";

const initialState = {
  allTasks: [],
  singleTask: {},
  error: "",
  status: "",
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.CREATE_SINGLE_REQUEST:
      state = {
        ...state,
        status: "false",
        loading: true,
        error: "",
      };
      break;
    case taskConstants.CREATE_SINGLE_SUCCESS:
      state = {
        ...state,
        status: "success",
        loading: false,
        error: "",
        allTasks: [...state.allTasks, action.payload.data.task],
      };
      break;
    case taskConstants.CREATE_SINGLE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case taskConstants.GET_ALL_TASK_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case taskConstants.GET_ALL_TASK_SUCCESS:
      state = {
        ...state,
        allTasks: action.payload.data.tasks,
        loading: false,
      };
      break;
    case taskConstants.GET_ALL_TASK_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case taskConstants.GET_SINGLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case taskConstants.GET_SINGLE_SUCCESS:
      state = {
        ...state,
        singleTask: state.allTasks.find(
          (item) => item._id === action.payload.data
        ),
        loading: false,
      };
      break;
    case taskConstants.GET_SINGLE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case taskConstants.UPDATE_SINGLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case taskConstants.UPDATE_SINGLE_SUCCESS:
      let specificTask = state.allTasks.find(
        (item) => item._id === action.payload.data.task._id
      );
      let specificTaskIndex = state.allTasks.indexOf(specificTask);
      state.allTasks[specificTaskIndex] = action.payload.data.task;
      state = {
        ...state,
        singleTask: {},
        loading: false,
      };
      break;
    case taskConstants.UPDATE_SINGLE_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case taskConstants.CLEAR_SINGLE_TASK:
      state = {
        ...state,
        singleTask: {},
      };
      break;
    case taskConstants.DELETE_SINGLE_REQUEST:
      state = {
        ...state,
      };
      break;
    case taskConstants.DELETE_SINGLE_SUCCESS:
      state = {
        ...state,
        allTasks: state.allTasks.filter(
          (task) => task._id !== action.payload.id
        ),
      };
      break;
    case taskConstants.DELETE_SINGLE_FAILURE:
      state = {
        ...state,
      };
      break;
    case taskConstants.CLEAR_DATA:
      state = initialState;
      break;
    default:
      state = { ...state };
  }
  return state;
};
