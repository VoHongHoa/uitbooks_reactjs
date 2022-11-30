import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
import { toast } from "react-toastify";
import AdminHeader from "../AdminHeader/AdminHeader";
import { fetchDataChart } from "../../../services/HomeService";

ChartJS.register(...registerables);

class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allMonthUser: [],
      numOfUserByMonth: [],
      allMonthSale: [],
      sale: [],
      allMonthBook: [],
      book: [],
      Category: [],
      numOfBook: [],
    };
  }
  componentDidMount() {
    this.getData();
  }
  getData = async () => {
    try {
      let res = await fetchDataChart();
      console.log(res);
      if (res) {
        this.buiDataChart(res.month_user, "user");
        this.buiDataChart(res.month_price, "sale");
        this.buiDataChart(res.month_book, "book");
        this.buiDataChart(res.book_category, "category");
      }
    } catch (e) {
      console.log(e);
      toast.error("Lỗi server");
    }
  };
  buiDataChart = (chartData, nameChart) => {
    let allMonth = [];
    let numOfUserByMonth = [];
    if (chartData && chartData.length > 0) {
      for (let index = 0; index < chartData.length; index++) {
        if (nameChart === "category") {
          let labelMonth = chartData[index].category;
          allMonth.push(labelMonth);
        } else {
          for (let j = 1; j <= 12; j++) {
            if (chartData[index].month === j) {
              let labelMonth = `Tháng ${j}`;
              allMonth.push(labelMonth);
              break;
            }
          }
        }

        if (nameChart === "user") {
          numOfUserByMonth.push(chartData[index].user);
        }
        if (nameChart === "sale") {
          numOfUserByMonth.push(chartData[index].price);
        }
        if (nameChart === "book") {
          numOfUserByMonth.push(chartData[index].book);
        }
        if (nameChart === "category") {
          numOfUserByMonth.push(chartData[index].book);
        }
      }
    }
    if (nameChart === "user") {
      this.setState({
        allMonthUser: allMonth,
        numOfUserByMonth: numOfUserByMonth,
      });
    }
    if (nameChart === "sale") {
      this.setState({
        allMonthSale: allMonth,
        sale: numOfUserByMonth,
      });
    }
    if (nameChart === "book") {
      this.setState({
        allMonthBook: allMonth,
        book: numOfUserByMonth,
      });
    }
    if (nameChart === "category") {
      this.setState({
        Category: allMonth,
        numOfBook: numOfUserByMonth,
      });
    }
  };
  render() {
    let dataUser = {
      labels: this.state.allMonthUser,
      datasets: [
        {
          label: "Số người dùng đăng kí theo từng tháng",
          backgroundColor: "rgb(240,175,0)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.numOfUserByMonth,
        },
      ],
    };
    let dataSale = {
      labels: this.state.allMonthSale,
      datasets: [
        {
          label: "Doanh thu theo từng tháng",
          backgroundColor: "rgb(110,105,0)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.sale,
        },
      ],
    };
    let dataBook = {
      labels: this.state.allMonthBook,
      datasets: [
        {
          label: "Số lượng sách bán được theo từng tháng",
          backgroundColor: "rgb(90,50,0)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.book,
        },
      ],
    };
    let dataCategory = {
      labels: this.state.Category,
      datasets: [
        {
          label: "Số lượng sách bán được theo từng lại",
          backgroundColor: "rgb(20,50,0)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: this.state.numOfBook,
        },
      ],
    };
    return (
      <div>
        <div className="container">
          <AdminHeader />
          <h2 className="title mt-3" style={{ textAlign: "center" }}>
            Báo cáo thống kê
          </h2>
          <div className="row">
            <div className="col-6 mb-3">
              <Bar
                data={dataUser}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
              <p style={{ textAlign: "center" }}>Biểu đồ người dùng</p>
            </div>
            <div className="col-6">
              <Bar
                data={dataSale}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
              <p style={{ textAlign: "center" }}>Biểu đồ doanh thu</p>
            </div>
            <div className="col-6">
              <Bar
                data={dataBook}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
              <p style={{ textAlign: "center" }}>Biểu đồ sách</p>
            </div>

            <div className="col-6">
              <Bar
                data={dataCategory}
                options={{
                  title: {
                    display: true,
                    text: "Average Rainfall per month",
                    fontSize: 20,
                  },
                  legend: {
                    display: true,
                    position: "right",
                  },
                }}
              />
              <p style={{ textAlign: "center" }}>Biểu đồ loại sách</p>
            </div>
          </div>
        </div>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AdminPage)
);
