import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Hidden,
  IconButton,
  Slide,
  Button,
  makeStyles,
  useTheme,
  useMediaQuery,
  useScrollTrigger
} from "@material-ui/core";
import { Search, Menu } from "@material-ui/icons";
import { setSearchTerm } from "../../Store/Actions/setSearchTerm";
import { getGifListCustom } from "../../Store/Thunk/getGifListCustom";
import { getTrendingList } from "../../Store/Thunk/getTrendingList";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: "#121212"
  },
  logo: {
    fontFamily: '"Righteous", cursive',
    letterSpacing: "2px",
    cursor: "pointer"
  },
  search: {
    backgroundColor: "gray",
    padding: "0 10px",
    borderRadius: "5px"
  },
  toolbar: theme.mixins.toolbar
}));

const NavBar = ({ openCloseMenu }) => {
  const classes = useStyles();
  const matchesSize = useMediaQuery(useTheme().breakpoints.up("md"));
  const trigger = useScrollTrigger();
  const searchInputValue = useSelector(state => state.searchTerm.searchTerm);
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setSearchTerm(e.target.value));
  };

  const search = () => {
    dispatch(getGifListCustom());
  };

  const searchTrending = () => {
    dispatch(getTrendingList());
  };

  return (
    <div>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root}>
          <Box width={matchesSize ? "80%" : "100%"} m="auto">
            <Toolbar>
              <Hidden mdUp>
                <Box m="0 10px 0 0">
                  <IconButton size="small" onClick={openCloseMenu}>
                    <Menu fontSize="large" style={{ color: "white" }} />
                  </IconButton>
                </Box>
              </Hidden>
              <Typography
                onClick={searchTrending}
                className={classes.logo}
                variant="h3"
              >
                GifBF
              </Typography>
              <Box
                ml="auto"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Button onClick={searchTrending} style={{ color: "inherit" }}>
                  <Typography
                    align="center"
                    variant="h6"
                    style={{ margin: "0 40px" }}
                  >
                    Trending GIFs
                  </Typography>
                </Button>

                <Box
                  display="flex"
                  alignItems="center"
                  className={classes.search}
                >
                  <InputBase
                    value={searchInputValue}
                    style={{ color: "white" }}
                    placeholder="Search for GIF"
                    onChange={handleChange}
                    onKeyDown={e => (e.keyCode === 13 ? search() : null)}
                  />
                  <IconButton onClick={search}>
                    <Search />
                  </IconButton>
                </Box>
              </Box>
            </Toolbar>
          </Box>
        </AppBar>
      </Slide>
      <div className={classes.toolbar}></div>
    </div>
  );
};

export default NavBar;
