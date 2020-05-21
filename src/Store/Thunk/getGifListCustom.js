import axios from "axios";
import { setGifList, setGifListLoading, setGifListName } from "../Actions/setGifList";
import { postFakeApiSearchTerm } from "./postFakeApiSearchTerm";

export const getGifListCustom = () => (dispatch, getState) => {
    dispatch(setGifListLoading(true));
    const term = getState().searchTerm.searchTerm;
    axios
        .get("https://api.giphy.com/v1/gifs/search", {
            params: {
                api_key: "WYuuWO9uW1KJpPALeDKJM0NdJkjnccax",
                q: term,
                rating: "g",
                limit: "25",
            },
        })
        .then((res) => {
            if (res.data.data.length > 0) {
                dispatch(setGifList(res.data.data));
            } else dispatch(setGifList("No data"));
            dispatch(setGifListLoading(false));
            dispatch(setGifListName(term));
            dispatch(postFakeApiSearchTerm());
        })
        .catch((err) => {
            dispatch(setGifListLoading(false));
            dispatch(setGifList("Error"));
            console.log(err);
        });
};
