import React from "react";
import { useDispatch } from "react-redux";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Hidden,
    IconButton,
    Slide,
    Button,
    makeStyles,
    useTheme,
    useMediaQuery,
    useScrollTrigger,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

import { getTrendingList } from "../../Store/Thunk/getTrendingList";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "white",
        backgroundColor: "#121212",
    },
    logo: {
        fontFamily: '"Righteous", cursive',
        letterSpacing: "2px",
        cursor: "pointer",
        marginRight: "30px",
    },
}));

const NavBar = ({ openCloseMenu }) => {
    const classes = useStyles();
    const matchesSize = useMediaQuery(useTheme().breakpoints.up("md"));
    const trigger = useScrollTrigger();
    const dispatch = useDispatch();

    const searchTrending = () => {
        dispatch(getTrendingList());
    };

    return (
        <div>
            <Slide appear={false} direction='down' in={!trigger}>
                <AppBar className={classes.root}>
                    <Box width={matchesSize ? "80%" : "100%"} m='auto'>
                        <Toolbar>
                            <Hidden mdUp>
                                <Box mr='10px'>
                                    <IconButton size='small' onClick={openCloseMenu}>
                                        <Menu fontSize='large' style={{ color: "white" }} />
                                    </IconButton>
                                </Box>
                            </Hidden>
                            <Typography onClick={searchTrending} className={classes.logo} variant='h3'>
                                GifBF
                            </Typography>
                            <Box ml='auto' display='flex' alignItems='center' justifyContent='flex-end' flexWrap='wrap'>
                                <Box>
                                    <Button onClick={searchTrending} style={{ color: "inherit" }}>
                                        <Typography align='center' variant='h6' style={{ margin: "0 40px" }}>
                                            Trending GIFs
                                        </Typography>
                                    </Button>
                                </Box>
                            </Box>
                        </Toolbar>
                    </Box>
                </AppBar>
            </Slide>
            <Toolbar />
        </div>
    );
};

export default NavBar;
