import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Box,
  Grid,
  CircularProgress,
  Typography
} from "@material-ui/core";
import axios from "axios";

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
    // bottom: "0"
  },
  tileBarText: {
    fontFamily: '"Anton", sans-serif',
    color: "#b3b3b3",
    textTransform: "capitalize"
  }
});
const HomePage = () => {
  const classes = useStyles();
  const [data, setData] = useState({
    trendingList: [],
    loading: true,
    loadingImageList: []
  });

  useEffect(() => {
    trendingList();
  }, []);

  const trendingList = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/trending", {
        params: {
          api_key: "WYuuWO9uW1KJpPALeDKJM0NdJkjnccax"
        }
      })
      .then(res => {
        setData({ ...data, loading: false, trendingList: res.data.data });
        console.log(res.data.data);
      })
      .catch(err => {
        setData({ ...data, loading: false });
        console.log(err);
      });
  };

  const loadedImage = id => {
    setData({ ...data, loadingImageList: data.loadingImageList.concat(id) });
  };

  if (data.loading)
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

  return (
    <Box width="90%" m="50px auto">
      <Typography
        variant="h3"
        style={{
          fontFamily: '"Righteous", cursive',
          color: "white",
          marginBottom: "10px"
        }}
      >
        Trending GIFs
      </Typography>
      <Grid container spacing={1} wrap="wrap">
        {data.trendingList.map((item, index) => {
          return (
            <Grid
              key={item.id}
              item
              xs={12}
              md={index % 3 === 0 ? 6 : 3}
              lg={index % 3 === 0 ? 4 : 2}
              className={classes.gridTile}
            >
              <Box
                height="100%"
                width="100%"
                style={
                  data.loadingImageList.includes(item.id)
                    ? { position: "relative" }
                    : { display: "none" }
                }
              >
                <img
                  height="100%"
                  width="100%"
                  onLoad={() => loadedImage(item.id)}
                  src={item.images.downsized_large.url}
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

              {data.loadingImageList.includes(item.id) ? null : (
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
