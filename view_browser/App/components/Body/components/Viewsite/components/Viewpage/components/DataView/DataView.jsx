// Import required modules
import React from 'react';

/*
 * Create a cell for each datum in the record set
 * Used by Records
 */
function Data(props) {
  if(props.record.data) {
    return props.record.data.map((datum, index) => {
      return(
        <td key={datum._id}>
          {datum.datum}
        </td>
      );
    });
  }
}

/*
 * Create a table row for each record in the User Table
 * Used by DataViewJSX
 */
function Records(props) {
  if(props.userTable.records) {
    return props.userTable.records.map((record, index) => {
      return(
        <tr key={record._id}>
          <Data record={record} />
        </tr>
      );
    });
  } else {
    return null;
  }
}

/*
 * Data View JSX view
 */
var DataViewJSX = function() {
  // Determine what User Table this DataView represents
  // NOTE: Form Elements and User Tables share an ID
  let userTable = {};
  if(this.props.userDatabase) {
    for(const databaseTable of this.props.userDatabase) {
      if(databaseTable._id === this.props.element.formId) {
        userTable = databaseTable;
      }
    }
  }
  // Determine the title of the Form represented by the User Table this Data View displays
  let formTitle = "";
  if(this.props.userForms) {
    for(const userTableHeader of this.props.userForms) {
      if(userTableHeader._id == this.props.element.formId) {
        formTitle = userTableHeader.formTitle;
      }
    }
  }

  return (
    <div>
      <h2>{formTitle}</h2>

      <table className="table table-hover">
        <tbody>
          <Records
          userTable={userTable} />
        </tbody>
      </table>

      <br />
    </div>
  );
}

// Export Data View JSX view
export default DataViewJSX;
