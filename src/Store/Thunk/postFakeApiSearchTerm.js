import axios from "axios";
import { setFakeApiSearchTerm } from "../Actions/setFakeApiSearchTerm";

export const postFakeApiSearchTerm = () => (dispatch, getState) => {
    const term = getState().searchTerm.searchTerm;
    axios
        .post("https://reqres.in/api/users", {
            term: term,
        })
        .then((res) => {
            dispatch(setFakeApiSearchTerm(res.data.term, res.data.createdAt));
        })
        .catch((err) => console.log(err));
};
