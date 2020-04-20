import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const initOrder = () => {
  return {
    type: actionTypes.INIT_ORDER,
  };
};
export const initPurchase = () => {
  return {
    type: actionTypes.INIT_PURCHASE,
  };
};

export const setOrderSuccess = (orderData) => {
  return {
    type: actionTypes.PLACE_ORDER_SUCCESS,
    orderData: orderData,
  };
};
export const setOrderFail = () => {
  return {
    type: actionTypes.PLACE_ORDER_FAIL,
  };
};

export const purchaseBurger = (orderData, token) => {
  return (dispatch) => {
    dispatch(initPurchase());
    axios
      .post("/orders.json?auth=" + token, orderData)
      .then((response) => {
        const order = { ...orderData, id: response.data.name };
        dispatch(setOrderSuccess(order));
      })
      .catch((error) => {
        console.log(error);
        dispatch(setOrderFail());
      });
  };
};

export const setFetchedOrders = (orderData) => {
  return {
    type: actionTypes.SET_FETCHED_ORDERS,
    orderData: orderData,
  };
};

export const setFetchedOrdersFail = (error) => {
  return {
    type: actionTypes.ORDERS_FAILED,
    error: error,
  };
};

export const fetchOrders = (token, userId) => {
  return (dispatch) => {
    const queryParams =
      "?auth=" + token + '&orderBy="userId"&equalTo="' + userId + '"';
    axios
      .get("/orders.json" + queryParams)
      .then((res) => {
        const a = [];
        for (let key in res.data) {
          a.push({ ...res.data[key], id: key });
        }
        dispatch(setFetchedOrders(a.reverse()));
      })
      .catch((err) => {
        dispatch(setFetchedOrdersFail(err.response.statusText));
      });
  };
};

export const deleteStateOrder = (id) => {
  return {
    type: actionTypes.DELETE_ORDER,
    delId: id,
  };
};

export const initDel = () => {
  return {
    type: actionTypes.INIT_DELETE,
  };
};

export const deleteOrder = (id, obj, token) => {
  return (dispatch) => {
    dispatch(initDel());
    axios
      .delete(`/orders/${id}.json?auth=${token}`)
      .then((res) => {
        dispatch(deleteStateOrder(id));
        obj.history.replace("/orders");
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
