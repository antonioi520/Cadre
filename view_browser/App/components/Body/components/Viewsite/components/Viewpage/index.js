// Import required modules
import React from 'react';

// Import requred components
import ViewpageJSX from './Viewpage.jsx';
import './viewpage.scss';

class Viewpage extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // User Database Methods
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);
  }

  /*
   * Method that allows components to request a Viewsite's associated User Database
   * Passed down from the main Application
   */
  handleUpdateUserTable(updatedTable) {
    this.props.onUpdateUserTable(updatedTable);
  }

  /*
   * Render the Viewpage JSX view
   */
  render() {
    return(ViewpageJSX.call(this));
  }
}

// Export the Viewpage
export default Viewpage;
