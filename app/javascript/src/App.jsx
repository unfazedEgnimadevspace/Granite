import React, { useEffect, useState } from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";

import Dashboard from "components/Dashboard";
import PageLoader from "components/PageLoader";
import CreateTask from "components/Tasks/Create";

import { setAuthHeaders } from "./apis/axios";
import { initializeLogger } from "./common/logger";

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
        <Route exact path="/dashboard" render={() => <Dashboard />} />
        <Route exact path="/tasks/create" render={() => <CreateTask />} />
      </Switch>
    </Router>
  );
};

export default App;
