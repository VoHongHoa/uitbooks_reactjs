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
    return <div>Content HTML</div>;
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
