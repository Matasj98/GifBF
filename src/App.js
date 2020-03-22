import React, { useState } from "react";
import HomePage from "./Pages/HomePage/HomePage";
import NavBar from "./Components/NavBar/NavBar";
import {
  Grid,
  makeStyles,
  Slide,
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
    backgroundColor: "#121212",
    width: "200px"
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
          <Grid
            style={matchesSize || isOpen ? null : { display: "none" }}
            className={classes.categoryList}
            item
            container
            alignItems={null}
          >
            <CategoryList />
          </Grid>
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
