const initialState = {
    term: "",
    searchedDate: "",
};

export const fakeApiSearchTerm = (state = initialState, action) => {
    switch (action.type) {
        case "setFakeApiSearchTerm":
            return {
                ...state,
                term: action.term,
                searchedDate: action.date,
            };
        default:
            return state;
    }
};
