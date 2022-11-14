import axios from "../axios";
const addComment = (data, bookId) => {
  return axios.post(`/user/luu-comment/${bookId}`, data);
};
const deleteComment = (data) => {
  return axios.post(`/user/xoa-comment`, data);
};
const editComment = (commentId, data) => {
  return axios.post(`/user/sua-comment/${commentId}`, data);
};
const getComment = (bookId) => {
  return axios.get(`/book/comment/${bookId}`);
};
const updateReviewByUser = (commentId) => {
  return axios.post(`/user/sua-comment/${commentId}`);
};

export {
  addComment,
  deleteComment,
  editComment,
  getComment,
  updateReviewByUser,
};
