import React, { Component } from "react";
import "./Search.scss";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import Footer from "../Homepage/Footer";
import HomeHeader from "../Homepage/HomeHeader";
import { formatPrice } from "../../constants/format";
class SectionProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      windowWidth: window.innerWidth,
    };
  }

  componentDidMount() {}
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  handleDetailBook = (item) => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  checkScreen = () => {
    // this.setState({
    //   windowWidth: window.innerWidth,
    // });
    if (this.state.windowWidth > 768) {
      return true;
    } else {
      return false;
    }
  };
  render() {
    let { searchBooks } = this.props;
    return (
      <div className="search container">
        <div className="section-header">
          <HomeHeader></HomeHeader>
        </div>
        <h2 className="mt-3 mb-3" style={{ textAlign: "center" }}>
          Kết quả tìm kiếm
        </h2>
        <div className="container d-flex justify-content-center mt-3 mb-3">
          <div className="row">
            {searchBooks &&
              searchBooks.length > 0 &&
              searchBooks.map((item, index) => {
                return (
                  <div
                    className={
                      searchBooks.length >= 4
                        ? "col-sm-3 mt-2"
                        : "col-sm-auto mt-2"
                    }
                    key={index}
                  >
                    <div className="fade-in">
                      <div
                        className="card"
                        style={
                          this.checkScreen()
                            ? { height: "500px" }
                            : { height: "550px" }
                        }
                      >
                        <div onClick={() => this.handleDetailBook(item)}>
                          <div className="card-body">
                            <div className="card-img-actions">
                              <img
                                src={item.image}
                                className="card-img img-fluid"
                                width="96"
                                height="350"
                                alt="item.nameBook"
                              />
                            </div>
                          </div>
                          <div className="card-body bg-light text-center">
                            <div className="mb-2">
                              <a
                                href="#"
                                className="text-muted name"
                                data-abc="true"
                              >
                                {item.nameBook}
                              </a>
                            </div>
                            <div className="show">
                              {item.rating === 1 && (
                                <div>
                                  <i className="fa fa-star star"></i>
                                </div>
                              )}
                              {item.rating === 2 && (
                                <div>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                </div>
                              )}
                              {item.rating === 3 && (
                                <div>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                </div>
                              )}
                              {item.rating === 4 && (
                                <div>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                </div>
                              )}
                              {item.rating === 5 && (
                                <div>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                  <i className="fa fa-star star"></i>
                                </div>
                              )}
                              <div className="text-muted mb-3">
                                {item.cmt} đánh giá
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="fade-in">
                          <h3
                            className={
                              this.checkScreen()
                                ? "hide price mb-0 font-weight-semibold"
                                : "price mb-0 font-weight-semibold"
                            }
                          >
                            {formatPrice(item.price)}
                          </h3>
                          <button
                            type="button"
                            className={
                              this.checkScreen()
                                ? "hide btn-add btn bg-cart"
                                : "btn-add btn bg-cart"
                            }
                            onClick={() => this.handleAddToCart(item)}
                          >
                            <i className="fa fa-cart-plus mr-2"></i> Thêm vào
                            giỏ hàng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <Footer></Footer>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    searchBooks: state.books.searchBook,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SectionProduct)
);
