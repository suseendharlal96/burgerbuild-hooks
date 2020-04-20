import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Button from "../../UI/Modal/Button/Button";

const orderDetail = (props) => {
  console.log(props.date);
  // console.log(props.id);
  // console.log(props.ingredients);
  // console.log(props.price);
  let detail;
  if (props) {
    let button;
    if (props.loading) {
      button = (
        <Button btntype="Danger" disabled="true">
          Deleting...
        </Button>
      );
    } else {
      button = (
        <Button btntype="Danger" clicked={props.delete}>
          Delete
        </Button>
      );
    }
    detail = (
      <div>
        <h2>Burger Detail:</h2>
        <p>Burger ordered on: {new Date(props.date).toString()}</p>
        <p>Customer Details:</p>
        {Object.keys(props.custDetails).map((ing) => {
          return (
            <li key={ing}>
              {ing} <span>:{props.custDetails[ing]}</span>
            </li>
          );
        })}
        <p>ingredients added are:</p>
        {Object.keys(props.ingredients).map((ing) => {
          return (
            <li key={ing}>
              {ing} --><span>quantity:{props.ingredients[ing]}</span>
            </li>
          );
        })}
        <p>
          Total Price:<strong>Rs.{props.price.toFixed(2)}</strong>
        </p>
        {button}
      </div>
    );
  } else {
    detail = <Redirect to="/orders" />;
  }

  return <div>{detail}</div>;
};

const mapStateToProps = (state) => {
  return {
    loading: state.orderReducer.loading,
  };
};

export default connect(mapStateToProps)(orderDetail);
