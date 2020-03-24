import React, { useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Components/NavBar/NavBar";
import {
  Grid,
  makeStyles,
  Slide,
  Box,
  // ClickAwayListener,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import CategoryList from "./Components/CategoryList/CategoryList";

const useStyles = makeStyles({
  item: {
    minHeight: "100vh"
  },
  categoryList: {
    width: "200px",
    overflowY: "scroll",
    overflow: "hidden",
    height: "100vh",
    "&::-webkit-scrollbar": {
      width: "0.4em",
      backgroundColor: '#4f4f4f'
    },
    "&::-webkit-scrollbar-track": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      outline: "1px solid slategrey",
      backgroundColor: '#381737'
    }
    // direction: 'rtl'
  }
});
function App() {
  const classes = useStyles();
  const matchesSize = useMediaQuery(useTheme().breakpoints.up("md"));
  const [isOpen, setIsOpen] = useState(false);

  const openCloseMenu = () => {
    setIsOpen(!isOpen);
  };

  // const clickAwayCheck = () => {
  //   if (matchesSize === false && !isOpen) setIsOpen(false);
  // };

  return (
    <div>
      <NavBar openCloseMenu={openCloseMenu} />
      <Grid className={classes.item} container>
        {/* <ClickAwayListener onClickAway={clickAwayCheck}> */}
        <Slide appear={false} direction="right" in={matchesSize || isOpen}>
          <Box
            style={{ backgroundColor: "#121212" }}
            display={matchesSize || isOpen ? null : "none"}
          >
            <Grid
              style={matchesSize || isOpen ? null : { display: "none" }}
              item
              container
              alignItems={null}
              className={classes.categoryList}
            >
              <CategoryList />
            </Grid>
          </Box>
        </Slide>
        {/* </ClickAwayListener> */}
        <Grid item xs>
          <HomePage />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
