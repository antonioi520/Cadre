// Import required modules
import React from 'react';
import { FormErrors } from './FormErrors';
/*
 * Alert that notifies the User of any unsuccessful operations
 * Used by UserFormJSX
 */
var ErrorAlert = function(props) {
  if(props.userError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.userError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Alert that notifies the User of any successful operations
 * Used by UserFormJSX
 */
var SuccessAlert = function(props) {
  if(props.userSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        {props.userSuccess}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * User Form JSX view
 */
var UserFormJSX = function() {
  return (
    <div
      className={
        this.props.action === "create" ? "container" : "container-fluid"
      }>

      {this.props.action === "create" ? <br /> : null}

      <h2>
        {this.props.description}
      </h2>

      <SuccessAlert
      userSuccess={this.state.userSuccess} />

      <ErrorAlert
      userError={this.state.userError} />
        <div className="panel panel-default">
            <FormErrors formErrors={this.state.formErrors} />
        </div>
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
            value={this.state.username}
            onChange={this.handleUserInput} />
          </label>
        </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
              <label htmlFor="email">
                  Email Address

                  <input
                      name="email"
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter Email"
                      value={this.state.email}
                      onChange={this.handleUserInput} />
              </label>
          </div>


        <div className={`form-group ${this.errorClass(this.state.formErrors.password)}`}>
          <label htmlFor="password">
            Password

            <input
            name="password"
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Password"
            value={this.state.password}
            onChange={this.handleUserInput} />
          </label>
        </div>

          <div className={`form-group ${this.errorClass(this.state.formErrors.confirmPassword)}`}>
              <label htmlFor="confirmPassword">
                  Confirm Password

                  <input
                      name="confirmPassword"
                      type="password"
                      className="form-control"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={this.state.confirmPassword}
                      onChange={this.handleUserInput} />
              </label>
          </div>

        <button type="submit" className="btn btn-primary">
          {this.props.description}
        </button>
      </form>
    </div>
  );
}

// Export the User Form view
export default UserFormJSX;
