import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger";
import BuildControls from "../../components/Burger/BuildControls";
import Modal from "../../components/UI/Modal";
import OrderSummary from "../../components/Burger/OrderSummary";
import Spinner from "../../components/UI/Spinner";
import * as actions from "../../store/actions/";
import withErrorHandler from "../../hoc/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    purchasing: false,
    loading: false,
  };

  componentDidMount() {
    this.props.fetchIngredients();
  }

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el);
    return sum > 0;
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase()
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = { ...this.props.ingred };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded!</p>
    ) : (
      <Spinner />
    );
    if (this.props.ingred) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingred} />
          <BuildControls
            more={this.props.addIngredient}
            less={this.props.removeIngredient}
            disabled={disabledInfo}
            price={this.props.totalPrice}
            purchaseable={this.updatePurchaseState(this.props.ingred)}
            purchasing={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingred}
          price={this.props.totalPrice}
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

const mapStateToProps = (state) => ({
  ingred: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.price,
  error: state.burgerBuilder.error,
});

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (topping) => dispatch(actions.addIngredient(topping)),
    removeIngredient: (topping) => dispatch(actions.removeIngredient(topping)),
    fetchIngredients: () => dispatch(actions.initIngredients()),
    onInitPurchase: () => dispatch(actions.purchaseInit()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
