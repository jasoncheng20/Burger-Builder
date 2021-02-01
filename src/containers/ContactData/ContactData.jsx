import React, { Component } from "react";
import axios from "axios";
import classes from "./ContactData.module.css";

import Button from "../../components/UI/Button";
import Spinner from "../../components/UI/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      // in production ready application, this should be calculated on server end to make sure this is not manipulated
      customer: {
        name: "Jason Cheng",
        address: { street: "123 Test Avenue", zip: 92342, country: "USA" },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push('/')
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your name" />
        <input type="email" name="email" placeholder="your email" />
        <input type="text" name="street" placeholder="your street" />
        <input type="text" name="postal" placeholder="postal code" />
        <Button btnType="Success" clicked={this.orderHandler}>
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
