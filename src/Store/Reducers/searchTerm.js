const initialState = {
  searchTerm: ''
};

export const searchTerm = (state = initialState, action) => {
  switch (action.type) {
    case "setSearchTerm":
      return {
        ...state,
        searchTerm: action.searchTerm
      };
    default:
      return state;
  }
};
