// Import required modules
import React from 'react';

// Import required components
import NumberFormJSX from './NumberForm.jsx';
import './numberForm.scss';

class NumberForm extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
   * Method to change state based on what a user types
   * Passed down from Form
   */
  handleChange(event) {
    this.props.onChange(event, "number");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("number");
  }

  /*
   * Render that Textbox Form JSX view
   */
  render() {
    return(NumberFormJSX.call(this));
  }
}

// Export the Textbox Form
export default NumberForm;
