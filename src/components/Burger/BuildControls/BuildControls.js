import React from "react";
import classes from "./BuildControls.css";
import BuildControl from "./BuildControl/BuildControl";

const buildControls = (props) => {
  const ingredients = Object.keys(props.ingredients);
  const controls = [];
  for (let i = 0; i < ingredients.length; i++) {
    controls.push({
      label: ingredients[i].charAt(0).toUpperCase() + ingredients[i].slice(1),
      type: ingredients[i],
    });
  }
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price:<strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.type}
          label={ctrl.label}
          add={() => props.itemsAdded(ctrl.type)}
          remove={() => props.itemsRemoved(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchase}
        onClick={props.purchased}
      >
        {props.isAuth ? "ORDER NOW" : "Login to Order"}
      </button>
    </div>
  );
};
export default buildControls;
