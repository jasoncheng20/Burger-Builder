import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient";

const Burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => arr.concat(el), []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Build your burger!</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="top-bun" />
      {transformedIngredients}
      <BurgerIngredient type="bottom-bun" />
    </div>
  );
};

export default Burger;
