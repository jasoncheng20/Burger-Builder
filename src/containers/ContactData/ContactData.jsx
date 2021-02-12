import React, { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import classes from "./ContactData.module.css";

import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";
import withErrorHandler from "../../hoc/withErrorHandler";
import * as orderActions from "../../store/actions";

const ContactData = (props) => {
  const orderFormConfig = {
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Name",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      typed: false,
    },
    address1: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address Line 1",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      typed: false,
    },
    address2: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Address Line 2",
      },
      value: "",
      validation: {},
      valid: true,
    },
    state: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "State",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      typed: false,
    },
    zip: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Zip Code",
      },
      value: "",
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
        isNumeric: true,
      },
      valid: false,
      typed: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "Email Address",
      },
      value: "",
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      typed: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: true,
    },
  };

  const [orderForm, setOrderForm] = useState(orderFormConfig);
  const [formValidity, setFormValidity] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let field in orderForm) {
      formData[field] = orderForm[field].value;
    }
    const order = {
      ingredients: props.ingred,
      price: props.totalPrice,
      // from form
      customerData: formData,
    };
    props.buyBurger(order, props.token);
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  };

  const inputChangedHander = (event, formfield) => {
    // create clones
    const updatedOrderForm = { ...orderForm };
    const updatedFormField = { ...updatedOrderForm[formfield] };
    // update clones without mutating original for value, validiation, and whether or not it was typed in or not
    updatedFormField.value = event.target.value;
    updatedFormField.valid = checkValidity(
      updatedFormField.value,
      updatedFormField.validation
    );
    updatedFormField.typed = true;
    updatedOrderForm[formfield] = updatedFormField;
    // check validation of whole form
    let formIsValid = true;
    for (let field in updatedOrderForm) {
      formIsValid = updatedOrderForm[field].valid && formIsValid;
    }
    //set state
    setOrderForm(updatedOrderForm);
    setFormValidity(formIsValid);
  };

  const formfields = [];
  for (let field in orderForm) {
    formfields.push(field);
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formfields.map((field) => (
        <Input
          key={field}
          elementType={orderForm[field].elementType}
          elementConfig={orderForm[field].elementConfig}
          value={orderForm[field].value}
          changed={(event) => inputChangedHander(event, field)}
          invalid={!orderForm[field].valid}
          shouldValidate={orderForm[field].validation}
          typed={orderForm[field].typed}
        />
      ))}
      <Button btnType="Success" disabled={!formValidity}>
        PLACE YOUR ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }

  return (
    <div className={classes.ContactData}>
      <h4>Delivery data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingred: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.price,
  loading: state.order.loading,
  token: state.auth.token
});

const mapDispatchToProps = (dispatch) => ({
  buyBurger: (orderData, token) => dispatch(orderActions.purchaseBurger(orderData, token)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
