import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Order from "../../components/Orders/Order";
import * as action from "../../store/actions/index";
import Button from "../../components/UI/Modal/Button/Button";

const orders = (props) => {
  const [priceCheck, setpriceCheck] = useState("");
  const [dateCheck, setdateCheck] = useState("");

  useEffect(() => {
    console.log(props.token);
    props.fetchOrders(props.token, props.localId);
  }, []);

  const sort = (event) => {
    if (event.target.value === "low") {
      props.orders.sort((a, b) => +a.price - +b.price);
      setpriceCheck(event.target.value);
      setdateCheck("");
    } else if (event.target.value === "high") {
      props.orders.sort((a, b) => +b.price - +a.price);
      setpriceCheck(event.target.value);
      setdateCheck("");
    } else if (event.target.value === "old") {
      props.orders.sort(
        (a, b) =>
          new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
    } else if (event.target.value === "new") {
      props.orders.sort(
        (a, b) =>
          new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
      );
      setpriceCheck("");
      setdateCheck(event.target.value);
    }
  };

  const deleteHandler = (value) => {
    console.log(value);
    props.deleteOrders(value, { ...props }, props.token);
  };

  let filter = null;
  let error = null;
  if (props.error) {
    error = (
      <div>
        <p>{props.error}</p>
        <Button
          btntype="Success"
          clicked={() => props.history.replace("/auth")}
        >
          click to Signup/in
        </Button>
      </div>
    );
  }
  if (!props.error && props.orders && props.orders.length > 0) {
    filter = (
      <div>
        <h2>My Orders:</h2>
        <div style={{ fontWeight: "bold" }}>Filter By:</div>
        <span>
          <label>Date:</label>
          <br />
          old:
          <input
            type="radio"
            name="price"
            value="old"
            onChange={(event) => sort(event)}
            checked={dateCheck === "old"}
          />
          new:
          <input
            type="radio"
            name="price"
            value="new"
            onChange={(event) => sort(event)}
            checked={dateCheck === "new"}
          />
        </span>
        <br />
        <span>
          <label>Price:</label>
          <br />
          <span>
            low:
            <input
              type="radio"
              name="price"
              value="low"
              onChange={(event) => sort(event)}
              checked={priceCheck === "low"}
            />
            high:
            <input
              type="radio"
              name="price"
              value="high"
              onChange={(event) => sort(event)}
              checked={priceCheck === "high"}
            />
          </span>
        </span>
      </div>
    );
  } else if (!props.error) {
    filter = <p>No Orders found!</p>;
  }
  console.log(props.orders);
  return (
    <div>
      {error}
      {filter}
      {props.token
        ? props.orders.map((order) => {
            return (
              <Order
                {...props}
                key={order.id}
                id={order.id}
                custDetails={order.customerDetails}
                date={order.orderDate}
                price={order.price}
                ingredients={order.ingredients}
                delete={() => deleteHandler(order.id)}
              />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orderReducer.orders,
    token: state.authReducer.idToken,
    localId: state.authReducer.localId,
    error: state.orderReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token, userId) => dispatch(action.fetchOrders(token, userId)),
    deleteOrders: (id, props, token) =>
      dispatch(action.deleteOrder(id, props, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orders);
