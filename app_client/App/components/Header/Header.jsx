// Import required modules
import React from 'react';
import { NavLink } from 'react-router-dom';

/*
 * Choose navbar options based on user state
 * Used by the main Header view
 */
function HeaderOptions(props) {
  if(props.loggedIn) {
    // Return the Dashboard link
    return (
      <li className="nav-item">
        <NavLink className="nav-link" to="/dashboard">
          Dashboard
        </NavLink>
      </li>
    );
  } else {
    return null;
  }
}

/*
 * Create links for each Viewsite a user owns
 * Used by the main Header view
 */
function ViewsiteLinks(props) {
  if(props.viewsites && props.viewsites.length >= 1) {
    // Return links to a Users Viewsite if the User has any
    return props.viewsites.map((viewsite) => {
      const viewsiteId = viewsite._id;
      const viewsiteName = viewsite.viewsiteName;
      const viewsiteHref = '/' + viewsite.viewsiteName;
      const viewsiteLink = "/viewsites/" + viewsite.viewsiteName;

      return (
        <li key={viewsiteId} className="nav-item">
          <a id={viewsiteId} className="nav-link" href={viewsiteLink}>
            {viewsiteName}
          </a>
        </li>
      );
    });
  } else {
    return null;
  }
}

/*
 * Choose login options based on user state
 * Used by the main Header view
 */
function LoginOptions(props) {
  if(props.loggedIn) {
    // If a User is logged in return a logout button
    return (
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <a className="nav-link" href="javascript:;" onClick={props.onLogoutUser}>
            Logout
          </a>
        </li>
      </ul>
    );
  } else {
    // If no User is logged in return a sign-up & login button
    return (
      <ul className="navbar-nav justify-content-end">
        <li className="nav-item">
          <NavLink className="nav-link" to="/signup">
            Sign-Up
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    );
  }
}

/*
 * The main Header view
 */
var HeaderJSX = function() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-navbar">
      <NavLink className="navbar-brand" to="/">
          <img src="/logo.png" className="logo" /> Cadre
      </NavLink>

      <button
      className="navbar-toggler"
      type="button" data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation">
        <i className="fa fa-bars" aria-hidden="true"></i>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
            <HeaderOptions
                loggedIn={this.props.loggedIn} />
          <ViewsiteLinks
          viewsites={this.props.viewsites} />
        </ul>
        <LoginOptions
        loggedIn={this.props.loggedIn}
        onLogoutUser={this.handleLogoutUser} />
      </div>
    </nav>
  );
}

// Export the main Header view
export default HeaderJSX;
