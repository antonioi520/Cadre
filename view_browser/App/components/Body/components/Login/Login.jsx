// Import required modules
import React from 'react';

/*
 * Alert that notifies the User of any unsuccessful operations
 * Used by LoginJSX
 */
var ErrorAlert = function(props) {
  if(props.loginError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.loginError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * View for the Login form
 */
var LoginJSX = function() {
  return (
    <div className="container">
      <br />

      <h2>
        Login
      </h2>

      <ErrorAlert
      loginError={this.props.loginError} />

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            Username

            <input
            name="username"
            type="text"
            className="form-control"
            id="username"
            placeholder="Enter Username"
            value={this.state.loginCredentials.username}
            onChange={this.handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="password">
            Password

            <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={this.state.loginCredentials.password}
            onChange={this.handleChange} />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

// Export the Login form view
export default LoginJSX;
