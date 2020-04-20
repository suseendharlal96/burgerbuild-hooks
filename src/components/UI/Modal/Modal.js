import React from "react";

import classes from "./Modal.css";
import Auxi from "../../../hoc/Auxilary";
import Backdrop from "../../Backdrop/Backdrop";

const Modal = (props) => {
  return (
    <Auxi>
      <Backdrop show={props.show} click={props.closeModal} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? "translateY(0)" : "translateY(-100vh)",
          opacity: props.show ? "1" : "0",
        }}
      >
        {props.children}
      </div>
    </Auxi>
  );
};

export default Modal;
