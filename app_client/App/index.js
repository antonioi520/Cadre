// Import required modules
import React from 'react';

// Import required components
import AppJSX from './App.jsx';
import './app.scss';

// Import required services
import UserService from './services/UserService';
import ViewsiteService from './services/ViewsiteService';

class App extends React.Component {
  constructor(props) {
    // Call superclass with same arguments
    super(props);

    // Service Class Definitions
    this.manageUserService = new UserService();
    this.manageViewsiteService = new ViewsiteService();

    // User Methods
    this.handleReadOneUser = this.handleReadOneUser.bind(this);
    this.handleLoginUser = this.handleLoginUser.bind(this);
    this.handleLogoutUser = this.handleLogoutUser.bind(this);
    // Viewsite Methods
    this.handleReadAllViewsites = this.handleReadAllViewsites.bind(this);
    // Other Methods
    this.handleSetGlobalState = this.handleSetGlobalState.bind(this);

    // Set initial state
    this.state = {
      user: {},
      viewsites: [],
      loggedIn: false,
      loginSuccess: "",
      loginError: ""
    };
  }

  /*
   * Method that checks the server for an active session
   */
  handleReadOneUser() {
    // Read User in active session
    this.manageUserService.readOneUser()
    .then((results) => {
      if(results.data.username) {
        // If a User session is active on the server, set it in state
        // Afterwards, read all of that User's Viewsites
        this.setState({
          user: results.data,
          loggedIn: true
        }, () => this.handleReadAllViewsites());
      }
    },
    (error) => {
      // Handle errors
      this.setState({
        user: {},
        loggedIn: false,
      });
    });
  }

  /*
   * Method that creates a new active session
   */
  handleLoginUser(loginCredentials) {
    // Set request data used in HTTP API call
    let requestData = {};
    requestData.username = loginCredentials.username;
    requestData.password = loginCredentials.password;
    // Send login request to server
    this.manageUserService.loginUser(requestData)
    .then((results) => {
      // If successful, set state with results
      // Afterwards, read all of the logged-in User's Viewsites
      this.setState({
        user: results.data,
        loggedIn: true,
        loginSuccess: "",
        loginError: ""
      }, () => this.handleReadAllViewsites());
    },
    (error) => {
      // Handle errors
      this.setState({
        user: {},
        loggedIn: false,
        loginSuccess: "",
        loginError: error.response.data
      });
    });
  }

  /*
   * Method that destroys the current active session
   */
  handleLogoutUser() {
    // Send HTTP request to API to destroy currently active session
    this.manageUserService.logoutUser()
    .then((results) => {
      // Clear state if successful
      this.setState({
        user: results.data,
        viewsites: [],
        loggedIn: false,
        loginSuccess: "",
        loginError: ""
      });
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
   * Method that retrieves top-level information on all of a User's Viewsites
   */
  handleReadAllViewsites() {
    // Send API request to read all of a Users Viewsites
    this.manageViewsiteService.readAllViewsites()
    .then((results) => {
      // Set Viewsites in state if successful
      this.setState({
        viewsites: results.data
      });
    },
    (error) => {
      // Handle errors
      this.setState({
        viewsites: []
      });
    });
  }

  /*
   * Method that is passed down to all child components
   * It is used to set the main Application state which is used all other components
   */
  handleSetGlobalState(newStateData, toSet) {
    this.setState({
      [toSet]: newStateData
    });
  }

  /*
   * React component lifecycle method that runs every time this component mounts
   * Used to check if any User session is active
   */
  componentDidMount() {
    this.handleReadOneUser();
  }

  /*
   * Render the JSX for the main application view
   */
  render() {
    return(AppJSX.call(this));
  }
}

// Export the main Application
export default App;
