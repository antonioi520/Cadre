// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import required components
import LoginJSX from './Login.jsx';
import './login.scss';

class Login extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
    this.validateField = this.validateField.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.errorClass = this.errorClass.bind(this);

    // Set initial state
    this.state = {

        username: "",
        password: "",
        confirmPassword: "",
        formErrors: {username:"", password: "", confirmPassword: "",},
        userValid: false,
        passwordValid: false,
        confirmPasswordValid: false,

    }
  }

  /*
   * Method that allows local state to reflect what a User types
   */
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    let changeLoginCredentials = this.state;
    changeLoginCredentials[name] = value;
    this.setState({
      'loginCredentials': changeLoginCredentials,
    });
  }

  /*
   * Method that controls what happens after a form has been submited
   */
  handleSubmit(event) {
    event.preventDefault();
    let loginCredentials = this.state;
    this.props.onLoginUser(loginCredentials);
  }

    handleUserInput(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value},
            () => { this.validateField(name, value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;
        let confirmPasswordValid = this.state.confirmPasswordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                fieldValidationErrors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                fieldValidationErrors.password = passwordValid ? '': ' is too short';
                break;
           // case 'confirmPassword':
               // confirmPasswordValid = value.match(password.value);
             //   fieldValidationErrors.confirmPassword = confirmPasswordValid ? '': ' does not match';
            //    break;
            default:
                break;
        }
        this.setState({formErrors: fieldValidationErrors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    errorClass(error) {
        return(error.length === 0 ? '' : 'has-error');
    }


  /*
   * Render the Login form view
   * Only if a user is not logged in
   */
  render() {
    if(this.props.loggedIn) {
      return(<Redirect to="/" />);
    } else {
      return(LoginJSX.call(this));
    }
  }
}



// Export the Login form
export default Login;
