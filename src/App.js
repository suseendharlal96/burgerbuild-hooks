import React, { Suspense } from "react";
import { Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import Burgerbuild from "./containers/BurgerBuild/BurgerBuild";
import Logout from "./containers/Auth/logout/logout";

const LazyCheckout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});

const LazyOrders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const LazySuccess = React.lazy(() => {
  return import("./components/UI/SuccessPage/SuccessPage");
});

const LazyAuth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const app = (props) => {
  return (
    <Layout>
      <Suspense fallback={<p>Loading...</p>}>
        <Route path="/" exact component={Burgerbuild} />
        <Route path="/auth" render={(props) => <LazyAuth {...props} />} />
        <Route path="/orders" render={(props) => <LazyOrders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route
          path="/checkout"
          render={(props) => <LazyCheckout {...props} />}
        />
        <Route path="/success" render={(props) => <LazySuccess {...props} />} />
      </Suspense>
    </Layout>
  );
};
export default app;
