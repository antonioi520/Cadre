// Import required modules
import React from 'react';

// Import requred components
import ViewsiteJSX from './Viewsite.jsx';
import './viewsite.scss';

class Viewsite extends React.Component {
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
   * Render Viewsite JSX view
   */
  render() {
    return(ViewsiteJSX.call(this));
  }
}

// Export the Viewsite
export default Viewsite;
