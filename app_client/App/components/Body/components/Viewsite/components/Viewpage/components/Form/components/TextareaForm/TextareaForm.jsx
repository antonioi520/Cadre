// Import required modules
import React from 'react';

/*
 * Alert to notify users of any successful operations
 * Used by TextboxFormJSX
 */
var SuccessAlert = function(props) {
  if(props.formInputSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        {props.formInputSuccess}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Alert to notify users of any unsuccessful operations
 * Used by TextboxFormJSX
 */
var ErrorAlert = function(props) {
  if(props.formInputError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.formInputError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Textbox Form JSX view
 */
var TextareaFormJSX = function() {
  return (
    <div className="container-fluid">

      <h2>
        {this.props.description}
      </h2>

      <SuccessAlert
      formInputSuccess={this.props.formInputSuccess} />

      <ErrorAlert
      formInputError={this.props.formInputError} />

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="textareaLabel">
            Textarea Label

            <input
            type="text"
            name="textareaLabel"
            className="form-control"
            id="textareaLabel"
            placeholder="Enter Textarea Label"
            value={this.props.textbox.textareaLabel}
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

// Export the Textbox Form JSX view
export default TextareaFormJSX;
