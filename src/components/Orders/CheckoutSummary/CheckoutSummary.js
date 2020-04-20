import React from "react";

import Burger from "../../Burger/Burger";
import Button from "../../UI/Modal/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <div style={{ width: "100%", margin: "auto" }}>
        <p>
          Total Price:<strong>Rs.{props.price}</strong>
        </p>
        <p>Have a look of your delicious burger:</p>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btntype="Success" clicked={props.continue}>
        Confirm
      </Button>
      <Button btntype="Danger" clicked={props.closeSummary}>
        Cancel
      </Button>
    </div>
  );
};

export default checkoutSummary;
