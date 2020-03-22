const initialState = {
  category: null,
  searchTerm: null
};

export const searchBy = (state = initialState, action) => {
  switch (action.type) {
    case "setSearchByTerm":
      return {
        ...state,
        searchTerm: action.searchTerm,
        category: null
      };
    case "setSearchByCategory":
      return {
        ...state,
        searchTerm: null,
        category: action.category
      };
    default:
      return state;
  }
};
