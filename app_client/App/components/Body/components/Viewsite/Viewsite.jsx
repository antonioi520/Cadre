// Import required modules
import React from 'react';

// Import requred components
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import ViewpageForm from './components/ViewpageForm';
import Viewpage from './components/Viewpage';
import UserTable from './components/UserTable';
import UserUsers from './components/UserUsers';

/*
 * Method used to prepare the create Viewpage forms for
 * creating a Viewpage
 * Used in ViewsiteJSX
 */
function prepareCreateViewpage() {
  $("#createViewpage").toggle("medium");
  $("#updateViewpage").hide(false);
  this.handleClearLocalState();
}

/*
 * Method used to hide every form
 * Used when switching Viewpage tabs for a smoother UI experience
 */
function clearAllForms() {
  $(".createText").hide(false);
  $(".updateText").hide(false);
  $(".createForm").hide(false);
  $(".updateForm").hide(false);
  $(".createDataView").hide(false);
  $(".updateDataView").hide(false);
  $(".createImage").hide(false);
  $(".updateImage").hide(false);
}


/*
 * Create list of Viewpages a Viewsite owns
 * Used by ViewsiteJSX in the 'Manage Viewpages' tab
 */
function ViewpageList(props) {
   // this.state = { pages: [] };
    let pages = [];

  if(props.viewpages && props.viewpages.length >= 1) {
    return props.viewpages.map((viewpage, index) => {
      const _id = viewpage._id;
      const viewsiteId = props.viewsiteId;
      const viewpageName = viewpage.viewpageName;
      const permissionLevel = viewpage.permissionLevel;
        const SortableItem = SortableElement(({value}) => <ul>{value}</ul>); //value = placeholder

        const SortableList = SortableContainer(({items}) => { //items = placeholder
          //  if(this.state.pages && this.state.pages.length >= 1) {
                return (
                    <ul>
                        {pages.map((value, index) => ( //value = placeholder -- pages.map needs to target state.pages
                            // return(
                            <SortableItem key={viewpage._id} index={index} value={value}/>
                            // );
                        ))}
                    </ul>
               );
            //}
        });


      // Set up a nice message representing Viewpage permission level
      let permissionLevelMessage = "";
      switch(permissionLevel) {
        case 0:
          permissionLevelMessage = "Owner";
          break;
        case 1:
          permissionLevelMessage = "Administrators";
          break;
        case 2:
          permissionLevelMessage = "Private";
          break;
        case 3:
          permissionLevelMessage = "Public";
          break;
      }
      // Data needed to edit Viewpage
      let editClick = {
        _id: _id,
        viewsiteId: viewsiteId,
        viewpageName: viewpageName,
        permissionLevel: permissionLevel
      };
      // Data needed up delete Viewpage
      let deleteClick = {
        _id: _id,
        viewsiteId: viewsiteId
      };

        console.log("test");


        let pageTest = <div key={viewpage._id} className="card border-primary mb-3">
            <div className="card-body">
                <h4 className="card-title">
                    <b>Viewpage: </b>{viewpageName}
                </h4>
                <p className="card-text">
                    <b>Permission Level: </b>: {permissionLevelMessage}
                </p>
            </div>
            <div className="card-footer">
                <a
                    className="card-link"
                    href="javascript:;"
                    onClick={() => props.onEditViewpage(editClick)}>
                    <button type="button" className="btn btn-link">
                        Edit Viewpage
                    </button>
                </a>

                <a
                    className="card-link float-right"
                    href="javascript:;"
                    onClick={() => props.onDeleteViewpage(deleteClick)}>
                    <button type="button" className="btn btn-danger">
                        Delete Viewpage
                    </button>
                </a>
            </div>
        </div>;

        //add to array when viewsite created
        if (pages < props.viewpages) {
            pages.push(pageTest);
        }

        //const pages1 = [];

        // const add = () => {
        //     if (pages.length < props.viewpages.length) {
        //         // const newPages = pages.push(pageTest);
        //         pages.push(pageTest);
        //         // const pages1 = [...pages, ...pages];
        //         this.setState({
        //             pages: pages
        //         });
        //         console.log(pages);
        //         //console.log(updatedList);
        //     }
        // };


        //save order of array when done sorting
      //   onSortEnd = ({oldIndex, newIndex}) =>{
      //     this.setState({
      //         pages: arrayMove(pages, oldIndex, newIndex),
      //     });
      // };
//12

      return (

       <SortableList
           items={pages}
         //  onSortEnd={this.onSortEnd()}
       />

      );
    });
  } else {
    return (
      <p>No Webpages have been created yet!</p>
    );
  }

}

/*
 * Create list of tabs for Viewpages a Viewsite owns
 * Used by ViewsiteJSX
 */
function ViewpageTabs(props) {
  if(props.viewpages && props.viewpages.length >= 1) {
    return props.viewpages.map((viewpage, index) => {
      return (
        <a
        key={viewpage._id}
        className="nav-link dropdown-item"
        id={viewpage._id + "-tab"}
        data-toggle="tab"
        href={"#" + viewpage._id}
        role="tab"
        aria-controls={viewpage._id}
        aria-selected="false"
        onClick={() => {clearAllForms.call(this);}}>
          {viewpage.viewpageName}
        </a>
      );
    });
  } else {
    return (
      <p
      className="dropdown-item"
      role="tab">
        No Viewpages have been created yet!
      </p>
    );
  }
}

/*
 * Create content for each Viewpage owned by the Viewsite
 * Used by the ViewsiteJSX
 */
function ViewpageContent(props) {
  if(props.viewpages && props.viewpages.length >= 1) {
    return props.viewpages.map((viewpage, index) => {
      return (
        <div
        key={viewpage._id}
        className="tab-pane fade"
        id={viewpage._id}
        role="tabpanel"
        aria-labelledby={viewpage._id + "-tab"}>
          <Viewpage
          viewsiteId={props.viewsiteId}
          viewpage={viewpage}
          userTables={props.userTables}
          onSetGlobalState={props.onSetGlobalState} />
        </div>
      );
    });
  } else {
    return null;
  }
}

/*
 * Create content for managing viewpages
 * Used by the ViewsiteJSX
 */
function ManageViewpagesContent() {
  return (
    <div
    className="tab-pane fade show active"
    id="manage-viewpages"
    role="tabpanel"
    aria-labelledby="manage-viewpages-tab">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-auto">
          <ul className="nav flex-column">
            <li className="nav-item">
              <button
              type="button"
              className="btn btn-link nav-link"
              onClick={() => {prepareCreateViewpage.call(this);}}>
              <i className="fa fa-plus" aria-hidden="true"></i> New Webpage
              </button>
            </li>
          </ul>
        </div>
        <div className="col">
          <div id="createViewpage" className="card mb-3">
            <div className="card-body">
              <ViewpageForm
              description="Create Viewpage"
              action="create"
              viewpage={this.state.viewpage}
              viewpageSuccess={this.state.viewpageSuccess}
              viewpageError={this.state.viewpageError}
              onChange={this.handleChange}
              onSubmit={this.handleCreateViewpage} />
            </div>
          </div>

          <div id="updateViewpage" className="card mb-3">
            <div className="card-body">
              <ViewpageForm
              description="Update Viewpage"
              action="update"
              viewpage={this.state.viewpage}
              viewpageSuccess={this.state.viewpageSuccess}
              viewpageError={this.state.viewpageError}
              onChange={this.handleChange}
              onSubmit={this.handleUpdateViewpage} />
            </div>
          </div>
          <ViewpageList
          viewsiteId={this.state.viewsite._id}
          viewpages={this.state.viewsite.viewpages}
          onEditViewpage={this.handleEditViewpage}
          onDeleteViewpage={this.handleDeleteViewpage} />
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

/*
 * Create list of tabs for each table in a User's Database
 * Used by ManageDatabaseContent
 */
function UserDatabasePills() {
  if(this.state.userTables && this.state.userTables.length >= 1) {
    return this.state.userTables.map((userTable, index) => {
      return (
          <a
          key={userTable._id}
          className={index == 0 && !this.state.viewsite.loginEnabled
            ? "nav-link active" : "nav-link"}
          href="javascript:;"
          data-toggle="pill"
          role="tab"
          onClick={() => {this.handlePopulateUserTable(userTable)}}>
            {userTable.formTitle}
          </a>
      );
    });
  } else {
    return null;
  }
}

/*
 * Create User Users Pill
 */
function UserUsersPill() {
  if(this.state.viewsite && this.state.viewsite.loginEnabled) {
    return (
      <a
      className="nav-link active"
      href="javascript:;"
      data-toggle="pill"
      role="tab"
      onClick={() => {this.handleReadAllUserUsers()}}>
        User Accounts
      </a>
    );
  } else {
    return null;
  }
}

/*
 * Create content for managing User Database
 * Used by the ViewsiteJSX
 */
function ManageDatabaseContent() {
  return (
    <div
    className="tab-pane fade"
    id="manage-database"
    role="tabpanel"
    aria-labelledby="manage-database-tab">
      <div className="row">
        <div className="col-1"></div>

        <div className="col-auto">
          <div
          className="nav flex-column nav-pills"
          role="tablist"
          aria-orientation="vertical">
            {UserUsersPill.call(this)}
            {UserDatabasePills.call(this)}
          </div>
        </div>

        <div className="col">
          <UserUsers
          viewsiteId={this.state.viewsite._id}
          userUsers={this.state.userUsers}
          userTable={this.state.selectedUserTable}
          onUpdateUserUsers={this.handleUpdateUserUsers}
          onDeleteUserUsers={this.handleDeleteUserUsers} />

          <UserTable
          viewsiteId={this.state.viewsite._id}
          userTable={this.state.selectedUserTable}
          userUsers={this.state.userUsers}
          userTableHeaders={this.state.selectedUserTableHeaders}
          onUpdateUserTable={this.handleUpdateUserTable} />
        </div>

        <div className="col-1"></div>
      </div>
    </div>
  );
}

/*
 * Viewsite JSX view
 */
var ViewsiteJSX = function() {
  return (
    <div className="container-fluid">
      <br />

      <div className="row">
        <div className="col-2 offset-1">
          <h1>
            {this.state.viewsite.viewsiteName}
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-10 offset-1">
          <ul className="nav nav-tabs" id="viewsite-tabs" role="tablist">
            <li className="nav-item">
              <a
              className="nav-link active"
              id="manage-viewpages-tab"
              data-toggle="tab"
              href="#manage-viewpages"
              role="tab"
              aria-controls="manage-viewpages"
              aria-selected="true">
                Webpage Details
              </a>
            </li>

            <li className="nav-item dropdown mr-auto">
              <a
              className="nav-link dropdown-toggle"
              data-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false">
                Your Pages
              </a>

              <div className="dropdown-menu">
                <ViewpageTabs
                viewpages={this.state.viewsite.viewpages} />
              </div>
            </li>

            <li className="nav-item">
              <a
              className="nav-link"
              id="manage-database-tab"
              data-toggle="tab"
              href="#manage-database"
              role="tab"
              aria-controls="manage-database"
              aria-selected="true">
                Manage Database
              </a>
            </li>

          </ul>
        </div>
      </div>

      <br />

      <div className="row">
        <div className="col-12">
          <div className="tab-content" id="manage-viewsites-tabContent">
            {ManageDatabaseContent.call(this)}

            {ManageViewpagesContent.call(this)}

            <ViewpageContent
            viewsiteId={this.state.viewsite._id}
            viewpages={this.state.viewsite.viewpages}
            userTables={this.state.userTables}
            onSetGlobalState={this.handleSetGlobalState} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export the Viewsite JSX view
export default ViewsiteJSX;
