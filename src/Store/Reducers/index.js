import { combineReducers } from "redux";
import { searchBy } from "./searchBy";

const appReducer = combineReducers({
  searchBy
});

export const allReducer = (state, action) => {
  if (action.type === "RESET_APP") {
    state = undefined;
  }
  return appReducer(state, action);
};
