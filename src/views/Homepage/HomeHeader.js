import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { logOutSuccess, searchBooks } from "../../store/actions/AppAction";
import { getAllCategoriesBooksRedux } from "../../store/actions/CategoriesAction";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { keywordSearch } from "../../services/BookService";
class HomeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCategoriesBooks: [],
      infoBook: "",
      keysearch: "",
      allRecommendKeysearch: [],
      showRecommendKeySearch: false,
    };
  }
  componentDidMount() {
    this.props.getAllCategoriesBooksRedux();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.allCategoriesBooks !== this.props.allCategoriesBooks) {
      this.setState({
        allCategoriesBooks: this.props.allCategoriesBooks,
      });
    }
  }

  // handleOnChangeInput = (event) => {
  //   this.setState({
  //     infoBook: event.target.value,
  //   });
  // };
  handleOnchangeKeySearch = async (event) => {
    this.setState({
      keysearch: event.target.value,
      infoBook: event.target.value,
      showRecommendKeySearch: true,
    });
    if (event.target.value === "") {
      this.setState({
        showRecommendKeySearch: false,
      });
    }
    let data = {
      keyword: event.target.value,
    };
    try {
      let res = await keywordSearch(data);
      //console.log(res);
      if (res && res.length > 0) {
        this.setState({
          allRecommendKeysearch: res,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  getProductSearch = (infoBook) => {
    let data = {
      infoBook: infoBook,
    };
    this.setState({
      showRecommendKeySearch: false,
    });
    console.log(data);
    this.props.searchBooks(data);
    this.props.history.push("/tim-kiem");
    // console.log(this.props);
  };
  handleSearchByKeyword = async (item) => {
    this.setState({
      keysearch: item,
      infoBook: item,
    });
    this.getProductSearch(item);
    try {
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    let { allCategoriesBooks, allRecommendKeysearch } = this.state;
    //console.log(allCategoriesBooks);
    return (
      <div className="header-container">
        <nav className="navbar navbar-expand-xl navbar-light bg-light">
          {/* <a href="#" className="navbar-brand">
          
        </a> */}
          <Link to={"/"} className="navbar-brand" exact="true">
            <i className="fa fa-cube"></i>UIT<b>Book</b>
          </Link>

          <button
            type="button"
            className="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            id="navbarCollapse"
            className="collapse navbar-collapse justify-content-start"
          >
            <div className="navbar-nav">
              <NavLink to="/" exact={true} className="nav-link">
                Trang chủ
              </NavLink>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                >
                  Sách
                </a>
                <div className="dropdown-menu">
                  {allCategoriesBooks &&
                    allCategoriesBooks.length > 0 &&
                    allCategoriesBooks.map((item, index) => {
                      return (
                        <NavLink
                          className="dropdown-item"
                          role="presentation"
                          to={`/loai-sach/${item.categoryId}`}
                          exact
                          key={item.categoryId}
                        >
                          {item.nameCate}
                        </NavLink>
                      );
                    })}
                </div>
              </div>
              <NavLink to="/lienhe" exact={true} className="nav-link">
                Liên hệ
              </NavLink>
              <NavLink
                to="/chinh-sach-bao-mat"
                exact={true}
                className="nav-link"
              >
                Quy định
              </NavLink>

              <NavLink to="/blog" exact={true} className="nav-link">
                Blog
              </NavLink>
            </div>

            <div className="seacrh-container">
              <div className="input-group search-box">
                <input
                  type="text"
                  id="search"
                  className="form-control"
                  placeholder="Tìm kiếm sản phẩm"
                  onChange={(event) => this.handleOnchangeKeySearch(event)}
                  value={this.state.keysearch}
                />

                {/* <Select
                  options={Option}
                  value={this.state.keyword}
                  onChange={this.handleOnchangeSelect}
                  name={"categories"}
                  placeholder="Tìm kiếm sản phẩm..."
                  width="100%"
                /> */}

                <span className="input-group-addon">
                  <i
                    className="fas fa-search"
                    onClick={() => this.getProductSearch(this.state.infoBook)}
                    style={{ cursor: "pointer" }}
                  ></i>
                </span>
              </div>
              <div
                className={
                  this.state.showRecommendKeySearch === true
                    ? "search-result"
                    : " no-result"
                }
              >
                {allRecommendKeysearch &&
                  allRecommendKeysearch.length > 0 &&
                  allRecommendKeysearch.map((item, index) => {
                    return (
                      <p
                        key={index + 1000}
                        onClick={() => this.handleSearchByKeyword(item)}
                      >
                        <i className="fa-solid fa-book"></i> {item}
                      </p>
                    );
                  })}
              </div>
            </div>

            <div className="navbar-nav ml-auto">
              {/* <a href="#" className="nav-item nav-link notifications">
              <i className="fa fa-bell-o"></i>
              <span className="badge">1</span>
            </a> */}

              <Link
                to="/cart"
                className="nav-item nav-link messages"
                exact="true"
              >
                <i className="fas fa-shopping-cart"></i>
                <span className="badge">{this.props.numOfItemInCart}</span>
              </Link>
              {this.props.isLogin === true ? (
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    data-toggle="dropdown"
                    className="nav-link dropdown-toggle user-action"
                  >
                    <img
                      src={
                        this.props.userInfor && this.props.userInfor.image
                          ? this.props.userInfor.image
                          : defaultAvatar
                      }
                      className="avatar"
                      alt="Avatar"
                    />
                    {this.props.userInfor && this.props.userInfor.fullName
                      ? this.props.userInfor.fullName
                      : ""}
                    <b className="caret"></b>
                  </a>
                  <div className="dropdown-menu">
                    <NavLink
                      to={`/profile`}
                      className="dropdown-item"
                      activeClassName="active"
                      exact
                    >
                      <i className="fa-solid fa-user"></i> Hồ sơ
                    </NavLink>

                    <NavLink
                      to="/changepassword"
                      exact={true}
                      className="dropdown-item"
                      role="presentation"
                    >
                      <i className="fa-solid fa-key"></i> Đổi mật khẩu
                    </NavLink>

                    <NavLink
                      to="/order"
                      className="dropdown-item"
                      activeClassName="active"
                      exact
                    >
                      <i className="fas fa-shopping-bag"></i> Đơn hàng
                    </NavLink>

                    {this.props.isLogin === true &&
                      this.props.userInfor.role &&
                      this.props.userInfor.role.nameRole &&
                      (this.props.userInfor.role.nameRole === "ADMIN" ||
                        this.props.userInfor.role.nameRole === "SELLER") && (
                        <NavLink
                          to={
                            this.props.userInfor.role.nameRole === "ADMIN"
                              ? "/admin"
                              : "/admin/user"
                          }
                          target="_blank"
                          className="dropdown-item"
                          activeClassName="active"
                          exact
                        >
                          <i className="fas fa-tools"></i> Quản trị
                        </NavLink>
                      )}
                    <div className="dropdown-divider"></div>
                    <p
                      className="dropdown-item"
                      onClick={() => this.props.handleLogOutRedux()}
                      style={{ cursor: "pointer" }}
                    >
                      <i className="fa-solid fa-power-off"></i> Đăng xuất
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    exact={true}
                    className="btn btn-light action-button"
                  >
                    Đăng nhập
                  </NavLink>
                  <NavLink
                    to="/sign-up"
                    exact
                    className="btn btn-light action-button"
                  >
                    Đăng kí
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
    allCategoriesBooks: state.books.allCategoriesBooks,
    numOfItemInCart: state.cart.cart.length,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleLogOutRedux: () => dispatch(logOutSuccess()),
    getAllCategoriesBooksRedux: () => dispatch(getAllCategoriesBooksRedux()),
    searchBooks: (data) => dispatch(searchBooks(data)),
  };
};
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
