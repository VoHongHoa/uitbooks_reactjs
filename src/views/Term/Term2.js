import React, { Component } from "react";
import "./Term.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink, withRouter } from "react-router-dom";

class Term2 extends Component {
  handleReturnHome = () => {
    this.props.history.push("/");
  };
  render() {
    return <div>Content HTML</div>;
  }
}

export default withRouter(Term2);
