import React, { useContext, Fragment } from 'react';
import './App.css';
import Loadable from 'react-loadable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/home'
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from './components/login'
import { store } from './common/store.js';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const Page404 = Loadable({ loader: () => import('./views/Page404'), loading });

const Page500 = Loadable({  loader: () => import('./views/Page500'), loading });


function PrivateRoute({ children, ...rest }) {
  const globalState = useContext(store).state;
  return (
    <Route
      {...rest}
      render={({ location }) =>
        globalState.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

function App () {
  return (
      <Fragment>

          <ToastContainer />
            <Router>
              <Switch>
                <Route exact path="/login" name="Login Page" component={Login} />
                <PrivateRoute path="/">
                  <Home />
                </PrivateRoute>
                <Route exact path="/404" name="Page 404" component={Page404} />
                <Route exact path="/500" name="Page 500" component={Page500} />
              </Switch>
          </Router>

    </Fragment>  
  )
}

export default App;
