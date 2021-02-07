import * as actionTypes from "../actions/actionTypes";
import { purchaseBurgerStart } from "../actions/order";
import { updateObject } from "../utility";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseInit = (state) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerSuccess = (state, action) => {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const displayLoading = (state) => {
  return updateObject(state, { loading: true });
};

const handleFailure = (state) => {
  return updateObject(state, { loading: false });
};

const fetchOrdersSuccess = (state, action) => {
  return updateObject(state, { orders: action.orders, loading: false });
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_FAIL:
      return handleFailure(state);
    case actionTypes.PURCHASE_BURGER_START:
      return displayLoading(state);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_FAIL:
      return handleFailure(state);
    case actionTypes.FETCH_ORDERS_START:
      return displayLoading(state);
    default:
      return state;
  }
};
