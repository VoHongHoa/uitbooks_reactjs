const initState = {
  loginInfor: {},
  isLogin: false,
  userInfor: {},
  pageUserCurrent: 0,
};
const userReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      state.userInfor = action.userInfor;
      state.isLogin = true;
      return { ...state };
    case "LOGIN_FAILED":
      state.userData = action.userInfor;
      state.isLogin = false;
      return { ...state };
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      state.userInfor = action.userInfor;
      state.isLogin = false;
      return { ...state };
    case "EDIT_USER_SUCCESS":
      state.userInfor = action.userData;
      return { ...state };
    case "EDIT_USER_FAILED":
      return initState;
    case "EDIT_USER_AVATAR_SUCCESS":
      state.userInfor = action.userData;
      return { ...state };
    case "EDIT_USER_AVATAR_FAILED":
      return initState;
    default:
      return state;
  }
};
export default userReducer;
