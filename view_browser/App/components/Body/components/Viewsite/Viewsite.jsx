// Import required modules
import React from 'react';

// Import requred components
import Viewpage from './components/Viewpage';
import LandingPage from './components/LandingPage';

/*
 * Displays the content of each individual Viewpage
 * Used by ViewsiteJSX
 */
function ViewpageContent(props) {
  if(props.viewpages && props.viewpages.length >= 1) {
    return props.viewpages.map((viewpage) => {
      return (
        <div
        key={viewpage._id}
        className="tab-pane fade"
        id={viewpage._id}
        role="tabpanel"
        aria-labelledby={viewpage._id + "-tab"}>
          <div className="col-10 offset-1">
            <Viewpage
            viewsiteId={props.viewsite._id}
            viewpage={viewpage}
            userDatabase={props.userDatabase}
            userForms={props.userForms}
            onUpdateUserTable={props.onUpdateUserTable} />
          </div>
        </div>
      );
    });
  } else {
    return null;
  }
}

/*
 * Viewsite JSX view
 */
var ViewsiteJSX = function() {
  return (
    <div className="tab-content" id="nav-tabContent">
      <div
      className="tab-pane fade show active"
      id="landingPage"
      role="tabpanel"
      aria-labelledby="landingPage-tab">
        <LandingPage
        viewsite={this.props.viewsite} />
      </div>

      <ViewpageContent
      viewsite={this.props.viewsite}
      viewpages={this.props.viewsite.viewpages}
      userDatabase={this.props.userDatabase}
      userForms={this.props.userForms}
      onUpdateUserTable={this.handleUpdateUserTable} />
    </div>
  );
}

// Export Viewsite JSX view
export default ViewsiteJSX;
