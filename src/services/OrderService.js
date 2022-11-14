import axios from "../axios";
const getAllOrder = (page) => {
  return axios.get(`/admin/xem-tat-ca-Orderss/${page}`);
};
const getAllOrderBySeller = (page) => {
  return axios.get(`/seller/xem-tat-ca-Orderss/${page}`);
};
const deleteOrder = (OrderssId) => {
  return axios.delete(`/admin/xoa-Orderss/${OrderssId}`);
};
const deleteOrderBySeller = (OrderssId) => {
  return axios.delete(`/seller/xoa-Orderss/${OrderssId}`);
};

const getDetailOrderById = (orderssId) => {
  return axios.post(`/user/tim-Orderssde/${orderssId}`);
};
const userGetDetailOrderById = (orderssId) => {
  return axios.post(`/user/tim-Orderssde/${orderssId}`);
};
const getDetailOrderBySeller = (orderssId) => {
  return axios.post(`/user/tim-Orderssde/${orderssId}`);
};
const updateStatusOrder = (data) => {
  return axios.post("/admin/sua-orderss", data);
};
const updateStatusOrderBySeller = (data) => {
  return axios.post("/seller/sua-orderss", data);
};
const searchorderByAdmin = (data) => {
  return axios.post(`/admin/timorderss`, data);
};
const searchorderBySeller = (data) => {
  return axios.post(`/seller/timorderss`, data);
};
const getOrder = (data) => {
  return axios.post(`/user/timorderss`, data);
};

export {
  getAllOrder,
  getAllOrderBySeller,
  deleteOrder,
  deleteOrderBySeller,
  getDetailOrderById,
  userGetDetailOrderById,
  updateStatusOrder,
  getDetailOrderBySeller,
  updateStatusOrderBySeller,
  searchorderByAdmin,
  searchorderBySeller,
  getOrder,
};
