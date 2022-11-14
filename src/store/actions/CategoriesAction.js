import { getDataCategories } from "../../services/CategoriesBooksService";
import { toast } from "react-toastify";
//------------------cart action------------------------------
export const getAllCategoriesBooksRedux = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getDataCategories();
      //console.log(res);
      if (res) {
        dispatch(getAllCategoriesBooksSuccess(res.categoryList));
      } else {
        dispatch(getAllCategoriesBooksFailed());
      }
    } catch (e) {
      toast.error("Lỗi server!!!");
      console.error(e);
      dispatch(getAllCategoriesBooksFailed());
    }
  };
};
export const getAllCategoriesBooksFailed = () => ({
  type: "GET_ALL_CATEGORIES_BOOKS_FAILED",
  data: [],
});
export const getAllCategoriesBooksSuccess = (data) => ({
  type: "GET_ALL_CATEGORIES_BOOKS_SUCCESS",
  data: data,
});
