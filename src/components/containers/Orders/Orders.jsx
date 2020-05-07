import React from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";

import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import Order from "../../../components/Order/Order";
import * as actions from "../../../store/actions/index";
import Spinner from "../../../components/UI/Spinner/Spinner";

class Orders extends React.Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))}
        </div>
      );
    }
    return orders;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => {
      dispatch(actions.fetchOrders(token));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, axios));
