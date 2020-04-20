import * as actionTypes from "../actions/actionTypes";

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
  error: null,
};

const orderStore = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_ORDER:
      return {
        ...state,
        purchased: false,
        error: null,
      };
    case actionTypes.INIT_PURCHASE:
      return {
        ...state,
        loading: true,
        purchased: false,
        error: null,
      };
    case actionTypes.PLACE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.concat(action.orderData),
        loading: false,
        purchased: true,
      };
    case actionTypes.PLACE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        purchased: false,
      };
    case actionTypes.SET_FETCHED_ORDERS:
      return {
        ...state,
        orders: action.orderData,
        error: null,
      };
    case actionTypes.ORDERS_FAILED:
      return {
        ...state,
        error: action.error,
      };
    case actionTypes.INIT_DELETE:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.DELETE_ORDER:
      const updateOrder = state.orders.filter(
        (data) => data.id !== action.delId
      );
      return {
        ...state,
        orders: updateOrder,
        loading: false,
      };
    default:
      return state;
  }
};

export default orderStore;
