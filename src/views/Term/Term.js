import React, { Component } from "react";
import "./Term.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";

class Term extends Component {
  handleReturnHome = () => {
    this.props.history.push("/");
  };

  render() {
    return <div>Content HTML</div>;
  }
}

export default withRouter(Term);
