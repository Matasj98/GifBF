import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { InputBase, IconButton, Box, makeStyles } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { getGifListCustom } from "../../Store/Thunk/getGifListCustom";
import { setSearchTerm } from "../../Store/Actions/setSearchTerm";

const useStyles = makeStyles({
    search: {
        backgroundColor: "#8a0b31",
        padding: "0 10px",
        borderRadius: "5px",
    },
});

const SearchBar = () => {
    const searchTerm = useSelector((state) => state.searchTerm.searchTerm);
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    const search = () => {
        dispatch(getGifListCustom());
    };

    return (
        <Box mb='20px' display='flex' alignItems='center' justifyContent='space-between' className={classes.search}>
            <InputBase
                fullWidth
                value={searchTerm}
                style={{ color: "white" }}
                placeholder='Search for GIF'
                onChange={handleChange}
                onKeyDown={(e) => (e.keyCode === 13 ? search() : null)}
            />
            <IconButton onClick={search}>
                <Search />
            </IconButton>
        </Box>
    );
};

export default SearchBar;
