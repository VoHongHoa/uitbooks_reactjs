import React, { Component } from "react";
import "./Blog.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router";
import { toast } from "react-toastify";
import { getAllBlog } from "../../services/BlogService";
import ModalDetailBlog from "./ModalDetailBlog";

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBlog: [],
      isOpenModal: false,
      currentBlog: {},
    };
  }
  componentDidMount() {
    this.fetchGetAllBlog();
  }
  fetchGetAllBlog = async () => {
    try {
      let res = await getAllBlog();
      //console.log(res);
      if (res) {
        this.setState({
          allBlog: res,
        });
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  toggle = () => {
    this.setState({
      isOpenModal: false,
    });
  };
  handleOpenModal = (item) => {
    this.setState({
      isOpenModal: true,
      currentBlog: item,
    });
  };
  render() {
    let { allBlog } = this.state;
    return <div>Content HTML</div>;
  }
}
export default withRouter(Blog);
