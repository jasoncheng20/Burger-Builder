import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  ingredients: null,
  price: 2,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  bacon: 0.5,
  lettuce: 0.1,
  onion: 0.1,
  tomato: 0.1,
  cheese: 0.25,
  meat: 1,
};

const addIngredient = (state, action) => {
  const updatedIngredient = {
    [action.topping]: state.ingredients[action.topping] + 1,
  };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    price: state.price + INGREDIENT_PRICES[action.topping],
    building: true,
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state, action) => {
  const updatedIng = {
    [action.topping]: state.ingredients[action.topping] - 1,
  };
  const updatedIngs = updateObject(state.ingredients, updatedIng);
  const updatedSt = {
    ingredients: updatedIngs,
    price: state.price - INGREDIENT_PRICES[action.topping],
    building: true,
  };
  return updateObject(state, updatedSt);
};

const setIngredients = (state, action) => {
  return updateObject(state, {
    ingredients: action.ingredients,
    error: false,
    price: 2,
    building: false,
  });
};

const errorHandler = (state) => {
  return updateObject(state, { error: true });
};

export const burgerBuilderReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.ERROR_HANDLER:
      return errorHandler(state);
    default:
      return state;
  }
};
