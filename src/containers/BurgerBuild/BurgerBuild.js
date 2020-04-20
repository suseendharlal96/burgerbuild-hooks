import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Summary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";

const burgerbuild = (props) => {
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    props.initIngredients();
  }, []);

  const updatepurchase = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuth) {
      setPurchased(true);
    } else {
      props.history.replace("/auth");
    }
  };

  const closeModalHandler = () => {
    setPurchased(false);
  };

  const confirm = () => {
    props.onPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let burger = <p>loading...</p>;
  if (props.ings) {
    burger = (
      <div>
        <Modal show={purchased} closeModal={closeModalHandler}>
          <Summary
            price={props.price}
            ingredients={props.ings}
            closeModal={closeModalHandler}
            confirm={confirm}
          />
        </Modal>
        <div>
          <Burger ingredients={props.ings} />
        </div>
        <div>
          <BuildControls
            ingredients={props.ings}
            itemsAdded={props.addIngredient}
            itemsRemoved={props.removeIngredient}
            purchase={updatepurchase(props.ings)}
            isAuth={props.isAuth}
            purchased={purchaseHandler}
            price={props.price}
            disabled={disabledInfo}
          />
        </div>
      </div>
    );
  }
  return <div>{burger}</div>;
};
const mapStateToProps = (state) => {
  // console.log(state);
  return {
    ings: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    isAuth: state.authReducer.idToken !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingreName) => dispatch(actions.addIngredient(ingreName)),
    removeIngredient: (ingreName) =>
      dispatch(actions.removeIngredient(ingreName)),
    initIngredients: () => dispatch(actions.initIngredient()),
    onPurchase: () => dispatch(actions.initOrder()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(burgerbuild);
