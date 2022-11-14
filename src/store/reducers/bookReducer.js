const initState = {
  allCategoriesBooks: [],
  searchBook: [],
};
const bookReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_CATEGORIES_BOOKS_SUCCESS":
      state.allCategoriesBooks = action.data;
      //console.log(state);
      return { ...state };
    case "SEARCH_BOOK_SUCCESS":
      state.searchBook = action.book;
      return { ...state };
    case "SEARCH_BOOK_FAILED":
      state.searchBook = [];
      return { ...state };
    default:
      return state;
  }
};
export default bookReducer;
