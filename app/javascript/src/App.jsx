import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import { setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";
import DashBoard from "./components/Dashboard";
import PageLoader from "./components/PageLoader";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeLogger();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    <div className="h-screen">
      <PageLoader />
    </div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <div>Home</div>} />
        <Route exact path="/about" render={() => <div>About</div>} />
        <Route exact path="/dashboard" render={() => <DashBoard />} />
      </Switch>
    </Router>
  );
};

export default App;
