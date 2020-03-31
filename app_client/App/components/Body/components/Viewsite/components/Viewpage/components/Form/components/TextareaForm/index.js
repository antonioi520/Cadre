// Import required modules
import React from 'react';

// Import required components
import TextareaFormJSX from './TextareaForm.jsx';
import './textareaForm.scss';

class TextareaForm extends React.Component {
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
    this.props.onChange(event, "textarea");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("textarea");
  }

  /*
   * Render that Textbox Form JSX view
   */
  render() {
    return(TextareaFormJSX.call(this));
  }
}

// Export the Textbox Form
export default TextareaForm;
