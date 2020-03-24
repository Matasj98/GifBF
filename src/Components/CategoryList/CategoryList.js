import React, { useState, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  CircularProgress,
  Avatar,
  Box,
  Typography,
  withStyles
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setSearchTerm } from "../../Store/Actions/setSearchTerm";
import { getGifListCustom } from "../../Store/Thunk/getGifListCustom";

const ListItemStyled = withStyles({
  root: {
    fontFamily: '"Righteous", cursive',
    textTransform: "capitalize",
    color: "white",
    "&.Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.5)"
    },
    "&.Mui-selected:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.6)"
    },
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.3)"
    }
  }
})(ListItem);

const CategoryList = () => {
  const [data, setData] = useState({
    list: null,
    loading: true,
    selectedId: null,
    imageLoadArray: []
  });
  const dispatch = useDispatch();

  useEffect(() => {
    categoryList();
  }, []);

  const categoryList = () => {
    axios
      .get("https://api.giphy.com/v1/gifs/categories", {
        params: {
          api_key: "WYuuWO9uW1KJpPALeDKJM0NdJkjnccax"
        }
      })
      .then(res => {
        setData({ ...data, list: res.data.data, loading: false });
      })
      .catch(err => {
        setData({ ...data, list: null, loading: false });
        console.log(err);
      });
  };

  const select = (id, name) => {
    setData({ ...data, selectedId: id });
    dispatch(setSearchTerm(name));
    dispatch(getGifListCustom());
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
        <CircularProgress size={60} />
      </Box>
    );

  if (data.list === null)
    return <Typography variant="body1">Error occured...</Typography>;

  return (
    <List>
      {/* jei reiks name kateforijos tai name_encoded gali but skiriasi biski pasiziurek console loge */}
      {data.list.map((item, index) => {
        return (
          <ListItemStyled
            onClick={() => select(index, item.name)}
            key={index}
            selected={data.selectedId === index ? true : false}
            button
          >
            <ListItemIcon>
              <Box>
                <Avatar
                  style={
                    data.imageLoadArray.includes(index)
                      ? null
                      : { display: "none" }
                  }
                  onLoad={() =>
                    setData({
                      ...data,
                      imageLoadArray: data.imageLoadArray.concat(index)
                    })
                  }
                  src={item.gif.images.fixed_height_small.url}
                />

                {data.imageLoadArray.includes(index) ? null : (
                  <CircularProgress />
                )}
              </Box>
            </ListItemIcon>
            <ListItemText>
              <Typography>{item.name}</Typography>
            </ListItemText>
          </ListItemStyled>
        );
      })}
    </List>
  );
};

export default CategoryList;
