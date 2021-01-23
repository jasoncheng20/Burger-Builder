import React from "react";

import Logo from "../../Logo";
import NavItems from "../NavItems";
import Backdrop from "../../UI/Backdrop";
import Aux from "../../../hoc/Aux";

import classes from "./SideDrawer.module.css";

const SideDrawer = (props) => {
  
  let attachedClasses = [classes.SideDrawer, classes.Close]

  if (props.show) {attachedClasses[1] = [classes.Open]}
  
  return (
    <Aux>
      <Backdrop show={props.show} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.LogoContainer}>
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
