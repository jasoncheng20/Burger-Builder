import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import WithErrorHandler from "../../hoc/withErrorHandler";
import axios from "axios";

const INGREDIENT_PRICES = {
  bacon: 0.5,
  lettuce: 0.1,
  onion: 0.1,
  tomato: 0.1,
  cheese: 0.25,
  meat: 1,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 2,
    purchaseable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => {
        this.setState({ ingredients: response.data });
      })
      .catch((error) => this.setState({ error }));
  }

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
    this.setState({ loading: true });
    // alert("Continue");
    const order = {
      ingredients: this.state.ingredients,
      // in production ready application, this should be calculated on server end to make sure this is not manipulated
      price: this.state.totalPrice,
      customer: {
        name: "Jason Cheng",
        address: { street: "123 Test Avenue", zip: 92342, country: "USA" },
        email: "test@test.com",
      },
      deliveryMethod: "fastest",
    };
    axios
      .post("/orders", order)
      .then((response) => {
        this.setState({ purchasing: false, loading: false });
      })
      .catch((error) => {
        this.setState({ purchasing: false, loading: false });
      });
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error? <p>Ingredients can't be loaded!</p>: <Spinner />;
    if (this.state.ingredients) {
      burger = (
        <Aux>
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
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ingredients}
          price={this.state.totalPrice}
          cancel={this.purchaseCancelHandler}
          success={this.purchaseContinueHandler}
        />
      );
      if (this.state.loading) {
        orderSummary = <Spinner />;
      }
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          closeModal={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

export default WithErrorHandler(BurgerBuilder, axios);
