import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary";
import ContactData from "../ContactData";

const Checkout = (props) => {
  const checkoutCancelled = () => {
    props.history.goBack();
  };

  const checkoutContinued = () => {
    props.history.replace("/checkout/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ingred) {
    const purchasedRedirect = props.purchased && <Redirect to="/" />;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingred}
          checkoutCancelled={checkoutCancelled}
          checkoutContinued={checkoutContinued}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => ({
  ingred: state.burgerBuilder.ingredients,
  purchased: state.order.purchased,
});

export default connect(mapStateToProps)(Checkout);
