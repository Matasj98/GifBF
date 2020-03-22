import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  Hidden,
  IconButton,
  Slide,
  makeStyles,
  useTheme,
  useMediaQuery,
  useScrollTrigger
} from "@material-ui/core";
import { Search, Menu } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  root: {
    color: "white",
    backgroundColor: '#121212'
  },
  logo: {
    fontFamily: '"Righteous", cursive',
    letterSpacing: "2px"
  },
  search: {
    backgroundColor: "gray"
  },
  toolbar: theme.mixins.toolbar
}));

const NavBar = ({ openCloseMenu }) => {
  const classes = useStyles();
  const matchesSize = useMediaQuery(useTheme().breakpoints.up("md"));
  const trigger = useScrollTrigger();

  return (
    <div>
      <Slide appear={false} direction="down" in={!trigger}>
        <AppBar className={classes.root}>
          <Box width={matchesSize ? "80%" : "100%"} m="auto">
            <Toolbar>
              <Hidden mdUp>
                <Box m="0 10px 0 0">
                  <IconButton size="small" onClick={openCloseMenu}>
                    <Menu fontSize="large" style={{color: 'white'}}/>
                  </IconButton>
                </Box>
              </Hidden>
              <Typography className={classes.logo} variant="h3">
                GifBF
              </Typography>
              <Box
                ml="auto"
                display="flex"
                alignItems="center"
                className={classes.search}
              >
                <InputBase
                  style={{ color: "white" }}
                  placeholder="Search for GIF"
                />
                <Search />
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
