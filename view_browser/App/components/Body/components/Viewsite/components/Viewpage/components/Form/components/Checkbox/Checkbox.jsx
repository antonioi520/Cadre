// Import required modules
import React  from 'react';

/*
 * Textbox Form Input JSX view
 */
var CheckboxJSX = function() {
  return (
    <div className="form-group">
      <label htmlFor={this.props.formInput._id}>
        {this.props.formInput.checkboxLabel}

        <input
        type="checkbox"
        className="form-control"
        id={this.props.formInput._id}
        name={this.props.formInput._id}
        value={this.props.formInputValue}
        onChange={this.handleChange} />
      </label>
    </div>
  );
}

// Export Textbox Form Input JSX view
export default CheckboxJSX;
