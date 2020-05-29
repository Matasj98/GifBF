import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Snackbar } from "@material-ui/core";
import { setSnackBarOpen } from "../../Store/Actions/setSnackBar";
import MuiAlert from "@material-ui/lab/Alert";

const SnackBarAlert = () => {
    const snackBarData = useSelector((state) => ({
        open: state.snackBar.open,
        gifLink: state.snackBar.gifLink,
    }));
    const dispatch = useDispatch();

    useEffect(() => {
        copyCodeToClipboard();
        // eslint-disable-next-line
    }, [snackBarData]);

    const copyCodeToClipboard = () => {
        navigator.clipboard.writeText(snackBarData.gifLink);
    };

    const handleClose = () => dispatch(setSnackBarOpen());
    return (
        <Snackbar open={snackBarData.open} autoHideDuration={3000} onClose={handleClose}>
            <MuiAlert elevation={6} variant='filled' onClose={handleClose} severity='success'>
                Copied to clipboard!
            </MuiAlert>
        </Snackbar>
    );
};

export default SnackBarAlert;
