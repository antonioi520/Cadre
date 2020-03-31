// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import requred components
import DashboardJSX from './Dashboard.jsx';
import './dashboard.scss';

// Import required services
import ViewsiteService from '../../../../services/ViewsiteService';

class Dashboard extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Service Class Definitions
    this.manageViewsiteService = new ViewsiteService();

    // Viewsite Methods
    this.handleCreateViewsite = this.handleCreateViewsite.bind(this);
    this.handleEditViewsite = this.handleEditViewsite.bind(this);
    this.handleUpdateViewsite = this.handleUpdateViewsite.bind(this);
    this.handleDeleteViewsite = this.handleDeleteViewsite.bind(this);
    // Other Methods
    this.handleSetGlobalState = this.handleSetGlobalState.bind(this);
    this.handleClearLocalState = this.handleClearLocalState.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // Set initial state
    this.state = {
      viewsite: {
        _id: "",
        viewsiteName: "",
        viewsiteTheme: "default",
        loginEnabled: false
      },
      viewsiteSuccess: "",
      viewsiteError: ""
    }
  }

  /*
   * Method used to create a new Viewsite
   */
  handleCreateViewsite() {
    // Prepare HTTP API request data
    let requestData = {};
    let createViewsite = this.state.viewsite;
    requestData.viewsiteName = createViewsite.viewsiteName;
    requestData.viewsiteTheme = createViewsite.viewsiteTheme;
    requestData.loginEnabled = createViewsite.loginEnabled;
    // Send request to API to create Viewsite
    this.manageViewsiteService.createViewsite(requestData)
    .then((results) => {
      // Update the Global Viewsite
      this.handleSetGlobalState(results.data, "viewsites");
      // Follow up by clearing Viewsite state & hiding the form
      this.handleClearLocalState();
      $("#createViewsite").hide("medium");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewsiteSuccess: "",
        viewsiteError: error.response.data
      });
    });
  }

  /*
   * Method used to prepare the update form
   */
  handleEditViewsite(event) {
    // Set local state to be the Viewsite to edit
    let editViewsite = this.state.viewsite;
    editViewsite._id = event._id;
    editViewsite.viewsiteName = event.viewsiteName;
    editViewsite.viewsiteTheme = event.viewsiteTheme;
    editViewsite.loginEnabled = event.loginEnabled;
    this.setState({
      viewsite: editViewsite
    });
    // Display the update form, allowing the User to edit the chosen Viewsite
    $("#updateViewsite").toggle("medium");
    $("#createViewsite").hide(false);
  }

  /*
   * Method used to update an existing Viewsite
   */
  handleUpdateViewsite() {
    // Prepare the HTTP API request data
    let requestData = {};
    let updateViewsite = this.state.viewsite;
    requestData.viewsiteId = updateViewsite._id;
    requestData.viewsiteName = updateViewsite.viewsiteName;
    requestData.viewsiteTheme = updateViewsite.viewsiteTheme;
    requestData.loginEnabled = updateViewsite.loginEnabled;
    // Send call out to API to update the Viewsite
    this.manageViewsiteService.updateViewsite(requestData)
    .then((results) => {
      this.handleSetGlobalState(results.data, "viewsites");
      // Follow up by clearing viewsite state & hiding the update form
      this.handleClearLocalState();
      $("#updateViewsite").hide("medium");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewsiteSuccess: "",
        viewsiteError: error.response.data
      });
    });
  }

  /*
   * Method used to delete an existing Viewsite
   */
  handleDeleteViewsite(event) {
    // Prepare HTTP API request data
    let requestData = {};
    requestData.viewsiteId = event._id;
    // Send request to delete Viewsite
    this.manageViewsiteService.deleteViewsite(requestData)
    .then((results) => {
      // Afterwards, update Global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsites");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewsiteError: error.response.data
      });
    });
  }

  /*
   * Method used to clear the local Viewsite state
   */
  handleClearLocalState() {
    let clearViewsite = this.state.viewsite;
    clearViewsite._id = "";
    clearViewsite.viewsiteName = "";
    clearViewsite.viewsiteTheme = "default"
    clearViewsite.loginEnabled = false;
    this.setState({
      viewsite: clearViewsite,
      viewsiteSuccess: "",
      viewsiteError: ""
    });
  }

  /*
   * Method used to set the main Application state
   * Passed down from the main Application
   */
  handleSetGlobalState(newStateData, toSet) {
    this.props.onSetGlobalState(newStateData, toSet);
  }

  /*
   * Method used to change local state according to what the user is typing
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
   * React component lifecycle method the runs whenever the Dashboard mounts
   * Used to hide the Viewsite forms
   */
  componentDidMount() {
    $("#createViewsite").hide(false);
    $("#updateViewsite").hide(false);
  }

  /*
   * Render the JSX for the Dashboard
   * Only if the user is logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(DashboardJSX.call(this));
    } else {
      return(<Redirect to="/" />);
    }
  }
}

// Export the Dashboard
export default Dashboard;
