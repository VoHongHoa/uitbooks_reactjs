import axios from "../axios";
const handleSignUp = (data) => {
  return axios.post("/dang-ky", data);
};
const handleLogin = (data) => {
  return axios.post("/dang-nhap", data);
};
const getUserInfor = () => {
  return axios.get("/xem-tai-khoan");
};

const editUserInfor = (data) => {
  return axios.post(`user/sua-thong-tin/`, data);
};

const getAllUser = (currentPage) => {
  return axios.get(`/admin/xem-tat-ca-user/${currentPage}`);
};

const getAllUserByLibrarian = (currentPage) => {
  return axios.get(`/seller/xem-tat-ca-user/${currentPage}`);
};
const deleteUser = (userId) => {
  return axios.delete(`/admin/xoa-user/${userId}`);
};
const deleteUserByLibrarian = (userId) => {
  return axios.delete(`/librarian/xoa-user/${userId}`);
};
const changePassword = (data) => {
  return axios.post(`user/sua-mat-khau`, data);
};
const changeAvatar = (data) => {
  //console.log(image);
  return axios.post("/user/cap-nhat-anh", data);
};
const forgotPassword = (data) => {
  console.log(data);
  return axios.post("/quen-mat-khau", data);
};
const buyBooks = (data) => {
  return axios.post("/user/mua-sach", data);
};
const updateUserRoleByAdmin = (data, userId) => {
  return axios.post(`admin/${userId}`, data);
};
const confirmChangeNewPassword = (token, data) => {
  return axios.post(`/cai-dat-mat-khau-moi/${token}`, data);
};
const findUserByEmail = (email) => {
  return axios.get(`/tim-user/${email}`);
};
const buyBooksByGuest = (data) => {
  return axios.post("/mua-sach", data);
};
const searchUser = (data) => {
  return axios.post("/admin/tim-user", data);
};
const searchUserBySeller = (data) => {
  return axios.post("/seller/tim/user", data);
};
export {
  handleSignUp,
  handleLogin,
  getUserInfor,
  editUserInfor,
  getAllUser,
  deleteUser,
  changePassword,
  changeAvatar,
  forgotPassword,
  getAllUserByLibrarian,
  deleteUserByLibrarian,
  buyBooks,
  updateUserRoleByAdmin,
  confirmChangeNewPassword,
  findUserByEmail,
  buyBooksByGuest,
  searchUser,
  searchUserBySeller,
};
