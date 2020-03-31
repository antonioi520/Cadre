// Import required modules
import React from 'react';

// Import requred components
import UserTableJSX from './UserTable.jsx';
import './userTable.scss';

// Import required services
import UserRecordService from './services/UserRecordService';

class UserTable extends React.Component {
  constructor(props) {
    // Call parent constructor
    super(props);

    // Initialize service objects
    this.manageUserRecordService = new UserRecordService();

    // User Table Methods
    this.handleUpdateUserTable = this.handleUpdateUserTable.bind(this);

    // User Record Methods
    this.handleDeleteRecord = this.handleDeleteRecord.bind(this);
  }

  /*
   * Method that updates a User Table after being edited
   *
   * Passed down from the Viewsite component
   */
  handleUpdateUserTable(updatedTable) {
    this.props.onUpdateUserTable(updatedTable);
  }

  /*
   * Method used to delete a User Record from a User Database
   */
   handleDeleteRecord(deleteClick, recordId) {
     let requestData = {};
     requestData.viewsiteId = deleteClick.viewsiteId;
     requestData.elementId = deleteClick.elementId;
     requestData.recordId = recordId;
     // Make a call to the API requesting the deletion of selected Viewpage
     this.manageUserRecordService.deleteUserRecord(requestData)
     .then((results) => {
       // Afterwards, update Global Viewsite state to reflect changes
       this.handleUpdateUserTable(results.data);
     },
     (error) => {
       // Handle errors
       console.log(error.response.data);
     });
   }


  /*
   * Render the UserTable view
   */
  render() {
    if(this.props.userUsers == null) {
      return(UserTableJSX.call(this));
    } else {
      return null;
    }
  }
}

// Export the User Table
export default UserTable;
