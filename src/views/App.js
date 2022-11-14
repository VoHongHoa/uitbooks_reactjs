import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomePage from "./Homepage/HomePage.js";
import Login from "./User/Login/Login";
import SignUp from "./User/SignUp/SignUp";
import Profile from "./User/Profile";
import Adminpage from "./Admin/AdminPage/Adminpage";
import UserManage from "./Admin/AdminPage/UserManage";
import CategoriesBooks from "./Admin/AdminPage/CategoriesBooks";
import BooksManage from "./Admin/AdminPage/BooksManage";
import ChangePassword from "./User/ChangePassword/ChangePassword";
import ForgotPassword from "./User/ForgotPassword/ForgotPassword";
import Cart from "./Cart/Cart";
import Contact from "./Contact/Contact";
import Term from "./Term/Term";
import DetailBook from "./DetailBook/DetailBook";
import ManageOrder from "./Admin/AdminPage/ManageOrder";
import BlogManage from "./Admin/AdminPage/BlogManage";
import Blog from "./Blog/Blog";
import Book from "./Products/Book";
import Search from "./Search/Search";
import ConfirmForgotPassword from "./User/ForgotPassword/ConfirmForgotPassword";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Order from "./Order/Order";
import Term2 from "./Term/Term2";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    let { isLogin, userInfor } = this.props;
    return (
      <BrowserRouter>
        <PayPalScriptProvider
          options={{ "client-id": process.env.REACT_APP_CLIENT_ID_PAYPAL }}
        >
          <div className="App">
            <Switch>
              <Route path="/" exact>
                <HomePage />
              </Route>
              <Route path="/book/:id" exact>
                <DetailBook />
              </Route>
              <Route path="/loai-sach/:cateId" exact>
                <Book />
              </Route>
              <Route path="/lienhe" exact>
                <Contact />
              </Route>
              <Route path="/chinh-sach-bao-mat" exact>
                <Term />
              </Route>
              <Route path="/dieu-khoan-su-dung" exact>
                <Term2 />
              </Route>

              <Route path="/tim-kiem" exact>
                <Search />
              </Route>

              <Route path="/cai-dat-mat-khau-moi/:email/:token" exact>
                <ConfirmForgotPassword />
              </Route>

              <Route path="/blog" exact>
                <Blog />
              </Route>
              <Route path="/order" exact>
                <Order />
              </Route>
              <Route path="/login" exact>
                {isLogin === true ? <Redirect to="/" /> : <Login />}
              </Route>
              <Route path="/sign-up" exact>
                {isLogin === true ? <Redirect to="/" /> : <SignUp />}
              </Route>

              <Route path="/profile" exact>
                {isLogin === false ? <Redirect to="/login" /> : <Profile />}
              </Route>

              <Route path="/cart" exact>
                {/* {isLogin === false ? <Redirect to="/login" /> : <Cart />} */}
                <Cart></Cart>
              </Route>

              <Route path="/admin" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                userInfor.role.nameRole === "ADMIN" ? (
                  <Adminpage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>
              <Route path="/admin/user" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                (userInfor.role.nameRole === "ADMIN" ||
                  userInfor.role.nameRole === "SELLER") ? (
                  <UserManage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/categories" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                (userInfor.role.nameRole === "ADMIN" ||
                  userInfor.role.nameRole === "SELLER") ? (
                  <CategoriesBooks />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/order" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                (userInfor.role.nameRole === "ADMIN" ||
                  userInfor.role.nameRole === "SELLER") ? (
                  <ManageOrder />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/books" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                (userInfor.role.nameRole === "ADMIN" ||
                  userInfor.role.nameRole === "SELLER") ? (
                  <BooksManage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/admin/blog" exact>
                {isLogin === true &&
                userInfor.role &&
                userInfor.role.nameRole &&
                userInfor.role.nameRole === "ADMIN" ? (
                  <BlogManage />
                ) : (
                  <Redirect to="/login" />
                )}
              </Route>

              <Route path="/changepassword" exact>
                {isLogin === false ? (
                  <Redirect to="/login" />
                ) : (
                  <ChangePassword />
                )}
              </Route>
              <Route path="/forgotpassword" exact>
                <ForgotPassword />
              </Route>
            </Switch>
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          </div>
        </PayPalScriptProvider>
      </BrowserRouter>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(App);
