// Import required modules
import React from 'react';

/*
 * Create a cell for each datum in the record set
 * Used by Records
 */
function Data(props) {
  if(props.record.data && props.record.data.length >= 1) {
    return props.record.data.map((datum, index) => {
      return(
        <td key={datum._id}>
          {datum.datum}
        </td>
      );
    });
  } else {
    return null;
  }
}

/*
 * Create a table row for each record in the User Table
 * Used by DataViewJSX
 */
function Records(props) {
  if(props.userTable.records && props.userTable.records.length >= 1) {
    let deleteClick = {};
    deleteClick.viewsiteId = props.viewsiteId;
    deleteClick.elementId = props.userTable._id;
    return props.userTable.records.map((record, index) => {
      return(
        <tr key={record._id}>
          <Data record={record} />
          <td>
            <a
            href="javascript:;"
            onClick={() => props.onDeleteRecord(deleteClick, record._id)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </a>
          </td>
        </tr>
      );
    });
  } else {
    return null;
  }
}

/*
 * Display a User's table
 * Used by UserTableJSX
 */
function UsersTable() {
  if(this.props.userTable.records.length > 0) {
    return(
      <table className="table table-hover">
        <tbody>
          <Records
          userTable={this.props.userTable}
          viewsiteId={this.props.viewsiteId}
          onDeleteRecord={this.handleDeleteRecord} />
        </tbody>
      </table>
    );
  } else {
    return(
      <p>No records for this table yet!</p>
    );
  }
}

/*
 * UserTable view
 */
var UserTableJSX = function() {
  return (
    <div>
      <h4>{this.props.userTableHeaders.formTitle}</h4>
      {UsersTable.call(this)}
    </div>
  );
}

// Export the UserTable view
export default UserTableJSX;
