// Import required modules
import React from 'react';
import ClickToEdit from 'react-click-to-edit'

// Import requred components
import Text from './components/Text';
import Form from './components/Form';
import DataView from './components/DataView';
import Image from './components/Image';

/*
 * Display each element based on Element kind
 * Used by ViewpageJSX
 */
function ElementsView(props) {
  if(props.elements) {
    return props.elements.map((element, index) => {
      if(element.kind === "text") {
        return (
          <Text
          key={element._id}
          element={element} />
        );
      } else if(element.kind === "form") {
        return (
          <Form
          key={element._id}
          viewsiteId={props.viewsiteId}
          element={element}
          userDatabase={props.userDatabase}
          onUpdateUserTable={props.onUpdateUserTable} />
        );
      } else if(element.kind === "dataView") {
        return (
          <DataView
          key={element._id}
          element={element}
          userForms={props.userForms}
          userDatabase={props.userDatabase} />
        );
      } else if(element.kind === "image") {
        return(
          <Image
          key={element._id}
          element={element} />
        );
      }
    });
  } else {
    return null;
  }
}

/*
 * Viewpage JSX view
 */
var ViewpageJSX = function() {
  return (
    <div className="container-fluid">
      <br />

      <div className="row">
        <div className="col-10 offset-1">
          <h1>{this.props.viewpage.viewpageName}</h1>

          <br />

          <ElementsView
          viewsiteId={this.props.viewsiteId}
          elements={this.props.viewpage.elements}
          userDatabase={this.props.userDatabase}
          userForms={this.props.userForms}
          onUpdateUserTable={this.handleUpdateUserTable} />
        </div>
      </div>
    </div>
  );
}

// Export the Viewpage JSX view
export default ViewpageJSX;
