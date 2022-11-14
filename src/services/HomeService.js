import axios from "../axios";
const fetchDataChart = () => {
  return axios.get("admin/chart");
};
const getBookHomePage = (page) => {
  return axios.get(`/trang-chu/${page}`);
};
export { fetchDataChart, getBookHomePage };
