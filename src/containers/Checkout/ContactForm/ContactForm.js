import React, { useState } from "react";
import { connect } from "react-redux";

import * as orderActions from "../../../store/actions/index";

import Button from "../../../components/UI/Modal/Button/Button";
import classes from "./ContactForm.css";
import Input from "../../../components/UI/Input/Input";

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Your Name",
        autofocus: "autofocus",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Street",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP Code(5 charac)",
      },
      value: "",
      validation: {
        isRequired: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Your E-Mail",
        readonly: "readonly",
      },
      value: props.email,
      validation: {},
      valid: true,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "",
      validation: {
        isRequired: true,
      },
      valid: false,
    },
  });

  const [formIsValid, setformIsValid] = useState(false);

  if (props.purchased) {
    props.history.replace("/success");
  }

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.isRequired) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    const copy = { ...orderForm };
    const deepCopy = { ...copy[id] };
    deepCopy.value = event.target.value;
    deepCopy.valid = checkValidity(deepCopy.value, deepCopy.validation);
    deepCopy.touched = true;
    copy[id] = deepCopy;
    let formIsValid = true;
    for (let inputIdentifier in copy) {
      console.log(copy.email, copy.email.valid);
      formIsValid = copy[inputIdentifier].valid && formIsValid;
    }
    setOrderForm(copy);
    setformIsValid(formIsValid);
  };

  const formSubmit = (event) => {
    event.preventDefault();
    const formValue = {};
    for (let values in orderForm) {
      formValue[values] = orderForm[values].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      customerDetails: formValue,
      orderDate: new Date(),
      userId: props.localId,
    };
    props.onPurchaseBurger(order, props.token);
  };

  let formData = [];
  for (let key in orderForm) {
    formData.push({ id: key, inputData: orderForm[key] });
  }
  let button = (
    <Button disabled={!formIsValid} btntype="Success">
      PLACE ORDER
    </Button>
  );
  if (props.loading) {
    button = (
      <Button btntype="Success" disabled="true">
        PLACING ORDER...
      </Button>
    );
  }

  let form = (
    <form onSubmit={formSubmit}>
      {formData.map((data) => {
        return (
          <Input
            key={data.id}
            elementType={data.inputData.elementType}
            elementConfig={data.inputData.elementConfig}
            value={data.inputData.value}
            invalid={!data.inputData.valid}
            shouldValidate={data.inputData.validation}
            touched={data.inputData.touched}
            changed={(event) => inputChangedHandler(event, data.id)}
          />
        );
      })}
      {button}
    </form>
  );
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerReducer.ingredients,
    price: state.burgerReducer.totalPrice,
    token: state.authReducer.idToken,
    localId: state.authReducer.localId,
    email: state.authReducer.email,
    loading: state.orderReducer.loading,
    purchased: state.orderReducer.purchased,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseBurger: (orderData, token) =>
      dispatch(orderActions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(contactData);
