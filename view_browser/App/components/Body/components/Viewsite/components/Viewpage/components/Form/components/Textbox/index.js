// Import required modules
import React from 'react';

// Import required components
import TextboxJSX from './Textbox.jsx';
import './textbox.scss';

class Textbox extends React.Component {
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
    return(TextboxJSX.call(this));
  }
}

// Export Textbox Form Input
export default Textbox;
