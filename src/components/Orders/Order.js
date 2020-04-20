import React, { useState } from "react";
import { Route } from "react-router-dom";

import Modal from "../UI/Modal/Modal";
import OrderDetail from "./OrderDetail/OrderDetail";
import classes from "./Order.css";
import Button from "../UI/Modal/Button/Button";

const order = (props) => {
  const [continuePurchase, setcontinuePurchase] = useState(false);

  const closeModalHandler = () => {
    setcontinuePurchase(false);
    props.history.replace("/orders");
  };

  const details = () => {
    setcontinuePurchase(true);
    props.history.replace("/orders/details");
  };

  console.log(props);
  const ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({ name: key, quantity: props.ingredients[key] });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
        key={ig.name}
      >
        {ig.name} ({ig.quantity})
      </span>
    );
  });
  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>Rs.{props.price}</strong>
      </p>
      <p>
        Burger ordered on:
        <strong>{new Date(props.date).toString()}</strong>
      </p>
      <div>
        <Button btntype="Success" clicked={details}>
          Details
        </Button>
        <Route
          path={props.match.path + "/details"}
          render={() => (
            <Modal show={continuePurchase} closeModal={closeModalHandler}>
              <OrderDetail
                id={props.id}
                date={props.date}
                custDetails={props.custDetails}
                price={props.price}
                ingredients={props.ingredients}
                delete={props.delete}
              />
            </Modal>
          )}
        />
      </div>
    </div>
  );
};

export default order;
