import _ from "lodash";
import {
  GET_FILES,
  GET_FILE,
  ADD_FILE,
  DELETE_FILE,
  EDIT_FILE,
} from "../actions/types";

const fileReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_FILES:
      return {
        ...state,
        ..._.mapKeys(action.payload.results, "id"),
      };
    case GET_FILE:
    case ADD_FILE:
    case EDIT_FILE:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case DELETE_FILE:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};

export default fileReducer;