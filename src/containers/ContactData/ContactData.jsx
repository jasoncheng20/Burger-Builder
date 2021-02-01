import React, { Component } from "react";
import axios from "axios";
import classes from "./ContactData.module.css";

import Button from "../../components/UI/Button";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: "",
    },
    loading: false
  };

  orderHandler = () => {
    this.setState({loading: true})
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
        this.setState({loading: false });
      })
      .catch((error) => {
        this.setState({loading: false });
      });
  };

  render() {
    return (
      <div className={classes.ContactData}>
        <h4>Delivery data</h4>
        <form>
          <input type="text" name="name" placeholder="your name" />
        </form>
        <form>
          <input type="email" name="email" placeholder="your email" />
        </form>
        <form>
          <input type="text" name="street" placeholder="your street" />
        </form>
        <form>
          <input type="text" name="postal" placeholder="postal code" />
        </form>
        <Button btnType="Success" clicked={this.orderHandler}>
          PLACE YOUR ORDER
        </Button>
      </div>
    );
  }
}

export default ContactData;
