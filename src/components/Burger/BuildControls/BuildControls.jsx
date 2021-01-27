import React from "react";

import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl";

const controls = [
  { label: "Bacon", type: "bacon" },
  { label: "Lettuce", type: "lettuce" },
  { label: "Onion", type: "onion" },
  { label: "Tomato", type: "tomato" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const BuildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        more={() => props.more(ctrl.type)}
        less={() => props.less(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.purchasing}
    >
      View my order
    </button>
  </div>
);

export default BuildControls;
