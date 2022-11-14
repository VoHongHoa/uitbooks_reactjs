import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
class PayPalCheckoutButton extends Component {
  componentDidMount() {}
  handleApprove = (status) => {
    // call backend funtion to save order bill
    if (status === "COMPLETED") {
      this.props.handleBuyBooks();
    }
    //console.log(orderID);
  };
  render() {
    let { total } = this.props;
    total = (total / 23205).toFixed(2);
    return (
      <PayPalButtons
        className="btn btn-primary col-12"
        style={{
          color: "silver",
          layout: "horizontal",
          tagline: "false",
        }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: "Mua sản phẩm tại uitstore",
                amount: {
                  value: total,
                },
              },
            ],
          });
        }}
        onClick={(data, actions) => {
          this.props.changePayment();
          const hasAlreadyBought = this.props.checkInput();
          if (hasAlreadyBought) {
            return actions.resolve();
          } else {
            return actions.reject();
          }
        }}
        onApprove={async (data, actions) => {
          const order = await actions.order.capture();
          console.log("order", order);
          this.handleApprove(order.status);
        }}
        onError={(err) => {
          console.log("Paypal on error:", err);
        }}
      />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    userInfor: state.user.userInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PayPalCheckoutButton)
);
