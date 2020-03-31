// Import required modules
import React from 'react';

// Import required components
import FormJSX from './Form.jsx';
import './form.scss';

// Import required services
import FormInputService from './services/FormInputService';

class Form extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Services
    this.manageFormInputService = new FormInputService();

    // Form Text Input Methods
    this.handleCreateFormInput = this.handleCreateFormInput.bind(this);
    this.handleEditFormInput = this.handleEditFormInput.bind(this);
    this.handleUpdateFormInput = this.handleUpdateFormInput.bind(this);
    this.handleDeleteFormInput = this.handleDeleteFormInput.bind(this);
    // Other Methods
    this.handleHideAllForms = this.handleHideAllForms.bind(this);
    this.handleSetGlobalState = this.handleSetGlobalState.bind(this);
    this.handleClearLocalState = this.handleClearLocalState.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Set initial state
    this.state = {
      viewsiteId: "",
      viewpageId: "",
      element: {},
      textbox: {
        _id: "",
        kind: "textbox",
        textboxLabel: ""
      },
      number: {
        _id: "",
        kind: "number",
        numberLabel: ""
      },
      textarea: {
        _id: "",
        kind: "textarea",
        textareaLabel: ""
      },
      checkbox: {
        _id: "",
        kind: "checkbox",
        checkboxLabel: ""
      },
      formInputSuccess: "",
      formInputError: ""
    };
  }

  /*
   * Method that allows users to create Form Inputs
   */
  handleCreateFormInput(kind) {
    // Prepare HTTP API request data
    let requestData = {};
    requestData.viewsiteId = this.state.viewsiteId;
    requestData.viewpageId = this.state.viewpageId;
    requestData.elementId = this.state.element._id;
    requestData.kind = kind;
    // Continue preparing HTTP API request data based on Form Input kind
    if(kind === "textbox") {
      let createTextbox = this.state.textbox;
      requestData.textboxLabel = createTextbox.textboxLabel;
      $(".createTextbox").hide("medium");
    }
    else if(kind === "number"){
      let createNumber = this.state.number;
      requestData.numberLabel = createNumber.numberLabel;
      $(".createNumber").hide("medium");
    }
    else if(kind === "textarea"){
          let createTextarea = this.state.textarea;
          requestData.textareaLabel = createTextarea.textareaLabel;
          $(".createTextarea").hide("medium");
      }
    else if(kind === "checkbox"){
        let createCheckbox = this.state.checkbox;
        requestData.checkboxLabel = createCheckbox.checkboxLabel;
        $(".createCheckbox").hide("medium");
    }
    // Send request to create a new Form Input
    this.manageFormInputService.createFormInput(requestData)
    .then((results) => {
      // Afterwards, update Global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
      // Follow up by clearing form state
      this.handleClearLocalState();
    },
    (error) => {
      // Handle errors
      this.setState({
        formInputSuccess: "",
        formInputError: error.response.data
      });
    });
  }

  /*
   * Method that sets local state to prepare a Form Input to be edited
   */
  handleEditFormInput(event) {
    // Prepare form for update based on Form Input kind
    if(event.kind === "textbox") {
      // Set state of the Textbox form to selected Textbox
      let editTextbox = this.state.textbox;
      editTextbox._id = event._id;
      editTextbox.kind = event.kind;
      editTextbox.textboxLabel = event.textboxLabel;
      this.setState({
        textbox: editTextbox
      });
      // Show the update Textbox form with populated local state information
      let isVisible = $(".updateTextbox").is(':visible');
      this.handleHideAllForms(".updateTextbox", isVisible);
      //$(".updateTextbox").toggle("medium");
    }
    else if(event.kind === "number") {
          // Set state of the Textbox form to selected Textbox
          let editNumber = this.state.number;
          editNumber._id = event._id;
          editNumber.kind = event.kind;
          editNumber.numberLabel = event.numberLabel;
          this.setState({
              number: editNumber
          });
          // Show the update Textbox form with populated local state information
          let isVisible = $(".updateNumber").is(':visible');
          this.handleHideAllForms(".updateNumber", isVisible);
          //$(".updateTextbox").toggle("medium");
      }
    else if(event.kind === "textarea") {
          // Set state of the Textbox form to selected Textbox
          let editTextarea = this.state.textarea;
          editTextarea._id = event._id;
          editTextarea.kind = event.kind;
          editTextarea.numberLabel = event.textareaLabel;
          this.setState({
              textarea: editTextarea
          });
          // Show the update Textbox form with populated local state information
          let isVisible = $(".updateTextarea").is(':visible');
          this.handleHideAllForms(".updateTextarea", isVisible);
          //$(".updateTextbox").toggle("medium");
      }
    else if(event.kind === "checkbox") {
        // Set state of the Textbox form to selected Textbox
        let editCheckbox = this.state.checkbox;
        editCheckbox._id = event._id;
        editCheckbox.kind = event.kind;
        editCheckbox.numberLabel = event.checkboxLabel;
        this.setState({
            checkbox: editCheckbox
        });
        // Show the update Textbox form with populated local state information
        let isVisible = $(".updateCheckbox").is(':visible');
        this.handleHideAllForms(".updateCheckbox", isVisible);
        //$(".updateTextbox").toggle("medium");
    }
  }

  /*
   * Method that allows users to update existing Form Inputs
   */
  handleUpdateFormInput(kind) {
    // Prepare HTTP API request data
    let requestData = {};
    requestData.viewsiteId = this.state.viewsiteId;
    requestData.viewpageId = this.state.viewpageId;
    requestData.elementId = this.state.element._id;
    requestData.kind = kind;
    // Continue preparing HTTP API request data based on Form Input kind
    // and hide update form after the update
    if(kind === "textbox") {
      let updateTextbox = this.state.textbox;
      requestData.formInputId = updateTextbox._id;
      requestData.textboxLabel = updateTextbox.textboxLabel;
      $(".updateTextbox").hide("medium");
    }
    else if(kind === "number") {
      let updateNumber = this.state.number;
      requestData.formInputId = updateNumber._id;
      requestData.numberLabel = updateNumber.numberLabel;
      $(".updateNumber").hide("medium");
    }
    else if(kind === "textarea") {
          let updateTextarea = this.state.textarea;
          requestData.formInputId = updateTextarea._id;
          requestData.textareaLabel = updateTextarea.textareaLabel;
          $(".updateTextarea").hide("medium");
      }
    else if(kind === "checkbox") {
        let updateCheckbox = this.state.checkbox;
        requestData.formInputId = updateCheckbox._id;
        requestData.checkboxLabel = updateCheckbox.checkboxLabel;
        $(".updateCheckbox").hide("medium");
    }
    // Call out to the API with a Form Input update request
    this.manageFormInputService.updateFormInput(requestData)
    .then((results) => {
      // Set global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
      // Follow up by clearing form state
      this.handleClearLocalState();
    },
    (error) => {
      // Handle errors
      this.setState({
        formInputSuccess: "",
        formInputError: error.response.data
      });
    });
  }

  /*
   * Method that allows users to delete existing Form Inputs
   */
  handleDeleteFormInput(event) {
    // Prepare HTTP API request data
    let requestData = {};
    requestData.formInputId = event._id;
    requestData.kind = event.kind;
    requestData.viewsiteId = this.state.viewsiteId;
    requestData.viewpageId = this.state.viewpageId;
    requestData.elementId = this.state.element._id;
    // Call out to API to request a Form Input to be deleted
    this.manageFormInputService.deleteFormInput(requestData)
    .then((results) => {
      // Afterwards, update Global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
    },
    (error) => {
      // Hande errors
      this.setState({
        formInputSuccess: "",
        formInputError: error.response.data
      });
    });
  }

  /*
   * Method used to hide all forms before showing another
   */
  handleHideAllForms(selector, isVisible) {
    // Sharply hide all create forms
    $(".createTextbox").hide(false);
    $(".createNumber").hide(false);
    $(".createTextarea").hide(false);
    $(".createCheckbox").hide(false);
     // $(".createTextbox").hide(false);
      $(".updateNumber").hide(false);
      $(".updateTextarea").hide(false);
      $(".updateCheckbox").hide(false);
    // Only hide update forms sharply if they are not the selector
    if(".updateTextbox" != selector) {
      $(".updateTextbox").hide(false);
    }
    else if(".updateNumber" != selector){
      $(".updateNumber").hide(false);
    }
    else if(".updateTextarea" != selector){
      $(".updateTextarea").hide(false);
    }
    else if(".updateCheckbox" != selector){
      $(".updateCheckbox").hide(false);
    }
// Smooth animation on the targeted selector
    if(isVisible) {
      $(selector).hide("medium");
    } else {
      $(selector).show("medium");
    }
  }

  /*
   * Method that clears local state so that new forms will not display old information
   */
  handleClearLocalState() {
    // Set state to default values
    let clearTextbox = this.state.textbox;
    clearTextbox._id = "";
    clearTextbox.kind = "textbox";
    clearTextbox.textboxLabel = "";
    let clearNumber = this.state.number;
    clearNumber._id = "";
    clearNumber.kind = "number";
    clearNumber.numberLabel = "";
    let clearTextarea = this.state.textarea;
    clearTextarea._id = "";
    clearTextarea.kind = "textarea";
    clearTextarea.textareaLabel = "";
    let clearCheckbox = this.state.checkbox;
    clearCheckbox._id = "";
    clearCheckbox.kind = "checkbox";
    clearCheckbox.checkboxLabel = "";
    this.setState({
      textbox: clearTextbox,
      number: clearNumber,
      textarea: clearTextarea,
      checkbox: clearCheckbox,
      formInputSuccess: "",
      formInputError: ""
    });
  }

  /*
   * Method that sets the Global state to reflect viewsite modifications
   * Passed down from Viewsite
   */
  handleSetGlobalState(newStateData, toSet) {
    this.props.onSetGlobalState(newStateData, toSet);
  }

  /*
   * Method to change state based on what a user types
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
   * React component lifecycle method that controls what happens before this
   * component receives props
   * Used to update Form appearance after a global state change
   */
  componentWillReceiveProps(nextProps) {
    // Set subsequent state values when component receives props
    this.setState({
      element: nextProps.element
    });
  }

  /*
   * React component lifecycle method that controls what happens before this
   * component mounts
   * Used to set Form fields based on Global state & hide create / update forms
   */
  componentDidMount() {
    // Set inital state values when component first mounts
    this.setState({
      viewsiteId: this.props.viewsiteId,
      viewpageId: this.props.viewpageId,
      element: this.props.element
    });
    // Hide forms when component first mounts
    this.handleHideAllForms();
  }

  /*
   * Render the Form JSX view
   */
  render() {
    return(FormJSX.call(this));
  }
}

// Export the Form
export default Form;
