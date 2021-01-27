import React, { Component } from "react";
import Layout from "./hoc/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
export default class App extends Component {
  render() {
    return (
      <Layout>
        <BurgerBuilder />
      </Layout>
    );
  }
}
