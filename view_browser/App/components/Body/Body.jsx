// Import required modules
import React from 'react';
import { Switch, Route } from 'react-router-dom';

// Import requred components
import ViewsiteChoose from './components/ViewsiteChoose';
import Viewsite from './components/Viewsite';
import Login from './components/Login';
import UserUserForm from './components/UserUserForm';

/*
 * Body JSX view
 * Used as a React SPA router
 */
var BodyJSX = function() {
  return (
    <Switch>
      <Route
      path='/login'
      render={routeProps => <Login {...routeProps}
        viewsite={this.props.viewsite}
        loggedIn={this.props.loggedIn}
        loginSuccess={this.props.loginSuccess}
        loginError={this.props.loginError}
        onSubmit={this.handleLoginUserUser} />} />

      <Route
      path='/signup'
      render={routeProps => <UserUserForm {...routeProps}
        description="Sign Up"
        action="create"
        viewsite={this.props.viewsite}
        loggedIn={this.props.loggedIn}
        userUserSuccess={this.props.userUserSuccess}
        userUserError={this.props.userUserError}
        onSubmit={this.handleCreateUserUser} />} />

      <Route
      exact path='/viewsites'
      render={routeProps => <ViewsiteChoose {...routeProps}
        viewsite={this.props.viewsite}
        viewsiteRequestError={this.props.viewsiteRequestError}
        onRequestViewsite={this.handleRequestViewsite} />} />

      <Route
      path='/viewsites/:viewsiteName'
      render={routeProps => <Viewsite {...routeProps}
        viewsite={this.props.viewsite}
        userDatabase={this.props.userDatabase}
        userForms={this.props.userForms}
        onUpdateUserTable={this.handleUpdateUserTable} />} />
    </Switch>
  );
}

// Export the Body JSX view
export default BodyJSX;
