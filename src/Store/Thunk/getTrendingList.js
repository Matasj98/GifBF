import axios from "axios";
import { setGifListLoading, setGifList, setGifListName } from "../Actions/setGifList";
import { setSearchTerm } from "../Actions/setSearchTerm";
import { setFakeApiSearchTerm } from "../Actions/setFakeApiSearchTerm";

export const getTrendingList = () => (dispatch) => {
    dispatch(setGifListLoading(true));
    axios
        .get("https://api.giphy.com/v1/gifs/trending", {
            params: {
                api_key: "WYuuWO9uW1KJpPALeDKJM0NdJkjnccax",
                rating: "g",
                limit: "25",
            },
        })
        .then((res) => {
            if (res.data.data.length > 0) {
                dispatch(setGifList(res.data.data));
            } else dispatch(setGifList("No data"));
            dispatch(setGifListLoading(false));
            dispatch(setGifListName("Trending GIFs"));
            dispatch(setSearchTerm(""));
            dispatch(setFakeApiSearchTerm());
        })
        .catch((err) => {
            dispatch(setGifListLoading(false));
            dispatch(setGifList("Error"));
            console.log(err);
        });
};
