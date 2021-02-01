import React from "react";
import Burger from "../../Burger";
import Button from "../../UI/Button"
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => (
  <div className={classes.CheckoutSummary}>
    <h1>Happy eating!</h1>
    <div style={{ width: "100%", margin: "auto" }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <Button btnType="Danger" clicked={props.checkoutCancelled}>Cancel</Button>
    <Button btnType="Success" clicked={props.checkoutContinued}>Continue</Button>
  </div>
);

export default CheckoutSummary;