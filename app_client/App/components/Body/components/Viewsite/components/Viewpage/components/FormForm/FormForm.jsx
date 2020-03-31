// Import required modules
import React from 'react';

/*
 * Alert to notify users of any successful operations
 * Used by FormFormJSX
 */
var SuccessAlert = function(props) {
  if(props.elementSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        {props.elementSuccess}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Alert to notify users of any unsuccessful operations
 * Used by FormFormJSX
 */
var ErrorAlert = function(props) {
  if(props.elementError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.elementError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Form Form JSX view
 */
var FormFormJSX = function() {
  return (
    <div className="container-fluid">
      <h2>
        {this.props.description}
      </h2>

      <SuccessAlert
      elementSuccess={this.props.elementSuccess} />

      <ErrorAlert
      elementError={this.props.elementError} />

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="formTitle">
            Form Title

            <input
            type="text"
            name="formTitle"
            className="form-control"
            id="formTitle"
            placeholder="Enter Form Title"
            value={this.props.form.formTitle}
            onChange={this.handleChange} />
          </label>
        </div>

        <button type="submit" className="btn btn-primary">
          {this.props.description}
        </button>
      </form>
    </div>
  );
}

// Export the Form Form JSX view
export default FormFormJSX;
