// Import required modules
import React from 'react';

// Import requred components
import UserUsersJSX from './UserUsers.jsx';
import './userUsers.scss';

class UserUsers extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User's User Methods
    this.handleUpdateUserUsers = this.handleUpdateUserUsers.bind(this);
    this.handleDeleteUserUsers = this.handleDeleteUserUsers.bind(this);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);

    // Set initial state
    this.state = {};
  }

  /*
   * Method used to update a User's Users
   * Passed down from the Viewsite componenet
   */
   handleUpdateUserUsers(requestData) {
     if(this.state[requestData.username]) {
       requestData.permissionLevel = this.state[requestData.username]
     }
     this.props.onUpdateUserUsers(requestData);
   }

   /*
   * Method used to delete a User's Users
   * Passed down from the Viewsite componenet
    */
    handleDeleteUserUsers(requestData) {
      this.props.onDeleteUserUsers(requestData);
    }

    handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

  /*
   * Render the UserUsers view
   */
  render() {
    if(this.props.userTable == null) {
      return(UserUsersJSX.call(this));
    } else {
      return null;
    }
  }
}

// Export the User Table
export default UserUsers;
