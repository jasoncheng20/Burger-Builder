import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (topping) => ({
  type: actionTypes.ADD_INGREDIENT,
  topping: topping,
});

export const removeIngredient = (topping) => ({
  type: actionTypes.REMOVE_INGREDIENT,
  topping: topping,
});

export const setIngredients = (ingredients) => ({
  type: actionTypes.SET_INGREDIENTS,
  ingredients: ingredients
});

export const errorHandler = () => ({
  type: actionTypes.ERROR_HANDLER,
//   error: e,
});

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch((error) => dispatch(errorHandler()));
  };
};
