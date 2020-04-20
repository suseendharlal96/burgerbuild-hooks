import React, { useState } from "react";
import { connect } from "react-redux";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Modal/Button/Button";
import classes from "./Auth.css";
import * as authActions from "../../store/actions/index";

const auth = (props) => {
  const [authForm, setAuthForm] = useState({
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email",
      },
      value: "",
      validation: {
        isRequired: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: "input",
      elementConfig: {
        type: "password",
        placeholder: "Password",
      },
      value: "",
      validation: {
        isRequired: true,
        minLength: 6,
      },
      valid: false,
      touched: false,
    },
  });
  const [isSignup, setIsSignUp] = useState(true);

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

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event, id) => {
    event.preventDefault();
    const data = {
      ...authForm,
      [id]: {
        ...authForm[id],
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[id].validation),
        touched: true,
      },
    };
    setAuthForm(data);
  };

  const changeMode = () => {
    setIsSignUp(!isSignup);
  };

  const formSubmit = (event, isSignup) => {
    event.preventDefault();
    console.log(isSignup);
    if (props.price !== 0) {
      props.submitForm(isSignup, authForm, props, true);
    } else {
      props.submitForm(isSignup, authForm, props, false);
    }
  };

  let formData = [];
  for (let key in authForm) {
    formData.push({ id: key, inputData: authForm[key] });
  }
  let button = (
    <Button btntype="Success">
      {isSignup
        ? props.loading
          ? "Signing up..."
          : "SignUp"
        : props.loading
        ? "Signing in..."
        : "SignIn"}
    </Button>
  );
  let error = null;
  if (props.error) {
    error = <p style={{ color: "red" }}>{props.error}</p>;
  }

  let modeButton = (
    <Button clicked={changeMode}>
      {isSignup ? "Switch to Signin" : "Switch to Signup"}
    </Button>
  );
  if (props.loading) {
    modeButton = (
      <Button disabled="true" clicked={changeMode}>
        {isSignup ? "Switch to Signin" : "Switch to Signup"}
      </Button>
    );
  }
  let form = (
    <form onSubmit={(event) => formSubmit(event, isSignup)}>
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
    <div className={classes.Auth}>
      {error}
      {form}
      {modeButton}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.authReducer.loading,
    error: state.authReducer.error,
    price: state.burgerReducer.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitForm: (isSignup, loginData, routeData, ingData) =>
      dispatch(authActions.authStart(isSignup, loginData, routeData, ingData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(auth);
