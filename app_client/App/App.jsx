// Import required modules
import React from 'react';

// Import requred components
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';

/*
 * Create main Application view
 */
var AppJSX = function() {
  return(
    <div>
      <Header
      loggedIn={this.state.loggedIn}
      viewsites={this.state.viewsites}
      onLogoutUser={this.handleLogoutUser} />

      <Body
      loggedIn={this.state.loggedIn}
      loginSuccess={this.state.loginSuccess}
      loginError={this.state.loginError}
      user={this.state.user}
      viewsites={this.state.viewsites}
      onLoginUser={this.handleLoginUser}
      onSetGlobalState={this.handleSetGlobalState} />

      <Footer />
    </div>
  );
}

// Export the view for the main Application
export default AppJSX;
