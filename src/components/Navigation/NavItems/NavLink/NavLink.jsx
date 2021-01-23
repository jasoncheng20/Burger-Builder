import React from "react";
import classes from "./NavLink.module.css";

const NavLink = (props) => (
  <li className={classes.NavLink}>
    <a href={props.link} className={props.active ? classes.current : null}>
      {props.children}
    </a>
  </li>
);

export default NavLink;
