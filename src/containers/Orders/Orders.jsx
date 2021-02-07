import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Spinner from "../../components/UI/Spinner";
import Order from "../../components/Order/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../store/actions";
class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = (
        <div>
          {this.props.orders.map((order) => {
            return (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price.toFixed(2)}
              />
            );
          })}
        </div>
      );
    }
    return orders;
  }
}

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: () => dispatch(actions.fetchOrders()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
