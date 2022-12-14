import React, { Component } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { logOutSuccess, searchBooks } from "../../store/actions/AppAction";
import { getAllCategoriesBooksRedux } from "../../store/actions/CategoriesAction";
import defaultAvatar from "../../assets/images/avatar.jpg";
import { keywordSearch } from "../../services/BookService";
import logo from "../../assets/images/logo.png";
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
        <nav className="navbar navbar-expand-xl  ">
          <div className="container">
            <Link to={"/"} className="navbar-brand" exact="true">
              {/* <i className="fa fa-cube"></i> */}
              <img src={logo} alt="logo" height={"40px"} />
               UIT<b>Book</b>
            </Link>
            <button
              type="button"
              className="navbar-toggler"
              data-toggle="collapse"
              data-target="#navbarCollapse"
            >
              <i className="fa-solid fa-bars"></i>
            </button>
            <div
              id="navbarCollapse"
              className="collapse navbar-collapse justify-content-between"
            >
              <div className="seacrh-container">
                <div className="input-group search-box">
                  <input
                    type="text"
                    id="search"
                    className="form-control"
                    placeholder="T??m ki???m s???n ph???m"
                    onChange={(event) => this.handleOnchangeKeySearch(event)}
                    value={this.state.keysearch}
                  />
                  {/* <Select
                    options={Option}
                    value={this.state.keyword}
                    onChange={this.handleOnchangeSelect}
                    name={"categories"}
                    placeholder="T??m ki???m s???n ph???m..."
                    width="100%"
                  /> */}
                  <span className="input-group-addon">
                    <i
                      className="fas fa-search"
                      onClick={() => this.getProductSearch(this.state.infoBook)}
                      style={{ cursor: "pointer", color: "#666" }}
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
              <div className="navbar-nav">
                <NavLink to="/" exact={true} className="nav-link">
                  Trang ch???
                </NavLink>
                <div className="nav-item dropdown">
                  <a
                    href="#"
                    className="nav-link dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    S??ch
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
                  Li??n h???
                </NavLink>
                <NavLink
                  to="/chinh-sach-bao-mat"
                  exact={true}
                  className="nav-link"
                >
                  Quy ?????nh
                </NavLink>
                <NavLink to="/blog" exact={true} className="nav-link">
                  Blog
                </NavLink>
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
                        <i className="fa-solid fa-user"></i> H??? s??
                      </NavLink>
                      <NavLink
                        to="/changepassword"
                        exact={true}
                        className="dropdown-item"
                        role="presentation"
                      >
                        <i className="fa-solid fa-key"></i> ?????i m???t kh???u
                      </NavLink>
                      <NavLink
                        to="/order"
                        className="dropdown-item"
                        activeClassName="active"
                        exact
                      >
                        <i className="fas fa-shopping-bag"></i> ????n h??ng
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
                            <i className="fas fa-tools"></i> Qu???n tr???
                          </NavLink>
                        )}
                      <div className="dropdown-divider"></div>
                      <p
                        className="dropdown-item"
                        onClick={() => this.props.handleLogOutRedux()}
                        style={{ cursor: "pointer" }}
                      >
                        <i className="fa-solid fa-power-off"></i> ????ng xu???t
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
                      ????ng nh???p
                    </NavLink>
                    <NavLink
                      to="/sign-up"
                      exact
                      className="btn btn-light action-button"
                    >
                      ????ng k??
                    </NavLink>
                  </>
                )}
              </div>
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
