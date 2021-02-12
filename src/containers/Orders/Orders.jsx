import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Spinner from "../../components/UI/Spinner";
import Order from "../../components/Order/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as actions from "../../store/actions";

const Orders = (props) => {
  useEffect(() => props.fetchOrders(props.token), []);
  let orders = <Spinner />;
  if (!props.loading) {
    orders = (
      <div>
        {props.orders.map((order) => {
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
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  fetchOrders: (token) => dispatch(actions.fetchOrders(token))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
