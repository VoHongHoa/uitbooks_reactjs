import axios from "../axios";
const addNewBook = (data) => {
  return axios.post("/admin/luu-sach", data);
};
const getAllBooksPaging = (page) => {
  return axios.get(`/admin/xem-tat-ca-sach/${page}`);
};
const getAllBooksPagingBySeller = (page) => {
  return axios.get(`/seller/xem-tat-ca-sach/${page}`);
};
const deleteBook = (bookId) => {
  return axios.delete(`/admin/xoa-sach/${bookId}`);
};
const getBooksLibrary = () => {
  return axios.get(`/thu-vien`);
};
const borrowBooks = (data) => {
  return axios.get("/user/muon-sach", data);
};
const editBook = (data, bookId) => {
  return axios.post(`/admin/sua-sach/${bookId}`, data);
};
const findBooksByBookId = (bookId) => {
  return axios.get(`/xem-chi-tiet-sach/${bookId}`);
};
const getCateBook = (CategoryId, page) => {
  return axios.get(`/search/${CategoryId}/${page}`);
};
const getSearchBook = (data) => {
  return axios.post("/tim-sach/", data);
};
const ratingBook = (data) => {
  return axios.post(`/danh-gia-sach/${data.bookId}/${data.star}`);
};
const keywordSearch = (data) => {
  return axios.post("/search/book", data);
};
const fetchDataFilter = (categoryId) => {
  return axios.get(`data-filter/${categoryId}`);
};
const getBookFilter = (data, page) => {
  return axios.post(`/search/${page}`, data);
};
export {
  addNewBook,
  getAllBooksPaging,
  deleteBook,
  getBooksLibrary,
  borrowBooks,
  editBook,
  findBooksByBookId,
  getCateBook,
  getAllBooksPagingBySeller,
  getSearchBook,
  ratingBook,
  keywordSearch,
  fetchDataFilter,
  getBookFilter,
};
