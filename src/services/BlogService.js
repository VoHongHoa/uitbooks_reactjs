import axios from "../axios";
const addNewBlog = (data) => {
  return axios.post("/admin/them-blog", data);
};
const getAllBlog = () => {
  return axios.get("/xem-tat-ca-blog");
};
const updateBlog = (data) => {
  return axios.post("/admin/sua-blog", data);
};
const deleteBlog = (blogId) => {
  return axios.delete(`/admin/xoa-blog/${blogId}`);
};

export { addNewBlog, getAllBlog, updateBlog, deleteBlog };
