import React from "react";
import { connect } from "react-redux";

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.css";
import Backdrop from "../../Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }
  let user = null;
  if (props.email) {
    user = <span style={{ color: "brown" }}> {"Welcome " + props.email}</span>;
  }
  return (
    <div>
      <Backdrop show={props.open} click={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        {user}
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth} />
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.authReducer.email,
  };
};

export default connect(mapStateToProps)(sideDrawer);
