import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";
import "./AdminHeader.css";
class AdminHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReponsesive: false,
    };
  }
  componentDidMount() {}
  myFuntion = () => {
    this.setState({
      isReponsesive: !this.state.isReponsesive,
    });
  };
  render() {
    let { isReponsesive } = this.state;
    // console.log;
    return <div>admin header</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminHeader)
);
