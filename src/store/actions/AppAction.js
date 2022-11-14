import {
  handleLogin,
  getUserInfor,
  editUserInfor,
  changeAvatar,
} from "../../services/userService";
import { toast } from "react-toastify";
import { getSearchBook } from "../../services/BookService";
//------------------cart action------------------------------
export const addToCart = (item) => {
  //console.log("check user:", user);
  return async (dispatch, getState) => {
    item.quantity = 1;
    item.total = item.quantity * item.price;
    dispatch(addToCartSuccess(item));
  };
};
export const addToCartFailded = () => ({
  type: "ADD_TO_CART_FAILED",
  item: [],
});
export const addToCartSuccess = (item) => ({
  type: "ADD_TO_CART_SUCCESS",
  item: item,
});

export const changeInputItem = (allItems) => {
  return async (dispatch, getState) => {
    dispatch(changeInputItemSuccess(allItems));
  };
};
export const changeInputItemFailded = () => ({
  type: "CHANGE_INPUT_ITEM_FAILED",
  allItems: [],
});
export const changeInputItemSuccess = (allItems) => ({
  type: "CHANGE_INPUT_ITEM_SUCCESS",
  allItems: allItems,
});

export const deleteItem = (item) => {
  return async (dispatch, getState) => {
    dispatch(deleteItemSuccess(item));
  };
};
export const deleteItemFailded = () => ({
  type: "DELETE_ITEM_FAILED",
  itemDelete: [],
});
export const deleteItemSuccess = (item) => ({
  type: "DELETE_ITEM_SUCCESS",
  itemDelete: item,
});
export const deleteCart = () => ({
  type: "DELETE_CART",
});
//----------------------------------------------------------

//------------------user action------------------------------

export const handleLoginRedux = (data) => {
  return async (dispatch, getState) => {
    try {
      let respone = await handleLogin(data);
      // console.log(respone);
      if (respone) {
        localStorage.setItem("token", respone.accessToken);
        let userInfor = await getUserInfor();
        // console.log("check userinfor", userInfor);
        dispatch(loginSuccess(userInfor));
      } else {
        dispatch(loginFailed());
      }
    } catch (e) {
      toast.error("Tên Đăng nhập hoặc mật khẩu không chính xác!!");
      dispatch(loginFailed());
    }
  };
};

export const loginSuccess = (userInfor) => ({
  type: "LOGIN_SUCCESS",
  userInfor: userInfor,
});
export const loginFailed = () => ({
  type: "LOGIN_FAILED",
  userInfor: {},
});

export const logOutSuccess = () => ({
  type: "LOGOUT_SUCCESS",
  userInfor: {},
});

export const editUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let respone = await editUserInfor(data);
      console.log("check res", respone);
      if (respone) {
        toast.success("Thay đổi thông tin  thành công");
        dispatch(editUserSuccess(respone));
      } else {
        toast.error("Thay đổi không thành công!!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi server!!");
      dispatch(editUserFailed());
    }
  };
};
export const editUserSuccess = (data) => ({
  type: "EDIT_USER_SUCCESS",
  userData: data,
});
export const editUserFailed = () => ({
  type: "EDIT_USER_FAILED",
  userData: {},
});

export const editUserAvatar = (data) => {
  return async (dispatch, getState) => {
    try {
      let respone = await changeAvatar(data);
      console.log("check res", respone);
      if (respone) {
        toast.success("Thay đổi thông tin  thành công");
        dispatch(editUserSuccess(respone));
      } else {
        toast.error("Thay đổi không thành công!!");
        dispatch(editUserFailed());
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi server!!");
      dispatch(editUserFailed());
    }
  };
};
export const editUserAvatarSuccess = (data) => ({
  type: "EDIT_USER_AVATAR_SUCCESS",
  userData: data,
});
export const editUserAvatarFailed = () => ({
  type: "EDIT_USER_AVATAR_FAILED",
  userData: {},
});
export const searchBooks = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await getSearchBook(data);
      console.log("check res", res);
      if (res && res.length > 0) {
        toast.success(`Có ${res.length} kết quả tìm kiếm `);
        dispatch(searchBookSuccess(res));
      }
    } catch (e) {
      console.error(e);
      toast.error("Lỗi server!!");
      dispatch(searchBookFailed());
    }
  };
};

export const searchBookSuccess = (data) => ({
  type: "SEARCH_BOOK_SUCCESS",
  book: data,
});
export const searchBookFailed = () => ({
  type: "SEARCH_BOOK_FAILED",
  book: [],
});
