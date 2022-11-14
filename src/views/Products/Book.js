import React, { Component } from "react";
import "./Book.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { addToCart } from "../../store/actions/AppAction";
import HomeHeader from "../Homepage/HomeHeader";
import {
  fetchDataFilter,
  getBookFilter,
  getCateBook,
} from "../../services/BookService";
import Footer from "../Homepage/Footer";
import { formatPrice } from "../../constants/format";
class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      currentPage: 0,
      numOfPage: 0,
      numofBooks: 0,
      allPrice: [],
      allAuthor: [],
      allPublish: [],
      selectedAuthor: "",
      selectedYearPublish: "",
      filterIns: "",
      // filterDsc: false,
      windowWidth: window.innerWidth,
      action: "",
    };
  }
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
  getAllBooksByCate = async (categoryId, page) => {
    try {
      let res = await getCateBook(categoryId, page);
      //console.log(res);
      if (res) {
        let numOfPage = 0;
        if (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT === 0) {
          numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_PRODUCT;
        } else {
          numOfPage =
            (res.count -
              (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT)) /
              process.env.REACT_APP_PAGING_LIMIT_PRODUCT +
            1;
        }
        this.setState({
          allBooks: res.bookList,
          numOfPage: numOfPage,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  getAllBookFilter = async (data, page) => {
    try {
      let res = await getBookFilter(data, page);
      console.log(res);
      let numOfPage = 0;
      if (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT === 0) {
        numOfPage = res.count / process.env.REACT_APP_PAGING_LIMIT_PRODUCT;
      } else {
        numOfPage =
          (res.count -
            (res.count % process.env.REACT_APP_PAGING_LIMIT_PRODUCT)) /
            process.env.REACT_APP_PAGING_LIMIT_PRODUCT +
          1;
      }
      this.setState({
        allBooks: res.bookList,
        numOfPage: numOfPage,
      });
    } catch (e) {
      console.log(e);
    }
  };
  componentDidMount() {
    this.getAllBooksByCate(this.props.match.params.cateId, 0);
    this.getDataFilter();
  }
  componentDidUpdate(preProps) {
    if (preProps.match.params !== this.props.match.params) {
      this.getAllBooksByCate(this.props.match.params.cateId, 0);
      this.setState({
        currentPage: 0,
        filterIns: "",
        allAuthor: [],
        allPublish: [],
        selectedAuthor: "",
        selectedYearPublish: "",
      });
      this.getDataFilter(this.props.match.params.cateId);
    }
  }
  handleAddToCart = (item) => {
    this.props.addToCart(item);
  };
  handleChangePage = (item) => {
    if (this.state.action === "FILTER") {
      let data = {
        tacgia: this.state.selectedAuthor,
        namsb: this.state.selectedYearPublish,
        giathap: "",
        giacao: "",
        ma: this.state.filterIns,
        loai: this.props.match.params.cateId,
      };
      this.getAllBookFilter(data, item);
      console.log(data, item);
    } else {
      this.getAllBooksByCate(this.props.match.params.cateId, item);
    }

    this.setState({
      currentPage: item,
    });
  };
  getDataFilter = async () => {
    try {
      let res = await fetchDataFilter(this.props.match.params.cateId);
      this.setState({
        allPrice: res.gia,
        allAuthor: this.setSelectedAuthor(res.tacgia),
        allPublish: this.setSelectedAuthor(res.namsb),
      });
    } catch (e) {
      console.log(e);
    }
  };
  setSelectedAuthor = (allAuthor) => {
    let arrAuthor = [];
    let obj = {};
    obj.label = "Tất cả";
    obj.value = "";
    arrAuthor.push(obj);
    for (let i = 0; i < allAuthor.length; i++) {
      let objectAuthor = {};
      objectAuthor.label = allAuthor[i];
      objectAuthor.value = allAuthor[i];
      arrAuthor.push(objectAuthor);
    }
    return arrAuthor;
  };
  handleDetailBook = (item) => {
    this.props.history.push(`/book/${item.bookId}`);
  };
  handleOnchangeSelectAuthor = async (event) => {
    let selectedAuthor = event.target.value;
    this.setState({
      selectedAuthor: selectedAuthor,
      action: "FILTER",
      currentPage: 0,
    });
    let data = {
      tacgia: selectedAuthor,
      namsb: this.state.selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: this.state.filterIns,
      loai: this.props.match.params.cateId,
    };
    console.log(data);
    this.getAllBookFilter(data, 0);
  };

  handleOnchangeSelectYearchPublish = async (event) => {
    let selectedYearPublish = event.target.value;
    this.setState({
      selectedYearPublish: selectedYearPublish,
      action: "FILTER",
      currentPage: 0,
    });
    let data = {
      tacgia: this.state.selectedAuthor,
      namsb: selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: this.state.filterIns,
      loai: this.props.match.params.cateId,
    };
    console.log(data);
    this.getAllBookFilter(data, 0);
  };
  handlefilterPriceIns = () => {
    this.setState({
      filterIns: true,
      action: "FILTER",
      // filterDsc: this.state.filterIns,
    });

    let data = {
      tacgia: this.state.selectedAuthor,
      namsb: this.state.selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: true,
      loai: this.props.match.params.cateId,
    };
    this.getAllBookFilter(data, this.state.currentPage);
  };
  handlefilterPriceDsc = () => {
    this.setState({
      filterIns: false,
      action: "FILTER",
    });

    let data = {
      tacgia: this.state.selectedAuthor,
      namsb: this.state.selectedYearPublish,
      giathap: "",
      giacao: "",
      ma: false,
      loai: this.props.match.params.cateId,
    };
    this.getAllBookFilter(data, this.state.currentPage);
  };
  handleReturnHome = () => {
    this.props.history.push("/");
  };
  render() {
    let { numOfPage, currentPage, allBooks, allAuthor, allPublish } =
      this.state;
    let arr = [];
    for (let i = 0; i < numOfPage; i++) {
      arr.push(i);
    }
    //console.log(this.state);
    let cateName = this.state.allBooks[0]?.category.nameCate;
    return <div>Content HTML</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLogin,
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(addToCart(item)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Book));
