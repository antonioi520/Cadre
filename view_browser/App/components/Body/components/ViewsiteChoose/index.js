// Import required modules
import React from 'react';
import { Redirect } from 'react-router-dom';

// Import requred components
import ViewsiteChooseJSX from './ViewsiteChoose.jsx';
import './viewsiteChoose.scss';

class ViewsiteChoose extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    //Other Methods
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    // Set initial state
    this.state = {
      viewsiteName: ""
    };
  }

  /*
   * Method that sets local state based on what a user types
   */
  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  /*
   * Method that controls what happens after the ViewsiteChoose form has been submitted
   */
  handleSubmit(event) {
    event.preventDefault();
    this.props.onRequestViewsite(this.state.viewsiteName);
  }

  /*
   * Method used for loading a requested Viewsite's theme
   */
  componentDidMount() {
    var bootswatchTheme = "https://bootswatch.com/_vendor/bootstrap/dist/css/bootstrap.min.css";
    var file = document.createElement("link");
    file.setAttribute("rel", "stylesheet");
    file.setAttribute("type", "text/css");
    file.setAttribute("href", bootswatchTheme);
    document.head.appendChild(file);
  }

  /*
   * Render ViewsiteChoose
   * Only if no Viewsite is currently selected
   */
  render() {
    if(this.props.viewsite) {
      return(<Redirect to={'/viewsites/' + this.props.viewsite.viewsiteName} />);
    } else {
      return(ViewsiteChooseJSX.call(this));
    }
  }
}

// Export ViewsiteChoose
export default ViewsiteChoose;
