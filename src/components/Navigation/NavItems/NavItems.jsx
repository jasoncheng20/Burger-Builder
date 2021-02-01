import React from "react";
import NaviLink from "./NaviLink";
import classes from "./NavItems.module.css";

const NavItems = () => (
    <ul className={classes.NavItems}>
        <NaviLink link="/">Burger Builder</NaviLink>
        <NaviLink link="/orders">Orders</NaviLink>
    </ul>
);

export default NavItems;
