import React, { useState } from "react";
import { connect } from "react-redux";

import classes from "./Layout.css";
import Auxi from "../../hoc/Auxilary";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const layout = (props) => {
  const [showSideDrawer, setshowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    setshowSideDrawer(false);
  };

  const sidebarToggleHandler = () => {
    setshowSideDrawer(!showSideDrawer);
  };
  return (
    <Auxi>
      <Toolbar
        isAuth={props.isAuth}
        drawerToggleClicked={sidebarToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuth}
        open={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>{props.children}</main>
    </Auxi>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.idToken !== null,
  };
};

export default connect(mapStateToProps)(layout);
