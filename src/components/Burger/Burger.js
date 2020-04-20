import React from "react";
import BurgerIngredients from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.css";

const burger = (props) => {
  console.log(props.ingredients)
  let finalIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      // console.log(igKey);
      // console.log(1, Array(props.ingredients[igKey]));
      // console.log(2, ...Array(props.ingredients[igKey]));
      // console.log(3, [...Array(props.ingredients[igKey])]);
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredients key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (finalIngredients.length === 0) {
    finalIngredients = <p>Please add some stuffs</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredients type={"bread-top"} />
      {finalIngredients}
      <BurgerIngredients type={"bread-bottom"} />
    </div>
  );
};
export default burger;
