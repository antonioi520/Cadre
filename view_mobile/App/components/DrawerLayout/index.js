// Import required modules
import React from 'react';

// Import requred components
import DrawerLayoutJSX from './DrawerLayout.js';

// Import required services
import ViewsiteService from './services/ViewsiteService';
import UserTableService from './services/UserTableService';
import UserUserService from './services/UserUserService';

class DrawerLayout extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Initialize service objects
    this.manageViewsiteService = new ViewsiteService();
    this.manageUserTableService = new UserTableService();
    this.manageUserUserService = new UserUserService();

    // User's User Methods
    this.handleReadOneUserUser = this.handleReadOneUserUser.bind(this);
    this.handleCreateUserUser = this.handleCreateUserUser.bind(this);
    this.handleLoginUserUser = this.handleLoginUserUser.bind(this);
    this.handleLogoutUserUser = this.handleLogoutUserUser.bind(this);

    // Viewsite Methods
    this.handleRequestViewsite = this.handleRequestViewsite.bind(this);

    // User Table Methods
    this.handleRequestUserDatabase = this.handleRequestUserDatabase.bind(this);
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);

    // Other Methods
    this.handlePostViewsiteMethods = this.handlePostViewsiteMethods.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      userUser: {},
      userUserSuccess: "",
      userUserError: "",
      viewsiteName: "",
      viewsite: {},
      userDatabase: {},
      viewsiteRequestError: "",
      dataViews: [],
      userForms: [],
      loggedIn: false,
      loginSuccess: "",
      loginError: ""
    };
  }

  /*
   * Method for reading a User's User
   */
  handleReadOneUserUser(viewsiteId) {
    if(viewsiteId) {
      // Set request data used in HTTP API call
      let requestData = {};
      requestData.viewsiteId = viewsiteId;
      // Read User's User in active session
      this.manageUserUserService.readOneUserUser(requestData)
      .then((results) => {
        if(results.data.username) {
          // If a User's User session is active on the server, set it in state
          this.setState({
            userUser: results.data,
            loggedIn: true
          });
        }
      },
      (error) => {
        // Handle errors
        this.setState({
          userUser: {},
          loggedIn: false,
        });
      });
    }
  }

  /*
   * Method for creating a User's User
   */
  handleCreateUserUser(request) {
    if(this.state.viewsite._id) {
      // Set request data used in HTTP API call
      let requestData = {};
      requestData.viewsiteId = this.state.viewsite._id;
      requestData.username = request.username;
      requestData.password = request.password;
      // Read User's User in active session
      this.manageUserUserService.createUserUser(requestData)
      .then((results) => {
        // Set the User's User in state if it was successfully created
        this.setState({
          userUser: results.data,
          loggedIn: true,
          userUserSuccess: "",
          userUserError: ""
        }, () => this.handleRequestViewsite(this.state.viewsite.viewsiteName));
      },
      (error) => {
        // Handle errors
        this.setState({
          userUser: {},
          loggedIn: false,
          userUserSuccess: "",
          userUserError: error.response.data
        });
      });
    }
  }

  /*
   * Method for logging in a User's User
   */
  handleLoginUserUser(requestData) {
    if(requestData.viewsiteId) {
      // Login the User's User
      this.manageUserUserService.loginUserUser(requestData)
      .then((results) => {
        // If successful, set state with results
        this.setState({
          userUser: results.data,
          loggedIn: true,
          loginSuccess: "",
          loginError: ""
        }, () => this.handleRequestViewsite(this.state.viewsite.viewsiteName));
      },
      (error) => {
        // Handle errors
        this.setState({
          userUser: {},
          loggedIn: false,
          loginSuccess: "",
          loginError: error.response.data
        });
      });
    }
  }

  /*
   * Method for logging out a User's User
   */
  handleLogoutUserUser() {
    // Send HTTP request to API to destroy currently active session
    this.manageUserUserService.logoutUserUser()
    .then((results) => {
      // Clear state if successful
      this.setState({
        userUser: results.data,
        loggedIn: false,
        loginSuccess: "",
        loginError: ""
      }, () => this.handleRequestViewsite(this.state.viewsite.viewsiteName));
    },
    (error) => {
      // Handle errors
      this.setState({
        loginSuccess: "",
        loginError: error.response.data
      });
    });
  }

  /*
   * Method that loads the requested Viewsite
   */
  handleRequestViewsite(viewsiteName) {
    // Continue if a Viewsite Name exists
    if(viewsiteName) {
      // Set HTTP call request data
      let requestData = {};
      requestData.viewsiteName = viewsiteName;
      this.manageViewsiteService.readOneViewsite(requestData)
      .then((results) => {
        // Collect an array of Forms whose data will be used to enrich associated User Tables
        let dataViews = [];
        let userForms = [];
        if(results.data.viewpages) {
          for(const viewpage of results.data.viewpages) {
            if(viewpage.elements) {
              for(const element of viewpage.elements) {
                if(element.kind === "form") {
                  userForms.push(element);
                } else if(element.kind === "dataView") {
                  dataViews.push(element);
                }
              }
            }
          }
        }
        // Set state to the results of the API call
        this.setState({
          viewsite: results.data,
          viewsiteRequestError: "",
          dataViews: dataViews,
          userForms: userForms
        }, () => this.handlePostViewsiteMethods(results.data));
      },
      (error) => {
        // Handle errors
        this.setState({
          viewsite: "",
          userDatabase: "",
          viewsiteRequestError: error.response.data
        });
      });
    } else {
      // If no Viewsite Name, set state to be blank
      this.setState({
        viewsite: "",
        userDatabase: "",
        viewsiteRequestError: "No viewsite specified!"
      });
    }
  }

  /*
   * Method for handling actions to be taken after a Viewsite has been
   * set in state
   */
  handlePostViewsiteMethods(viewsite) {
    // Request the Database associated with this Viewsite
    this.handleRequestUserDatabase(viewsite._id);
    // Check if there is an active User's User session
    this.handleReadOneUserUser(viewsite._id);
  }

  /*
   * Method that loads the requested Viewsite's associated User Database
   *
   * NOTE: User Databases share an ID with Viewsites
   */
  handleRequestUserDatabase(viewsiteId) {
    // Continue if a Viewsite ID exists
    if(viewsiteId) {
      // Set HTTP call request data
      let requestData = {};
      requestData.viewsiteId = viewsiteId;
      requestData.elements = this.state.dataViews;
      this.manageUserTableService.readAllUserTables(requestData)
      .then((results) => {
        // Set state to API call results
        this.setState({
          userDatabase: results.data,
          viewsiteRequestError: ""
        });
      },
      (error) => {
        // Handle errors
        this.setState({
          userDatabase: "",
          viewsiteRequestError: error.response.data
        });
      });
    } else {
      // If no Viewsite ID, set state to be blank
      this.setState({
        userDatabase: "",
        viewsiteRequestError: "No user database specified!"
      });
    }
  }

  /*
   * Method that reloads a User Table that has changed
   *
   * NOTE: User Tables share an ID with Forms
   */
  handleUpdateUserTable(updatedTable) {
    // Only continue if a User Table exists
    if(updatedTable._id) {
      let userDatabase = this.state.userDatabase;
      // Find updated table
      for(let i in userDatabase) {
        if(userDatabase[i]._id == updatedTable._id) {
          userDatabase[i] = updatedTable;
        }
      }
      // Set state with new updated table
      this.setState({userDatabase: userDatabase});
    }
  }

  /*
   * Update state to reflect what a user types
   */
  handleChange(viewsiteName) {
    this.setState({
      viewsiteName: viewsiteName
    });
  }

  /*
   * Method used to control what happens when a form is submitted
   */
  handleSubmit() {
    if(this.state.viewsiteName) {
      this.handleRequestViewsite(this.state.viewsiteName);
    }
  }

  /*
   * Method used to control how the Drawer is closed
   */
  closeDrawer = () => {
    this.drawer._root.close()
  };

  /*
   * Method used to control how the Drawer is opened
   */
  openDrawer = () => {
    this.drawer._root.open()
  };

  /*
   * Render the Drawer Layout containing the main Application content
   */
  render() {
    return (DrawerLayoutJSX.call(this));
  }
}

// Export the DrawerLayout
export default DrawerLayout;
