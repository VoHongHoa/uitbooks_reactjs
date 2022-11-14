import axios from "../axios";
const getAllCategoriesBooks = (page) => {
  return axios.get(`/admin/xem-tat-ca-loai-sach/${page}`);
};
const getAllCategoriesBooksByLibrarian = (page) => {
  return axios.get(`/seller/xem-tat-ca-loai-sach/${page}`);
};
const addNewCategoriesBooks = (data) => {
  return axios.post("/admin/luu-loai-sach", data);
};
const deleteCategories = (idCategory) => {
  return axios.delete(`/admin/xoa-loai-sach/${idCategory}`);
};
const getDataCategories = () => {
  return axios.get("/category");
};
const editCategoy = (data) => {
  return axios.post("/admin/sua-loai-sach", data);
};
export {
  getAllCategoriesBooks,
  addNewCategoriesBooks,
  deleteCategories,
  getDataCategories,
  getAllCategoriesBooksByLibrarian,
  editCategoy,
};
