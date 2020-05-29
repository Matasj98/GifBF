import { combineReducers } from "redux";
import { searchTerm } from "./searchTerm";
import { gifList } from "./gifList";
import { fakeApiSearchTerm } from "./fakeApiSearchTerm";
import { snackBar } from "./snackBar";

const appReducer = combineReducers({
    searchTerm,
    gifList,
    fakeApiSearchTerm,
    snackBar,
});

export const allReducer = (state, action) => {
    if (action.type === "RESET_APP") {
        state = undefined;
    }
    return appReducer(state, action);
};
