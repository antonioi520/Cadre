// Import required modules
import React from 'react';

/*
 * Create a table row for each record in the User Table
 * Used by UserTable
 */
function UserList(props) {
  if(props.userUsers && props.userUsers.length >= 1) {
    return props.userUsers.map((userUser, index) => {
      return(
        <tr key={userUser.username}>
          <td>
            <p>
              {userUser.username}
            </p>
          </td>
          <td>
            <div className="form-group">
              <label htmlFor="permissionLevel">
                Permission Level:

                <select
                id="permissionLevel"
                name={userUser.username}
                className="form-control"
                defaultValue={userUser.permissionLevel}
                onChange={props.onChange}>
                  <option value="3">Public</option>
                  <option value="2">Private</option>
                  <option value="1">Administrators</option>
                  <option value="0">Owner</option>
                </select>
              </label>
            </div>
          </td>
          <td>
            <a
            href="javascript:;"
            onClick={() => props.onUpdateUserUsers(userUser)}>
              <i className="fa fa-floppy-o" aria-hidden="true"></i>
            </a>
          </td>
          <td>
            <a
            href="javascript:;"
            onClick={() => props.onDeleteUserUsers(userUser)}>
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
 * Display a table of User's Users
 * Used by UserUsersJSX
 */
function UsersTable() {
  if(this.props.userUsers.length > 0) {
    return(
      <table className="table table-hover">
        <tbody>
          <UserList
          userUsers={this.props.userUsers}
          onUpdateUserUsers={this.handleUpdateUserUsers}
          onDeleteUserUsers={this.handleDeleteUserUsers}
          onChange={this.handleChange} />
        </tbody>
      </table>
    );
  } else {
    return(
      <p>No users have signed up yet!</p>
    );
  }
}

/*
 * UserUsers view
 */
var UserUsersJSX = function() {
  return (
    <div>
      <h4>User Accounts</h4>

      {UsersTable.call(this)}
    </div>
  );
}

// Export the UserUsers view
export default UserUsersJSX;
