// Import required modules
import React from 'react';

// Import required components
import ImageFormJSX from './ImageForm.jsx';
import './imageForm.scss';

class ImageForm extends React.Component {
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
    this.props.onChange(event, "image");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("image");
  }

  /*
   * Render that Image Form JSX view
   */
  render() {
    return(ImageFormJSX.call(this));
  }
}

// Export the Image Form
export default ImageForm;
