import React, { Component } from "react";
import axios from "axios";
import classes from "./ContactData.module.css";

import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";
import Input from "../../components/UI/Input";

class ContactData extends Component {
  state = {
    orderForm: {
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
    },
    formIsValid: false,
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let field in this.state.orderForm) {
      formData[field] = this.state.orderForm[field].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // from form
      customerData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  checkValidity = (value, rules) => {
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

    return isValid;
  };

  inputChangedHander = (event, formfield) => {
    // create clones
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormField = { ...updatedOrderForm[formfield] };
    // update clones without mutating original for value, validiation, and whether or not it was typed in or not
    updatedFormField.value = event.target.value;
    updatedFormField.valid = this.checkValidity(
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
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formfields = [];
    const { orderForm } = this.state;
    for (let field in orderForm) {
      formfields.push(field);
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formfields.map((field) => (
          <Input
            key={field}
            elementType={orderForm[field].elementType}
            elementConfig={orderForm[field].elementConfig}
            value={orderForm[field].value}
            changed={(event) => this.inputChangedHander(event, field)}
            invalid={!orderForm[field].valid}
            shouldValidate={orderForm[field].validation}
            typed={orderForm[field].typed}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          PLACE YOUR ORDER
        </Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Delivery data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
