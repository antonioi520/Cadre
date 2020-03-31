// Import required modules
import React from 'react';

/*
 * Alert to notify users of any successful operations
 * Used by ImageFormJSX
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
 * Used by ImageFormJSX
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
 * Image Form JSX view
 */
var ImageFormJSX = function() {
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
          <label htmlFor="fileUpload">
            Choose an image...

            <input
            type="file"
            className="form-control-file"
            id="fileUpload"
            name="fileUpload"
            placeholder="No file selected"
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

// Export the Image Form JSX view
export default ImageFormJSX;
