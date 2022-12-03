import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import "./Footer.scss";
class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <div className="footer-dark">
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-3 item">
                <h3>Liên hệ</h3>
                <ul>
                  <li>
                    <a href="#">uitbook</a>
                  </li>
                  <li>
                    <a href="#">Đại học Công nghệ thông tin</a>
                  </li>
                </ul>
              </div>
              <div className="col-sm-6 col-md-3 item">
                <h3>Về chúng tôi</h3>
                <ul>
                  <li>
                    <a href="#">Cửa hàng</a>
                  </li>
                  <li>
                    <a href="#">Đội ngũ</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-6 item text">
                <h3>uitbook</h3>
                <p>Cửa hàng sách trực tuyến</p>
              </div>
              <div className="col item social">
                <a href="#">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fab fa-snapchat"></i>
                </a>
                <a href="#">
                  <i className="fab fa-instagram"></i>
                </a>
              </div>
            </div>
            <p className="copyright">UITBOOKS © 2022</p>
          </div>
        </footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer);
