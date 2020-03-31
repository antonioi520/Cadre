// Import required modules
import React from 'react';

// Import required components
import CheckboxJSX from './Checkbox.jsx';
import './checkbox.scss';

class Checkbox extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
  }

  /*
   * Method used to update local state based on what a user types
   */
  handleChange(event) {
    this.props.onChange(event, "record")
  }

  /*
   * Render Textbox Form Input JSX view
   */
  render() {
    return(CheckboxJSX.call(this));
  }
}

// Export Textbox Form Input
export default Checkbox;
