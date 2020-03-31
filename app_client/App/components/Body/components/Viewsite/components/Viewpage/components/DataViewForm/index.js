// Import required modules
import React from 'react';

// Import required components
import DataViewFormJSX from './DataViewForm.jsx';
import './dataViewForm.scss';

class DataViewForm extends React.Component {
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
    this.props.onChange(event, "dataView");
  }

  /*
   * Method that constrols what happens after the form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit("dataView");
  }

  /*
   * Render that Data View Form JSX view
   */
  render() {
    return(DataViewFormJSX.call(this));
  }
}

// Export the Data View Form
export default DataViewForm;
