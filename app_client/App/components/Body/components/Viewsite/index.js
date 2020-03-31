// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

// Import requred components
import ViewsiteJSX from './Viewsite.jsx';
import './viewsite.scss';

// Import required services
import ViewsiteService from '../../../../services/ViewsiteService';
import UserTableService from './services/UserTableService';
import ViewpageService from './services/ViewpageService';
import UserUserService from './services/UserUserService';

class Viewsite extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);
    // Initialize service objects
    this.manageViewsiteService = new ViewsiteService();
    this.manageUserTableService = new UserTableService();
    this.manageViewpageService = new ViewpageService();
    this.manageUserUserService = new UserUserService();

    // Viewpage Methods
    this.handleCreateViewpage = this.handleCreateViewpage.bind(this);
    this.handleEditViewpage = this.handleEditViewpage.bind(this);
    this.handleUpdateViewpage = this.handleUpdateViewpage.bind(this);
    this.handleDeleteViewpage = this.handleDeleteViewpage.bind(this);

    // User Table Methods
    this.handlePopulateUserTable = this.handlePopulateUserTable.bind(this);
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);

    // User User Methods
    this.handleReadAllUserUsers = this.handleReadAllUserUsers.bind(this);
    this.handleUpdateUserUsers = this.handleUpdateUserUsers.bind(this);
    this.handleDeleteUserUsers = this.handleDeleteUserUsers.bind(this);

    // Other Methods
    this.handleGatherUserTables = this.handleGatherUserTables.bind(this);
    this.handleSetGlobalState = this.handleSetGlobalState.bind(this);
    this.handleClearLocalState = this.handleClearLocalState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //this.onSortChange = this.onSortChange.bind(this);

    // Set initial state
    this.state = {
      viewsite: {},
      viewpage: {
        _id: "",
        viewpageName: "",
        permissionLevel: 3,
      },
      viewpageSuccess: "",
      viewpageError: "",
      userTables: [],
      selectedUserTable: {},
      selectedUserTableHeaders: {},
      userTableError: "",
      userUsers: [],
      pages: []
    };
      //this.add = this.add.bind(this);

  }

  /*
   * Method that allows a User to create a Viewpage
   */
  handleCreateViewpage(event) {
    // Prepare HTTP API request data
    let requestData = {};
    let createViewpage = this.state.viewpage;
    requestData.viewsiteId = this.state.viewsite._id;
    requestData.viewpageName = createViewpage.viewpageName;
    requestData.permissionLevel = createViewpage.permissionLevel;
    // Send out API call to request that a Viewpage is created
    this.manageViewpageService.createViewpage(requestData)
    .then((results) => {
      // Afterwards, set Global state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
      // Follow up by clearing viewpage state & hiding the form
      this.handleClearLocalState();
      $("#createViewpage").hide("medium");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewpageSuccess: "",
        viewpageError: error.response.data,
      });
    });
  }



  /*
   * Method that prepares the Viewpage update form with Viewpage information
   */
  handleEditViewpage(event) {
    // Set local state to be the Viewpage to edit
    let editViewpage = this.state.viewpage;
    editViewpage._id = event._id;
    editViewpage.viewpageName = event.viewpageName;
    editViewpage.permissionLevel = event.permissionLevel;
    this.setState({
      viewpage: editViewpage
    });
    // Show the update form, allowing the User to update the set Viewpage
    $("#updateViewpage").toggle("medium");
    $("#createViewpage").hide(false);
  }

  /*
   * Method that allows a User to update a Viewpage
   */
  handleUpdateViewpage() {
    // Prepare HTTP API request data
    let requestData = {};
    let updateViewpage = this.state.viewpage;
    requestData.viewsiteId = this.state.viewsite._id;
    requestData.viewpageId = updateViewpage._id;
    requestData.viewpageName = updateViewpage.viewpageName;
    requestData.permissionLevel = updateViewpage.permissionLevel;
    // Send call out to API to update the selected Viewpage
    this.manageViewpageService.updateViewpage(requestData)
    .then((results) => {
      // Afterwards, set Global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
      // Follow up by clearing viewsite state & hiding the form
      this.handleClearLocalState();
      $("#updateViewpage").hide("medium");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewpageSuccess: "",
        viewpageError: error.response.data
      });
    });
  }

  /*
   * Method that allows a user to delete a Viewpage
   */
  handleDeleteViewpage(event) {
    // Prepare HTTP API request data
    let requestData = {};
    requestData.viewpageId = event._id;
    requestData.viewsiteId = event.viewsiteId;
    // Make a call to the API requesting the deletion of selected Viewpage
    this.manageViewpageService.deleteViewpage(requestData)
    .then((results) => {
      // Afterwards, update Global Viewsite state to reflect changes
      this.handleSetGlobalState(results.data, "viewsite");
    },
    (error) => {
      // Handle errors
      this.setState({
        viewpageSuccess: "",
        viewpageError: error.response.data
      });
    });
  }

  /*
   * Method that reloads a User Table that has changed
   *
   * NOTE: User Tables share an ID with Forms
   */
  handleUpdateUserTable(updatedTable) {
    // Only continue if a User Table exists
    if(updatedTable._id) {
      // Afterwards, set state to reflect changes
      this.setState({
        userUsers: null,
        selectedUserTable: updatedTable,
        userTableError: ""
      });
    }
  }

  /*
   * Method that prepares a User Table to be managed
   * Used to get more detailed information on user table
   *
   */
  handlePopulateUserTable(userTable) {
    if(userTable && userTable._id) {
      // Prepare HTTP API request data
      let requestData = {};
      requestData.viewsiteId = this.state.viewsite._id;
      requestData.elementId = userTable._id;
      // Send out API call to request that a Viewpage is created
      this.manageUserTableService.readOneUserTable(requestData)
      .then((results) => {
        // Handle no records
        if(!results.data) {
          results.data = {};
        }
        // Afterwards, set state to reflect changes
        // Also, clear the User List so only the table is displayed
        this.setState({
          userUsers: null,
          selectedUserTable: results.data,
          selectedUserTableHeaders: userTable,
          userTableError: ""
        });
      },
      (error) => {
        // Handle errors
        this.setState({
          userTableError: error.response.data
        });
      });
    }
  }

  /*
   * Method to read all User's Users
   */
  handleReadAllUserUsers() {
    if(this.state.viewsite.loginEnabled) {
      // Prepare HTTP API request data
      let requestData = {};
      requestData.viewsiteId = this.state.viewsite._id;
      // Send out API call to request that a Viewpage is created
      this.manageUserUserService.readAllUserUsers(requestData)
      .then((results) => {
        if(results.data.length >= 1) {
          // Afterwards, set state to reflect changes
          // Also, clear the previous table so only the User List is displayed
          this.setState({
            selectedUserTable: null,
            selectedUserTableHeaders: "",
            userUsers: results.data
          });
        } else {
          // Afterwards, set state to reflect changes
          // Also, clear the previous table so only the User List is displayed
          this.setState({
            selectedUserTable: null,
            selectedUserTableHeaders: "",
            userUsers: []
          });
        }
      },
      (error) => {
        // Handle errors
        console.log(error);
      });
    }
  }

    // onSortEnd = ({oldIndex, newIndex}) =>{
    //        this.setState({
    //            pages: arrayMove(pages, oldIndex, newIndex),
    //        });
    //

  /*
   * Method to update a User's Users
   */
  handleUpdateUserUsers(userUser) {
    let requestData = {
      viewsiteId: this.state.viewsite._id,
      username: userUser.username,
      permissionLevel: userUser.permissionLevel
    }
    // Send out API call to request that a User's User is updated
    this.manageUserUserService.updateUserUser(requestData)
    .then((results) => {
      if(results.data.length >= 1) {
        // Afterwards, set state to reflect changes
        // Also, clear the previous table so only the User List is displayed
        this.setState({
          selectedUserTable: null,
          selectedUserTableHeaders: "",
          userUsers: results.data
        });
      }
    },
    (error) => {
      // Handle errors
      console.log(error);
    });
  }

  /*
   * Method to delete a User's Users
   */
  handleDeleteUserUsers(userUser) {
    let requestData = {
      viewsiteId: this.state.viewsite._id,
      username: userUser.username
    }
    // Send out API call to request that a User's User is deleted
    this.manageUserUserService.deleteUserUser(requestData)
    .then((results) => {
      if(results.data.length >= 1) {
        // Afterwards, set state to reflect changes
        // Also, clear the previous table so only the User List is displayed
        this.setState({
          selectedUserTable: null,
          selectedUserTableHeaders: "",
          userUsers: results.data
        });
      } else {
        this.setState({
          selectedUserTable: null,
          selectedUserTableHeaders: "",
          userUsers: []
        });
      }
    },
    (error) => {
      // Handle errors
      console.log(error);
    });
  }

  /*
   * Method that collects an array of Form Elements
   * Used to get more detailed information on user tables
   *
   * NOTE: User Tables and Form Elements share an _id
   */
  handleGatherUserTables() {
    let userTables = [];
    // For each viewpage, add to array if it is of kind 'form'
    for(const viewpage of this.state.viewsite.viewpages) {
      for(const element of viewpage.elements) {
        if(element.kind === "form") {
          userTables.push(element);
        }
      }
    }
    // Follow up by setting Global User Table state to reflect changes
    this.setState({
      userTables: userTables
    }, () => {
      if(!this.state.viewsite.loginEnabled) {
        // If login is not enabled then load the first table
        this.handlePopulateUserTable(userTables[0]);
      } else {
        // If login is enabled then read the users list
        this.handleReadAllUserUsers();
      }
    });
  }

  /*
   * Method that clears local Viewpage state
   * Used to prepare forms with a clean slate
   */
  handleClearLocalState() {
    let clearViewpage = this.state.viewpage;
    clearViewpage._id = "";
    clearViewpage.viewpageName = "";
    clearViewpage.permissionLevel = 3;
    this.setState({
      viewpage: clearViewpage,
      viewpageSuccess: "",
      viewpageError: ""
    });
  }

  /*
   * Method that is passed down to child components to update Viewsie state
   * Used after CUD operations to update the main Viewsite being displayed
   */
  handleSetGlobalState(newStateData, toSet) {
    this.setState({
      [toSet]: newStateData
    }, () => this.handleGatherUserTables());
  }

  /*
   * Method that updates local state based on what a user types
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
   * React component lifecycle method used to control what happens before this
   * component receives props
   * Used to update state based on what Viewsite is selected
   */
  componentWillReceiveProps(nextProps) {
    // Set request data for HTTP API call
    let requestData = {};
    requestData.viewsiteName = nextProps.match.params.viewsiteName;
    this.manageViewsiteService.readOneViewsite(requestData)
    .then((results) => {
      // Afterwards, set Viewsite state to the results and get it's User Tables
      // Also set User Tables to blank so old User Tables don't leak over
      this.setState({
        viewsite: results.data,
        selectedUserTable: {},
        selectedUserTableHeaders: {}
      }, () => this.handleGatherUserTables());
    },
    (error) => {
      // Handle errors
      console.log(error.response.data);
    });
  }

  /*
   * React component lifecycle method used to control what happens before this
   * component mounts
   * Used to set inital state based on the first Viewsite selected
   */
  componentDidMount() {
    // Set request data for HTTP API call
    let requestData = {};
    requestData.viewsiteName = this.props.match.params.viewsiteName;
    this.manageViewsiteService.readOneViewsite(requestData)
    .then((results) => {
      // Afterwards, set Viewsite state to the results and get it's User Tables
      // Also set User Tables to blank so old User Tables don't leak over
      this.setState({
        viewsite: results.data,
        selectedUserTable: {},
        selectedUserTableHeaders: {}
      }, () => this.handleGatherUserTables());
    },
    (error) => {
      // Handle errors
      console.log(error.response.data);
    });
    // Hide forms when component first mounts
    $("#createViewpage").hide(false);
    $("#updateViewpage").hide(false);
  }

  /*
   * Render the Viewsite view
   * Only if the User is logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(ViewsiteJSX.call(this));
    } else {
      return(<Redirect to="/" />);
    }
  }
}

// Export the Viewsite
export default Viewsite;
