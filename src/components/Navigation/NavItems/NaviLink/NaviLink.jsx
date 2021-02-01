import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./NavLink.module.css";

const NaviLink = (props) => (
  <li className={classes.NavLink}>
    <NavLink exact to={props.link} activeClassName={classes.current}>
      {props.children}
    </NavLink>
  </li>
);

export default NaviLink;
