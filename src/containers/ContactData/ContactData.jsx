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
      },
      address1: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 1",
        },
        value: "",
      },
      address2: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Address Line 2",
        },
        value: "",
      },
      state: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "State",
        },
        value: "",
      },
      zip: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Zip Code",
        },
        value: "",
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "---",
      },
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {}
    for (let field in this.state.orderForm){
      formData[field] = this.state.orderForm[field].value
    }
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // from form
      customerData: formData
    }
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

  inputChangedHander = (event, formfield) => {
    // create clones
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedFormField = { ...updatedOrderForm[formfield] };
    // update clones without mutating original
    updatedFormField.value = event.target.value;
    updatedOrderForm[formfield] = updatedFormField;
    //set state
    this.setState({ orderForm: updatedOrderForm });
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
          />
        ))}
        <Button btnType="Success">
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
