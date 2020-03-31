// Import required modules
import React from 'react';
import { Switch, Route } from 'react-router-native';

// Import requred components
import Viewpage from './components/Viewpage';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import UserUserForm from './components/UserUserForm';
import styles from './styles.js';

/*
 * Application Content JSX
 * Used as a router for React Native navigation
 */
var AppContentJSX = function() {
  return (
    <Switch>
      <Route
      exact path='/'
      render={routeProps => <LandingPage {...routeProps}
        viewsiteName={this.props.viewsiteName}/>} />

      <Route
      path='/login'
      render={routeProps => <Login {...routeProps}
        loggedIn={this.props.loggedIn}
        viewsiteId={this.props.viewsiteId}
        onLoginUserUser={this.handleLoginUserUser} />} />

      <Route
      path='/signup'
      render={routeProps => <UserUserForm {...routeProps}
        loggedIn={this.props.loggedIn}
        viewsiteId={this.props.viewsiteId}
        onCreateUserUser={this.handleCreateUserUser} />} />

      <Route
      path='/:viewpageId'
      render={routeProps => <Viewpage {...routeProps}
        viewsiteId={this.props.viewsiteId}
        viewpages={this.props.viewpages}
        userDatabase={this.props.userDatabase}
        userForms={this.props.userForms}
        onUpdateUserTable={this.handleUpdateUserTable} />} />
    </Switch>
  );
}

// Export the Application Content JSX
export default AppContentJSX;
