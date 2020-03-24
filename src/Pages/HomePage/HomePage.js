import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  makeStyles,
  Box,
  Grid,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { getTrendingList } from "../../Store/Thunk/getTrendingList";

const useStyles = makeStyles({
  root: {
    backgroundColor: "red"
  },
  gridTile: {
    height: "300px"
  },
  tileBar: {
    position: "absolute",
    width: "100%",
    height: "25%",
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
      "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  tileBarText: {
    fontFamily: '"Anton", sans-serif',
    color: "#b3b3b3",
    textTransform: "capitalize"
  }
});
const HomePage = () => {
  const classes = useStyles();
  const reduxStore = useSelector(state => ({
    gifList: state.gifList.gifList,
    gifListName: state.gifList.gifListName,
    loading: state.gifList.isLoading,
    searchTerm: state.searchTerm.searchTerm
  }));
  const dispatch = useDispatch();
  const [loadingImageList, setLoadingImageList] = useState([]);
  useEffect(() => {
    trendingList();
  }, []);

  const trendingList = () => {
    dispatch(getTrendingList());
  };

  const loadedImage = id => {
    setLoadingImageList(loadingImageList.concat(id));
  };

  const ErrorMessage = ({ text }) => {
    return (
      <Box
        height="90vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        style={{ color: "white" }}
      >
        <Typography variant="h4">{text}</Typography>
      </Box>
    );
  };

  if (reduxStore.loading)
    return (
      <Box
        height="90vh"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress size={80} />
      </Box>
    );

  if (reduxStore.gifList === "Error") {
    return <ErrorMessage text="Error occured..." />;
  }

  if (reduxStore.gifList === "No data") {
    return <ErrorMessage text="No data found" />;
  }

  return (
    <Box width="90%" m="50px auto">
      <Typography
        variant="h3"
        style={{
          fontFamily: '"Righteous", cursive',
          color: "white",
          marginBottom: "10px",
          textTransform: "capitalize"
        }}
      >
        {reduxStore.gifListName}
      </Typography>
      <Grid container spacing={1} wrap="wrap">
        {reduxStore.gifList.map((item, index) => {
          return (
            <Grid
              key={item.id}
              item
              xs={12}
              sm={6}
              md={index % 3 === 0 ? 6 : 3}
              lg={index % 3 === 0 ? 4 : 2}
              className={classes.gridTile}
            >
              <Box
                height="100%"
                width="100%"
                style={
                  loadingImageList.includes(item.id)
                    ? { position: "relative" }
                    : { display: "none" }
                }
              >
                <img
                  height="100%"
                  width="100%"
                  onLoad={() => loadedImage(item.id)}
                  src={item.images.fixed_height_downsampled.url}
                  style={{ objectFit: "cover", position: "absolute" }}
                  alt={item.title}
                />
                <Box className={classes.tileBar}>
                  <Typography
                    className={classes.tileBarText}
                    align="center"
                    variant="h6"
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>

              {loadingImageList.includes(item.id) ? null : (
                <Box
                  height="100%"
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{ backgroundColor: "#212121" }}
                >
                  <CircularProgress />
                </Box>
              )}
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default HomePage;