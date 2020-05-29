const initialState = {
    open: false,
    gifLink: "",
};

export const snackBar = (state = initialState, action) => {
    switch (action.type) {
        case "SET_SNACKBAR_OPEN":
            return { ...state, open: action.open };
        case "SET_SNACKBAR_LINK":
            return { ...state, gifLink: action.gifLink };
        default:
            return state;
    }
};
