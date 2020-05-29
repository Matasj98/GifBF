export const setSnackBarOpen = (open = false) => ({
    type: "SET_SNACKBAR_OPEN",
    open,
});

export const setSnackBarLink = (gifLink = "") => ({
    type: "SET_SNACKBAR_LINK",
    gifLink,
});
