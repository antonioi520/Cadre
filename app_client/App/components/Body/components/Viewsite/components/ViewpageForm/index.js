// Import required modules
import React from 'react';

// Import required components
import ViewpageFormJSX from './ViewpageForm.jsx';
import './viewpageForm.scss';


class ViewpageForm extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
   * Method used to update state based on what a User types
   * State and method passed down from Viewsite
   */
  handleChange(event) {
    this.props.onChange(event, "viewpage");
  }

  /*
   * Method used to control what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  // Render the view for the Viewpage form
  render() {
    return(ViewpageFormJSX.call(this));
  }
}

// Export the Viewpage form
export default ViewpageForm;
