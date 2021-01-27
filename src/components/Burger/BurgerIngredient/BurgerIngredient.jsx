import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const BurgerIngredient = (props) => {
  let ingredient = null;
  switch (props.type) {
    case "bottom-bun":
      ingredient = <div className={classes.BottomBun}></div>;
      break;
    case "top-bun":
      ingredient = (
        <div className={classes.TopBun}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      );
      break;
    case "bacon":
      ingredient = <div className={classes.Bacon}></div>;
      break;
    case "lettuce":
      ingredient = <div className={classes.Lettuce}></div>;
      break;
    case "tomato":
      ingredient = <div className={classes.Tomato}></div>;
      break;
    case "onion":
      ingredient = <div className={classes.Onion}></div>;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;
    default:
      ingredient = null;
  }
  return ingredient;
};

BurgerIngredient.propTypes = {
  type: PropTypes.string.isRequired,
};

export default BurgerIngredient;
