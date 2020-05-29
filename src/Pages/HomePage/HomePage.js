import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Box, Grid, Switch, CircularProgress, Typography, useMediaQuery, useTheme, Button } from "@material-ui/core";
import { getTrendingList } from "../../Store/Thunk/getTrendingList";
import { setHdQuality } from "../../Store/Actions/setGifList";
import { updateFakeApiSearchTerm } from "../../Store/Thunk/updateFakeApiSearchTerm";
import { setSnackBarOpen } from "../../Store/Actions/setSnackBar";
import { setSnackBarLink } from "../../Store/Actions/setSnackBar";
import SearchBar from "../../Components/SearchBar/SearchBar";
import SnackBar from "../../Components/SnackBar/SnackBar";
import moment from "moment";

const useStyles = makeStyles({
    root: {
        backgroundColor: "red",
    },
    gridTile: {
        height: "300px",
    },
    tileBar: {
        position: "absolute",
        width: "100%",
        height: "25%",
        background: "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
    },
    tileBarText: {
        fontFamily: '"Anton", sans-serif',
        color: "#b3b3b3",
        textTransform: "capitalize",
    },
});
const HomePage = () => {
    const classes = useStyles();
    const reduxStore = useSelector((state) => ({
        gifList: state.gifList.gifList,
        gifListName: state.gifList.gifListName,
        loading: state.gifList.isLoading,
        hdQuality: state.gifList.hdQuality,
        fakeApiSearchTerm: {
            term: state.fakeApiSearchTerm.term,
            date: state.fakeApiSearchTerm.searchedDate,
        },
    }));
    const dispatch = useDispatch();
    const [loadingImageList, setLoadingImageList] = useState([]);
    const matchesWidth = useMediaQuery(useTheme().breakpoints.up("sm"));

    useEffect(() => {
        dispatch(getTrendingList());
    }, [dispatch]);

    const loadedImage = (id) => {
        setLoadingImageList(loadingImageList.concat(id));
    };

    const ErrorMessage = ({ text }) => {
        return (
            <Box height='90vh' width='100%' display='flex' justifyContent='center' alignItems='center' style={{ color: "white" }}>
                <Typography variant='h4'>{text}</Typography>
            </Box>
        );
    };

    const changeQuality = () => {
        setLoadingImageList([]);
        dispatch(setHdQuality(!reduxStore.hdQuality));
    };

    const setSnackBarData = (gifLink) => {
        dispatch(setSnackBarOpen(true));
        dispatch(setSnackBarLink(gifLink));
    };

    if (reduxStore.loading)
        return (
            <Box height='90vh' width='100%' display='flex' justifyContent='center' alignItems='center'>
                <CircularProgress size={80} />
            </Box>
        );

    if (reduxStore.gifList === "Error") {
        return <ErrorMessage text='Error occured...' />;
    }

    if (reduxStore.gifList === "No data") {
        return <ErrorMessage text='No data found' />;
    }

    return (
        <Box width='90%' m='50px auto' style={{ color: "white" }}>
            <SearchBar />
            <Box display={matchesWidth ? "flex" : null} justifyContent='space-between' alignItems='center' width='100%'>
                <Typography
                    variant='h4'
                    style={{
                        fontFamily: '"Righteous", cursive',
                        color: "white",
                        marginBottom: "10px",
                        textTransform: "capitalize",
                    }}>
                    {reduxStore.gifListName}
                </Typography>
                <Box>
                    <Grid container alignItems='center' spacing={0} wrap='wrap'>
                        <Grid item>Standart</Grid>
                        <Grid item>
                            <Switch checked={reduxStore.hdQuality} onChange={changeQuality} />
                        </Grid>
                        <Grid item>HD</Grid>
                    </Grid>
                </Box>
            </Box>

            <Grid container spacing={1} wrap='wrap'>
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
                            onClick={() => {
                                setSnackBarData(item.url);
                            }}>
                            <Box
                                // style={{  }}
                                height='100%'
                                width='100%'
                                style={
                                    loadingImageList.includes(item.id)
                                        ? { position: "relative", cursor: "pointer" }
                                        : { display: "none" }
                                }>
                                <img
                                    height='100%'
                                    width='100%'
                                    onLoad={() => loadedImage(item.id)}
                                    src={
                                        reduxStore.hdQuality ? item.images.original.url : item.images.fixed_height_downsampled.url
                                    }
                                    style={{ objectFit: "cover", position: "absolute" }}
                                    alt={item.title}
                                />
                                <Box className={classes.tileBar}>
                                    <Typography className={classes.tileBarText} align='center' variant='h6'>
                                        {item.title}
                                    </Typography>
                                </Box>
                            </Box>

                            {loadingImageList.includes(item.id) ? null : (
                                <Box
                                    height='100%'
                                    width='100%'
                                    display='flex'
                                    justifyContent='center'
                                    alignItems='center'
                                    style={{ backgroundColor: "#212121" }}>
                                    <CircularProgress />
                                </Box>
                            )}
                        </Grid>
                    );
                })}
            </Grid>
            <Box mt='50px'>
                {reduxStore.fakeApiSearchTerm.term.length === 0 ? null : (
                    <Box>
                        <Typography variant='body2'>Details:</Typography>
                        <Typography variant='body2'>Searched word: {reduxStore.fakeApiSearchTerm.term}</Typography>
                        <Typography variant='body2'>
                            Date: {moment(reduxStore.fakeApiSearchTerm.date).format("YYYY/MM/DD/HH:mm:ss")}
                        </Typography>
                        <Button onClick={() => dispatch(updateFakeApiSearchTerm())} style={{ color: "white" }}>
                            Update
                        </Button>
                    </Box>
                )}
            </Box>
            <SnackBar />
        </Box>
    );
};

export default HomePage;
