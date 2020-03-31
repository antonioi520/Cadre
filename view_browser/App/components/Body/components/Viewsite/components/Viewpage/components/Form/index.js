// Import required modules
import React from 'react';

// Import required components
import FormJSX from './Form.jsx';
import './form.scss';

// Import required services
import UserRecordService from './services/UserRecordService';

class Form extends React.Component {
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
   * Method that update local state based on what a use types
   */
  handleChange(event, toChange) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let changeProp = this.state[toChange];
    changeProp[name] = value;
    this.setState({
      [toChange]: changeProp
    });
  }

  /*
   * Method that controls what happens after a form has been submitted
   */
  handleSubmit(event) {
    // Prevent default form onSubmit behavior
    event.preventDefault();
    // Set HTTP call request data
    let requestData = {};
    requestData.viewsiteId = this.props.viewsiteId;
    requestData.elementId = this.props.element._id;
    requestData.record = this.state.record;
    // Send out an API call to request that a User Record be created
    this.manageUserRecordService.createUserRecord(requestData)
    .then((results) => {
      // Afterwards, clear every form field
      for(let key in requestData.record) {
        requestData.record[key] = "";
      }
      // Set state to the blank fields so that the form is now empty again
      this.setState({
        record: requestData.record
      });
      // Request the User Database again to display newly added User Record
      this.handleUpdateUserTable(results.data);
    },
    (error) => {
      // Handle errors
      console.log(error.response.data);
    });
  }

  /*
   * React component lifecycle method that is run after this component mounts
   * Used for loading Form's associated Form Inputs
   */
  componentDidMount(nextProps) {
    if(this.props.element.formInputs && this.props.element.formInputs.length >= 1) {
      this.setState({
        formInputs: this.props.element.formInputs
      });
    }
  }

  /*
   * Render Form JSX view
   */
  render() {
    return(FormJSX.call(this));
  }
}

// Export Form
export default Form;
