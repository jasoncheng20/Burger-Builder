import React, { Component } from "react";
import { connect } from "react-redux";
import Aux from "../Aux";
import Navbar from "../../components/Navigation/Navbar";
import SideDrawer from "../../components/Navigation/SideDrawer";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  };

  render() {
    return (
      <Aux>
        <SideDrawer
          show={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuthenticated}
        />
        <Navbar
          openSideDrawer={this.sideDrawerOpenHandler}
          isAuth={this.props.isAuthenticated}
        />
        <main className={classes.Content}>
          <p>{this.props.children}</p>
        </main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
