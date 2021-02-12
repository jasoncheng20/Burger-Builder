import React, { useEffect, useState } from "react";
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

const BurgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(props.fetchIngredients, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((key) => ingredients[key])
      .reduce((sum, el) => sum + el);
    return sum > 0;
  };

  const purchaseHandler = () => {
    setPurchasing(true);
  };

  const purchaseCancelHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  const disabledInfo = { ...props.ingred };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;
  let burger = props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
  if (props.ingred) {
    burger = (
      <Aux>
        <Burger ingredients={props.ingred} />
        <BuildControls
          more={props.addIngredient}
          less={props.removeIngredient}
          disabled={disabledInfo}
          price={props.totalPrice}
          purchaseable={updatePurchaseState(props.ingred)}
          purchasing={purchaseHandler}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={props.ingred}
        price={props.totalPrice}
        cancel={purchaseCancelHandler}
        success={purchaseContinueHandler}
      />
    );
    if (props.loading) {
      orderSummary = <Spinner />;
    }
  }
  return (
    <Aux>
      <Modal show={purchasing} closeModal={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};

const mapStateToProps = (state) => ({
  ingred: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.price,
  error: state.burgerBuilder.error,
  loading: state.order.loading,
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
