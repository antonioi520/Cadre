// Import required modules
import React from 'react';

// Import required components
import TextFormJSX from './TextForm.jsx';
import './textForm.scss';

class TextForm extends React.Component {
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
    this.props.onChange(event, "text");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("text");
  }

  /*
   * Render that Text Form JSX view
   */
  render() {
    return(TextFormJSX.call(this));
  }
}

// Export the Text Form
export default TextForm;
