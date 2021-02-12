import React from "react";
import Layout from "./hoc/Layout";
import { BrowserRouter, Route } from "react-router-dom";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout";
import Orders from "./containers/Orders";
import Theme from "./containers/Theme/Theme";
import Auth from "./containers/Auth";
import Logout from "./containers/Auth/Logout";

const App = () => (
  <BrowserRouter>
    <Layout>
      <Route exact path="/" component={BurgerBuilder} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/orders" component={Orders} />
      <Route path="/theme" component={Theme} />
      <Route path="/auth" component={Auth} />
      <Route path="/logout" component={Logout} />
    </Layout>
  </BrowserRouter>
);

export default App;
