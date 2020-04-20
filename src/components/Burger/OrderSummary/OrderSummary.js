import React from "react";

import Auxi from "../../../hoc/Auxilary";
import Button from "../../UI/Modal/Button/Button";

const orderSummary = (props) => {
  const summary = Object.keys(props.ingredients).map((key) => {
    return (
      <li key={key}>
        {key}:{props.ingredients[key]}
      </li>
    );
  });
  return (
    <Auxi>
      <h3>Your order summary:</h3>
      <ul>{summary}</ul>
      <p>
        Total Price:<strong>Rs.{props.price.toFixed(2)}</strong>
      </p>
      <p>Do you want to continue?</p>
      <Button btntype="Success" clicked={props.confirm}>
        Confirm
      </Button>
      <Button btntype="Danger" clicked={props.closeModal}>
        Cancel
      </Button>
    </Auxi>
  );
};
export default orderSummary;
