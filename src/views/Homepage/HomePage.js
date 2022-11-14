import React, { Component } from "react";
import "./HomePage.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Slider from "./Slider";
import SectionBook from "./SectionBook";
import Footer from "./Footer";
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
