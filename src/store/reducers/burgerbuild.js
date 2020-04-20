import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 0,
};

const PRICE = {
  salad: 1,
  cheese: 1,
  meat: 1,
  bacon: 1,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] + 1,
        },
        totalPrice: state.totalPrice + PRICE[action.ingredient],
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredient]: state.ingredients[action.ingredient] - 1,
        },
        totalPrice: state.totalPrice - PRICE[action.ingredient],
      };
    case actionTypes.SET_INGREDIENT:
      console.log("aas", action.ingredients);
      return {
        ...state,
        ingredients: action.ingredients,
        totalPrice: 0,
      };
    default:
      return state;
  }
};

export default reducer;
