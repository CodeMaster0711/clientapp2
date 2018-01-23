
/* tslint:disable */ import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { getSession } from './reducers/authentication';

// Styles
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.scss';
// Temp fix for reactstrap
import './scss/core/_dropdown-menu-right.scss'

import '!file-loader?name=[name].[ext]!./img/favicon.ico';


import LoginPage from './modules/admin/views/Pages/Login/LoginPage';
import RegisterPage from './modules/admin/views/Pages/Register/Register';
import Page404 from './modules/admin/views/Pages/Page404/Page404';
import Page500 from './modules/admin/views/Pages/Page500/Page500';
import PaymentDeclined from './modules/admin/views/Pages/PaymentDeclined/PaymentDeclined';
import Full from "./modules/admin/containers/Full/Full";
import PrivateRoute from './shared/layout/private-route/private-route';
import SocialAuthQueryString from './modules/login/social-auth-query-param';
import Autocomplete from "./modules/admin/containers/Autocomplete/Autocomplete";

export interface IAppProps {
  location: any;
  isAuthenticated?: boolean;
  getSession: Function;
  logout: Function;
  getSystemProperties: Function;
  routes: any;
}

export class App extends React.Component<IAppProps, {}> {

  componentDidMount() {
    this.props.getSession();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/social-auth-query-param" component={SocialAuthQueryString}/>
          <Route exact path="/register" component={RegisterPage}/>
          <Route exact path="/404" component={Page404}/>
          <Route exact path="/500" component={Page500}/>
          <Route exact path="/payment-declined" component={PaymentDeclined}/>
          <PrivateRoute path="/" component={Autocomplete}/>
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = storeState => ({
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

export default connect(mapStateToProps, mapDispatchToProps)(App);
