import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";

const INGREDIENT_PRICES = {
  bacon: 0.5,
  lettuce: 0.1,
  cheese: 0.25,
  meat: 1,
};

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      bacon: 0,
      lettuce: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 2,
    purchaseable: false,
    purchasing: false,
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el);
    this.setState({ purchaseable: sum > 0 });
  };

  addIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = this.state.ingredients[type] + 1;
    const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const updatedIngredients = { ...this.state.ingredients };
    if (this.state.ingredients[type] === 0) return;
    updatedIngredients[type] = this.state.ingredients[type] - 1;
    const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: updatedPrice,
    });
    this.updatePurchaseState(updatedIngredients);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    alert('Continue');
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
            cancel={this.purchaseCancelHandler}
            success={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          more={this.addIngredientHandler}
          less={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchaseable={this.state.purchaseable}
          purchasing={this.purchaseHandler}
        />
      </Aux>
    );
  }
}
