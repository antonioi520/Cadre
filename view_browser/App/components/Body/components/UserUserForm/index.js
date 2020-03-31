// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import required components
import UserUserFormJSX from './UserUserForm.jsx';
import './userUserForm.scss';


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
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let changeUser = this.state.userUser;
    changeUser[name] = value;
    this.setState({
      'userUser': changeUser
    });
  }

  /*
   * Method that controls what happens after the User form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    let request = {
      viewsiteId: this.props.viewsite._id,
      username: this.state.userUser.username,
      password: this.state.userUser.password
    };
    this.props.onSubmit(request);
  }

  /*
   * Render the User's User Form
   * Only if the user is not logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(<Redirect to={"/viewsites/" + this.props.viewsite.viewsiteName} />);
    } else {
      return (UserUserFormJSX.call(this));
    }
  }
}

// Export the User Form
export default UserUserForm;
