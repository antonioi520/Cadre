// Import required modules
import React from 'react';

// Import required components
import FormFormJSX from './FormForm.jsx';
import './formForm.scss';

class FormForm extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
   * Method to change state based on what a user types
   * Passed down from Viewpage
   */
  handleChange(event) {
    this.props.onChange(event, "form");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("form");
  }

  /*
   * Render that Form Form JSX view
   */
  render() {
    return(FormFormJSX.call(this));
  }
}

// Export the Form Form
export default FormForm;
