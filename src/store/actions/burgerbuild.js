import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

export const addIngredient = (ingreName) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredient: ingreName,
  };
};
export const removeIngredient = (ingreName) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredient: ingreName,
  };
};

export const setIngredients = (data) => {
  return {
    type: actionTypes.SET_INGREDIENT,
    ingredients: data,
  };
};

export const initIngredient = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((res) => {
        console.log(res);
        dispatch(setIngredients(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
