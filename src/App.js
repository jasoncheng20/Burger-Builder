import React, { Component } from "react";
import Layout from "./hoc/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Route exact path="/" component={BurgerBuilder}/>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
        </Layout>
      </BrowserRouter>
    );
  }
}
