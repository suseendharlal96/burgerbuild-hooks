import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Orders/CheckoutSummary/CheckoutSummary";
import ContactForm from "./ContactForm/ContactForm";
import Modal from "../../components/UI/Modal/Modal";

const checkout = (props) => {
  const [continuePurchase, setContinuePurchase] = useState(false);

  const formSubmit = () => {
    setContinuePurchase(true);
    props.history.replace("/checkout/contact-form");
  };

  const closeModalHandler = () => {
    setContinuePurchase(false);
  };
  let summary = <Redirect to="/" />;
  const isPurchased = props.isPurchased ? <Redirect to="/success" /> : null;
  if (props.ingredients) {
    summary = (
      <div>
        {isPurchased}
        <CheckoutSummary
          ingredients={props.ingredients}
          price={props.price}
          closeSummary={() => props.history.replace("/")}
          continue={formSubmit}
        />
        <Route
          path={props.match.path + "/contact-form"}
          render={(props) => (
            <Modal show={continuePurchase} closeModal={closeModalHandler}>
              <ContactForm {...props} />
            </Modal>
          )}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    isPurchased: state.orderReducer.purchased,
  };
};

export default connect(mapStateToProps)(checkout);
