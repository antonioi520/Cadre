// Import required modules
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import requred components
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserForm from './components/UserForm';
import Viewsite from './components/Viewsite';
import Home from './components/Home';

/*
 * Create the Body view
 * Used as a router to determine what content to display
 */
var BodyJSX = function() {
  return (
    <Switch>
      <Route
      exact path='/'
      component={Home} />

      <Route
      path='/login'
      render={routeProps => <Login {...routeProps}
        loggedIn={this.props.loggedIn}
        loginSuccess={this.props.loginSuccess}
        loginError={this.props.loginError}
        onLoginUser={this.handleLoginUser} />} />

      <Route
      path='/signup'
      render={routeProps => <UserForm {...routeProps}
        description="Sign Up"
        action="create"
        loggedIn={this.props.loggedIn}
        onSetGlobalState={this.handleSetGlobalState} />} />

      <Route
      path='/dashboard'
      render={routeProps => <Dashboard {...routeProps}
        loggedIn={this.props.loggedIn}
        user={this.props.user}
        viewsites={this.props.viewsites}
        onSetGlobalState={this.handleSetGlobalState} />} />

      <Route
      path='/:viewsiteName'
      render={routeProps => <Viewsite {...routeProps}
        loggedIn={this.props.loggedIn} />} />
    </Switch>
  );
}

// Export the view for the Body
export default BodyJSX;
