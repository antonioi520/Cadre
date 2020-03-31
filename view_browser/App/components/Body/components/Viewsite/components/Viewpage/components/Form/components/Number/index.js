// Import required modules
import React from 'react';

// Import required components
import NumberJSX from './Number.jsx';
import './number.scss';

class Number extends React.Component {
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
    return(NumberJSX.call(this));
  }
}

// Export Textbox Form Input
export default Number;
