// Import required modules
import React from 'react';

// Import required components
import FormViewJSX from './FormView.js';

// Import required services
import UserRecordService from './services/UserRecordService';

class FormView extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Initialize service objects
    this.manageUserRecordService = new UserRecordService();

    // User Database Methods
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      formInputs: [],
      record: {}
    }
  }

  /*
   * Method that allows components to request a Viewsite's associated User Database
   * Passed down from the main Application
   */
  handleUpdateUserTable(updatedTable) {
    this.props.onUpdateUserTable(updatedTable);
  }

  /*
   * Update state to reflect what a user types
   */
  handleChange(formInputValue, formInputId) {
    let record = this.state.record;
    record[formInputId] = formInputValue;
    this.setState({
      record: record
    });
  }

  /*
   * Method used to control what happens when a form is submitted
   */
  handleSubmit(event) {
    // Prevent Default form onSubmit behavior
    event.preventDefault();
    // Set HTTP call request data
    let requestData = {};
    requestData.viewsiteId = this.props.viewsiteId;
    requestData.elementId = this.props.element._id;
    requestData.record = this.state.record;
    // Make a call to create a new User Record
    this.manageUserRecordService.createUserRecord(requestData)
    .then((results) => {
      // Afterwards, clear every field in the form
      for(let key in requestData.record) {
        requestData.record[key] = "";
      }
      // Set state to clear the form
      this.setState({
        record: requestData.record
      });
      // Request an updated User Database to display the new User Record
      this.handleUpdateUserTable(results.data);
    }, (error) => {
      // Handle errors
      console.log(error.response.data);
    });
  }

  /*
   * React component lifecycle method that controls what happens after this
   * component mounts
   * Used to define Form Inputs owned by this Form
   */
  componentDidMount() {
    if(this.props.element.formInputs && this.props.element.formInputs.length >= 1) {
      this.setState({
        formInputs: this.props.element.formInputs
      });
    }
  }

  /*
   * Render Form View JSX view
   */
  render() {
    return(FormViewJSX.call(this));
  }
}

// Export Form View JSX view
export default FormView;
