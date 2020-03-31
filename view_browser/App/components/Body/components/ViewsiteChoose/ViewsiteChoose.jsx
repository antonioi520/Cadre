// Import required modules
import React from 'react';

/*
 * Alert that notifies users of any unsuccessful operations
 */
var ErrorAlert = function(props) {
  if(props.viewsiteRequestError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.viewsiteRequestError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * ViewsiteChoose JSX view
 */
var ViewsiteChooseJSX = function() {
  return (
    <div className="container">
      <br />

      <div className="row">
        <div className="col-10 offset-1">
          <h1>
            Choose a Viewsite
          </h1>

          <ErrorAlert
          viewsiteRequestError={this.props.viewsiteRequestError} />

        <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col">
                <input
                type="text"
                className="form-control"
                id="viewsiteName"
                name="viewsiteName"
                placeholder="Enter Viewsite Name"
                value={this.state.viewsiteName}
                onChange={this.handleChange} />
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                  Go!
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Export Viewsite Choose JSX view
export default ViewsiteChooseJSX;
