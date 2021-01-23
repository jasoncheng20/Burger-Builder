import React, { Component } from "react";
import Aux from "../Aux";
import Navbar from "../../components/Navigation/Navbar";
import SideDrawer from "../../components/Navigation/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }

  sideDrawerOpenHandler = () => {
    this.setState({showSideDrawer: true})
  }

  render() {
    return (
      <Aux>
        <SideDrawer show={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
        <Navbar openSideDrawer={this.sideDrawerOpenHandler}/>
        <main className={classes.Content}>
          <p>{this.props.children}</p>
        </main>
      </Aux>
    );
  }
}

export default Layout;
