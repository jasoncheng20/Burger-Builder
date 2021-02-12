import React from "react";
import NaviLink from "./NaviLink";
import classes from "./NavItems.module.css";

const NavItems = (props) => (
  <ul className={classes.NavItems}>
    <NaviLink link="/">Burger Builder</NaviLink>

    {props.isAuth && <NaviLink link="/orders">My Orders</NaviLink>}
    {!props.isAuth ? (
      <NaviLink link="/auth">Sign In</NaviLink>
    ) : (
      <NaviLink link="/logout">Log Out</NaviLink>
    )}
  </ul>
);

export default NavItems;
