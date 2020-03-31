// Import required modules
import React from 'react';

// Import required components
import ViewsiteFormJSX from './ViewsiteForm.jsx';
import './viewsiteForm.scss';

class ViewsiteForm extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*
   * Method used to change local state according to what the user is typing
   * Passed down from the Dashboard
   */
  handleChange(event) {
    this.props.onChange(event, "viewsite");
  }

  /*
   * Method used to control what happens after a form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit();
  }

  /*
   * Render the Viewsite Form JSX
   */
  render() {
    return(ViewsiteFormJSX.call(this));
  }
}

// Export the Viewsite Form
export default ViewsiteForm;
