// Import required modules
import React from 'react';

/*
 * Alert that notifies users of any successful operation
 * Used by ViewsiteFormJSX
 */
var SuccessAlert = function(props) {
  if(props.viewsiteSuccess) {
    return (
      <div className="alert alert-success" role="alert">
        {props.viewsiteSuccess}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Alert that notifies users of any unsuccessful operation
 * Used by ViewsiteFormJSX
 */
var ErrorAlert = function(props) {
  if(props.viewsiteError) {
    return (
      <div className="alert alert-danger" role="alert">
        {props.viewsiteError}
      </div>
    );
  } else {
    return null;
  }
}

/*
 * Viewsite Form view
 */
var ViewsiteFormJSX = function() {
  return (
    <div className="container-fluid">
      <h2>
        {this.props.description}
      </h2>

      <SuccessAlert
      viewsiteSuccess={this.props.viewsiteSuccess} />

      <ErrorAlert
      viewsiteError={this.props.viewsiteError} />

      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="viewsiteName">
            Viewsite Name

            <input
            type="text"
            name="viewsiteName"
            className="form-control"
            id="viewsiteName"
            placeholder="Enter Viewsite Name"
            value={this.props.viewsite.viewsiteName.replace(/\s+/g, '')}
            onChange={this.handleChange} />
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="viewsiteTheme">
            Viewsite Theme:

            <select
            id="viewsiteTheme"
            name="viewsiteTheme"
            className="form-control"
            value={this.props.viewsite.viewsiteTheme}
            onChange={this.handleChange}>
              <option value="default">Default</option>
              <option value="cerulean">Cerulean</option>
              <option value="darkly">Darkly</option>
              <option value="litera">Litera</option>
              <option value="materia">Materia</option>
              <option value="sandstone">Sandstone</option>
              <option value="slate">Slate</option>
              <option value="superhero">Superhero</option>
              <option value="cosmo">Cosmo</option>
              <option value="flatly">Flatly</option>
              <option value="lumen">Lumen</option>
              <option value="minty">Minty</option>
              <option value="simplex">Simplex</option>
              <option value="solar">Solar</option>
              <option value="united">United</option>
              <option value="cyborg">Cyborg</option>
              <option value="journal">Journal</option>
              <option value="lux">Lux</option>
              <option value="pulse">Pulse</option>
              <option value="sketchy">Sketchy</option>
              <option value="spacelab">Spacelab</option>
              <option value="yeti">Yeti</option>
            </select>
          </label>
        </div>

        <div className="form-check">
          <label className="form-check-label">
            <input
            type="checkbox"
            name="loginEnabled"
            className="form-check-input"
            id="loginEnabled"
            value="loginEnabled"
            checked={this.props.viewsite.loginEnabled}
            onChange={this.handleChange} />

            Login Enabled
          </label>
        </div>

        <br />

        <button type="submit" className="btn btn-primary">
          {this.props.description}
        </button>
      </form>
    </div>
  );
}

// Export the Viewsite Form JSX
export default ViewsiteFormJSX;
