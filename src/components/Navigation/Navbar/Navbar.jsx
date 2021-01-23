import React from "react";
import Logo from "../../Logo";
import NavItems from "../NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle"
import classes from "./Navbar.module.css";

const Navbar = (props) => (
  <header className={classes.Navbar}>
    <DrawerToggle clicked={props.openSideDrawer}/>
    <div className={classes.LogoContainer}>
      <Logo />
    </div>
    <nav className = {classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default Navbar;
