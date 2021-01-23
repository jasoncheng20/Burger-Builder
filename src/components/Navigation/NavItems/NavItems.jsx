import React from "react";
import NavLink from "./NavLink";
import classes from "./NavItems.module.css";

const NavItems = (props) => (
    <ul className={classes.NavItems}>
        <NavLink link="/" active>Burger Builder</NavLink>
        <NavLink link="/">Checkout</NavLink>
    </ul>
);

export default NavItems;
