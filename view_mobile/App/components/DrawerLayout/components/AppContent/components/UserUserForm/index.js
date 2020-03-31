// Import required modules
import React from 'react';
import { Redirect } from 'react-router-native';

// Import required components
import UserUserFormJSX from './UserUserForm.js';
import './styles.js';


class UserUserForm extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      userUser: {
        'username': "",
        'password': ""
      }
    }
  }

  /*
   * Method that keeps local state consistent with what the user types
   */
   handleChange(userFieldValue, userFieldName) {
     let changeUserUser = this.state.userUser;
     changeUserUser[userFieldName] = userFieldValue.text;
     this.setState({
       'userUser': changeUserUser
     });
   }

  /*
   * Method that controls what happens after the User form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    let request = {
      viewsiteId: this.props.viewsiteId,
      username: this.state.userUser.username,
      password: this.state.userUser.password
    };
    this.props.onCreateUserUser(request);
  }

  /*
   * Render the User's User Form
   * Only if the user is not logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(<Redirect to={"/"} />);
    } else {
      return (UserUserFormJSX.call(this));
    }
  }
}

// Export the User Form
export default UserUserForm;
