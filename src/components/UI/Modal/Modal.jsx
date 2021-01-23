import React from "react";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop";
import Aux from "../../../hoc/Aux";

const Modal = (props) => (
  <Aux>
    <Backdrop show={props.show} clicked={props.closeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Aux>
);

const displayChange = (prevProps, nextProps) => {
  return nextProps.show === prevProps.show;
};

export default React.memo(Modal, displayChange);
