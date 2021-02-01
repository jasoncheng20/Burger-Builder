import React from "react";
import { Link } from "react-router-dom";
import burgerLogo from "../../assets/images/burger-logo.png";
import classes from "./Logo.module.css";

const Logo = () => (
  <Link to="/">
    <div className={classes.Logo}>
      <img src={burgerLogo} alt="Burger Logo" />
    </div>
  </Link>
);

export default Logo;
