import React, { useEffect } from "react";
import { connect } from "react-redux";

import classes from "./SuccessPage.css";
import * as actions from "../../../store/actions/index";
import Button from "../Modal/Button/Button";
import Burger from "../../Burger/Burger";

const success = (props) => {
  useEffect(() => {
    props.initPurchase();
  }, []);

  let burger = <p>Your burger is being prepared...</p>;
  if (props.ingredients) {
    burger = <Burger ingredients={props.ingredients} />;
  }
  return (
    <div className={classes.Successpage}>
      <h2>Your order has been successfully placed!</h2>
      <Button btntype="Success" clicked={() => props.history.replace("/")}>
        Place New Order!
      </Button>
      <Button
        btntype="Success"
        clicked={() => props.history.replace("/orders")}
      >
        Go to My Orders!
      </Button>
      <h2>Your burger is being prepared!</h2>
      <div>{burger}</div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initPurchase: () => dispatch(actions.initOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(success);
