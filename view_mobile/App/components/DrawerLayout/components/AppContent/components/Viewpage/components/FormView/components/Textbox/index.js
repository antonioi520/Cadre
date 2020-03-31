// Import required modules
import React from 'react';

// Import required components
import TextboxJSX from './Textbox.js';

class Textbox extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
  }

  /*
   * Update state to reflect what a user types
   */
  handleChange(formInputValue) {
    this.props.onChange(formInputValue, this.props.formInput._id)
  }

  /*
   * Render Textbox JSX view
   */
  render() {
    return(TextboxJSX.call(this));
  }
}

// Export Textbox
export default Textbox;
