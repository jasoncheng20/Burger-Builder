import React, { Component } from "react";
import { Route } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "../ContactData";

class Checkout extends Component {
  state = {
    ingredients: {},
    price: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    let ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price") {
        this.setState({ price: +param[1] });
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients });
  }

  checkoutCancelled = () => {
    this.props.history.goBack();
  };

  checkoutContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelled}
          checkoutContinued={this.checkoutContinued}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.price}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
