const initialState = {
  gifList: [],
  gifListName: null,
  isLoading: true
};

export const gifList = (state = initialState, action) => {
  switch (action.type) {
    case "setGifList":
      return { ...state, gifList: action.gifList };
    case "setGifListLoading":
      return { ...state, isLoading: action.isLoading };
    case "setGifListName":
      return { ...state, gifListName: action.gifListName };
    default:
      return state;
  }
};
