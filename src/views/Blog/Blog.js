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
    return (
      <div className="container">
        <div className="section-header">
          <HomeHeader></HomeHeader>
        </div>
        <section id="sidebar">
          <p>
            <NavLink to="/" style={{ color: "black", cursor: "pointer" }}>
              Trang chủ
            </NavLink>{" "}
            | <b>Blog</b>
          </p>
          <h1 className="tittle-blog">Cập nhật tin tức</h1>
          <h5 className="h5">Tin tức:</h5>
          {allBlog &&
            allBlog.length > 0 &&
            allBlog.map((item, index) => {
              return (
                <div className="mt-2" key={index}>
                  <div
                    className="blog-card container"
                    onClick={() => this.handleOpenModal(item)}
                    style={{ cursor: "pointer" }}
                  >
                    <p className="card-tittle">{item.title}</p>
                    <div className="row">
                      <p className="card-user col-md-6">
                        Người đăng:{" "}
                        {item.user && item.user.fullName
                          ? item.user.fullName
                          : "Người dấu tên"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
        </section>
        <div className="mt-2">
          <Footer />
        </div>
        <ModalDetailBlog
          isOpenModal={this.state.isOpenModal}
          toggle={this.toggle}
          currentBlog={this.state.currentBlog}
        />
      </div>
    );
  }
}
export default withRouter(Blog);
