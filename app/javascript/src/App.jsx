import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter as Router} from 'react-router-dom';
import { setAuthHeaders } from "./apis/axios";
import {initializeLogger } from './common/logger'
const App = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        initializeLogger();
        setAuthHeaders(setLoading);
    }, []);

    if (loading) {
        <h1>Loading....</h1>
    }
    return(
        <Router>
            <Switch>
                <Route  path="/" exact render={() => <div>Home</div>} />
                <Route  path="/about" exact render={() => <div>About</div>} />
            </Switch>
        </Router>
    )
};

export default App;