import React, { Component } from "react";
import "./Contact.scss";
import HomeHeader from "../Homepage/HomeHeader";
import Footer from "../Homepage/Footer";
import { NavLink } from "react-router-dom";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { AiFillShopping } from "react-icons/ai";
import { AiTwotoneHome } from "react-icons/ai";
import { MdEmail } from "react-icons/md";
import { AiFillPhone } from "react-icons/ai";

class Contact extends Component {
  render() {
    return (
      <div className="container">
        <div className="section-header">
          <HomeHeader></HomeHeader>
        </div>
        <section id="sidebar">
          <p>
            <NavLink to="/" style={{ color: "black" }}>
              Trang chủ
            </NavLink>{" "}
            | <b>Liên hệ</b>
          </p>
        </section>
        <div className="container-contact">
          <h1 className="title-contact">THÔNG TIN LIÊN HỆ UITBOOK</h1>
          <div className="content-contact">
            <h3 className="title-2">Ghé thăm UITbook</h3>
            <div className="col">
              <div className="col-1">
                <a href="https://twitter.com/">
                  <AiFillTwitterCircle color="1DA1F2" fontSize="5em" />
                </a>
              </div>
              <div className="col-2">
                <a href="https://www.facebook.com/">
                  <FaFacebook color="2f55a4" fontSize="4.3em" />
                </a>
              </div>
              <div className="col-3">
                <a href="https://www.youtube.com/">
                  <BsYoutube
                    className="youtube"
                    color="FF0000"
                    fontSize="5em"
                  />
                </a>
              </div>
            </div>
            <div className="second">
              <h5>Thông tin chi tiết</h5>
              <div className="second-col">
                <div className="tit">
                  <FaFacebook />
                  <b> FACEBOOK : </b>
                  <span>https://www.facebook.com/UITPHONE</span>
                  <br />
                  <AiFillInstagram />
                  <b> INSTARGRAM : </b>
                  <span>https://www.instagram.com/uitphone_vietnam/</span>
                  <br />
                  <AiFillShopping />
                  <b> SHOPPE : </b>
                  <span>https://shopee.vn/uitphone_vietnam</span>
                  <br />
                </div>
                <div className="tit-2">
                  <AiTwotoneHome />
                  <span> UIT, Linh Trung, Thủ Đức, Hồ Chí Minh</span>
                  <br />
                  <MdEmail />
                  <b> EMAIL : </b>
                  <span>uitphone@gmail.com</span>
                  <br />
                  <AiFillPhone />
                  <b> Hotline : </b>
                  <span>01 234 567 88</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <Footer />
        </div>
      </div>
    );
  }
}

export default Contact;
