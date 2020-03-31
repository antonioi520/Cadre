// Import required modules
import React from 'react';
import { NavLink } from 'react-router-dom';

// Import requred components
import ViewsiteForm from './components/ViewsiteForm';
import UserForm from '../UserForm';

/*
 * Function used to hide Viewsite forms & clear local Viewsite state
 * in preparation for a fresh create Viewsite form
 * Used in the Dashboard view
 */
function prepareCreateViewsite() {
  $("#createViewsite").toggle("medium");
  $("#updateViewsite").hide(false);
  this.handleClearLocalState();
}

/*
 * Create list of Viewsites a user owns
 * Used by the Dashboard view
 */
function ViewsiteList(props) {
  if(props.viewsites && props.viewsites.length >= 1) {
    return props.viewsites.map((viewsite, index) => {
      const _id = viewsite._id;
      const viewsiteName = viewsite.viewsiteName;
      const viewsiteTheme = viewsite.viewsiteTheme;
      const viewsiteThemeMessage = viewsiteTheme.charAt(0).toUpperCase() + viewsiteTheme.slice(1);
      const loginEnabled = viewsite.loginEnabled;
      const loginEnabledMessage = loginEnabled ? "Yes" : "No";
      const viewsiteLink = "/viewsites/" + viewsite.viewsiteName;
      // Information needed to edit Viewsite
      let editClick = {
        _id: _id,
        viewsiteName: viewsiteName,
        viewsiteTheme: viewsiteTheme,
        loginEnabled: loginEnabled
      };
      // Information needed to delete Viewsite
      let deleteClick = {_id: _id};
      return (
        <div key={_id} className="card border-primary mb-3">
          <div className="card-body">
            <h4 className="card-title">
              <b>Website: </b>
              <NavLink to={"/" + viewsiteName} className="card-link">
                {viewsiteName}
              </NavLink>
            </h4>

            <p>
              <b>Preview: </b>
              <a href={viewsiteLink} className="card-link">
                {"cadre.me" + viewsiteLink}
              </a>
            </p>

            <p className="card-text">
              <b>Website Theme: </b> {viewsiteThemeMessage}
            </p>

            <p className="card-text">
              <b>Login Enabled: </b> {loginEnabledMessage}
            </p>
          </div>

          <div className="card-footer">
            <a
            className="card-link"
            href="javascript:;"
            onClick={() => props.onEditViewsite(editClick)}>
              <button type="button" className="btn btn-link">
                Edit Website
              </button>
            </a>

              <NavLink
                  className="card-link"
                  to={"/" + viewsiteName}>
                  <button type="button" className="btn btn-link">
                      Add Pages
                  </button>
              </NavLink>

            <a
            className="card-link float-right"
            href="javascript:;"
            onClick={() => props.onDeleteViewsite(deleteClick)}>
              <button type="button" className="btn btn-danger">
                Delete Website
              </button>
            </a>

          </div>
        </div>
      );
    });
  } else {
    return(
      <p>No Websites have been created yet!</p>
    );
  }
}

/*
 * Create the Dashboard JSX view
 */
var DashboardJSX = function() {
  return (
    <div className="container-fluid">
      <br />
      <div className="row">
        <div className="col-1 offset-1">
          <h1>
            Dashboard
          </h1>
        </div>
      </div>
      <div className="row">
        <div className="col-1"></div>
        <div className="col-auto">
          <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical">
            <a
            className="nav-link active"
            id="v-pills-viewsites-tab"
            data-toggle="pill"
            href="#v-pills-viewsites"
            role="tab"
            aria-controls="v-pills-viewsites"
            aria-selected="true">
              Your Websites
            </a>

            <a
            className="nav-link"
            id="v-pills-account-tab"
            data-toggle="pill"
            href="#v-pills-account"
            role="tab"
            aria-controls="v-pills-account"
            aria-selected="false">
              Account Settings
            </a>
          </div>
        </div>
        <div className="col">
          <div className="tab-content" id="v-pills-tabContent">
            <div
            className="tab-pane fade show active"
            id="v-pills-viewsites"
            role="tabpanel"
            aria-labelledby="v-pills-viewsites-tab">
              <button
              type="button"
              className="btn btn-link"
              onClick={() => {prepareCreateViewsite.call(this);}}>
              <i className="fa fa-plus" aria-hidden="true"></i> New Website
              </button>
              <div id="createViewsite" className="card mb-3">
                <div className="card-body">
                  <ViewsiteForm
                  description="Create Website"
                  action="create"
                  viewsite={this.state.viewsite}
                  viewsiteSuccess={this.state.viewsiteSuccess}
                  viewsiteError={this.state.viewsiteError}
                  onSetGlobalState={this.handleSetGlobalState}
                  onChange={this.handleChange}
                  onSubmit={this.handleCreateViewsite} />
                </div>
              </div>

              <div id="updateViewsite" className="card mb-3">
                <div className="card-body">
                  <ViewsiteForm
                  description="Update Website"
                  action="update"
                  viewsite={this.state.viewsite}
                  viewsiteSuccess={this.state.viewsiteSuccess}
                  viewsiteError={this.state.viewsiteError}
                  onChange={this.handleChange}
                  onSubmit={this.handleUpdateViewsite} />
                </div>
              </div>

              <ViewsiteList
              viewsites={this.props.viewsites}
              onEditViewsite={this.handleEditViewsite}
              onDeleteViewsite={this.handleDeleteViewsite} />
            </div>
            <div
            className="tab-pane fade"
            id="v-pills-account"
            role="tabpanel"
            aria-labelledby="v-pills-account-tab">
              <div className="card mb-3">
                <div className="card-body">
                  <UserForm
                  description="Update User"
                  action="update"
                  user={this.props.user}
                  onSetGlobalState={this.handleSetGlobalState} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-1"></div>
      </div>
    </div>
  );
}

// Export the Dashboard JSX view
export default DashboardJSX;
