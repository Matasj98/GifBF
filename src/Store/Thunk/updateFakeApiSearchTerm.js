import axios from "axios";
import { setFakeApiSearchTerm } from "../Actions/setFakeApiSearchTerm";

export const updateFakeApiSearchTerm = () => (dispatch, getState) => {
    const term = getState().searchTerm.searchTerm;
    axios
        .patch("https://reqres.in/api/users", {
            term: term,
        })
        .then((res) => {
            dispatch(setFakeApiSearchTerm(res.data.term, res.data.updatedAt));
        })
        .catch((err) => console.log(err));
};
