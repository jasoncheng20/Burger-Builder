import { ADD_INGREDIENT, DELETE_INGREDIENT } from "./actions";

const initialState = {
  ingredients: {
    bacon: 0,
    lettuce: 0,
    onion: 0,
    tomato: 0,
    cheese: 0,
    meat: 0,
  },
  price: 2,
};

const INGREDIENT_PRICES = {
  bacon: 0.5,
  lettuce: 0.1,
  onion: 0.1,
  tomato: 0.1,
  cheese: 0.25,
  meat: 1,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      const updatedIngredients = { ...state.ingredients };
      updatedIngredients[action.topping] =
        state.ingredients[action.topping] + 1;
      return {
        ...state,
        ingredients: updatedIngredients,
        price: state.price + INGREDIENT_PRICES[action.topping],
      };
    case DELETE_INGREDIENT:
      const subtractedIngredients = { ...state.ingredients };
      if (state.ingredients[action.topping] === 0) return state;
      subtractedIngredients[action.topping] =
        state.ingredients[action.topping] - 1;
      return {
        ...state,
        ingredients: subtractedIngredients,
        price: state.price - INGREDIENT_PRICES[action.topping],
      };
    default:
      return state;
  }
};
