// Import required modules
import React from 'react';

// Import requred components
import TextboxForm from './components/TextboxForm';
import NumberForm from './components/NumberForm';
import TextareaForm from './components/TextareaForm';
import CheckboxForm from './components/CheckboxForm';

/*
 * Method used to prepare the create form for use
 * Used in FormJSX
 */
var prepareCreateTextbox = function() {
  $( ".createTextbox" ).toggle("medium");
  $( ".updateTextbox" ).hide(false);
  this.handleClearLocalState();
}

var prepareCreateTextarea = function() {
  $( ".createTextarea").toggle("medium");
  $ (".updateTextarea").hide(false);
  this.handleClearLocalState();
}

var prepareCreateNumber = function() {
    $( ".createNumber").toggle("medium");
    $ (".updateNumber").hide(false);
    this.handleClearLocalState();
}
var prepareCreateCheckbox = function() {
    $( ".createCheckbox").toggle("medium");
    $ (".updateCheckbox").hide(false);
    this.handleClearLocalState();
}
/*
 * Create list of Textboxs a Form owns
 * Used by FormJSX
 */
function FormInputList(props) {
  if(props.formInputs && props.formInputs.length >= 1) {
    const viewsiteId = props.viewsiteId;
    const viewpageId = props.viewpageId;
    const elementId = props.elementId;

    return props.formInputs.map((formInput, index) => {
      const _id = formInput._id;
      // Display Form Input based on 'kind'
      if(formInput.kind === "textbox") {
        // Display Textbox Form Input
        return (
          <TextboxFormInput
          key={_id}
          viewsiteId={viewsiteId}
          viewpageId={viewpageId}
          elementId={elementId}
          formInput={formInput}
          onEditFormInput={props.onEditFormInput}
          onDeleteFormInput={props.onDeleteFormInput} />
        );
      }
      else if(formInput.kind === "number") {
          // Display Textbox Form Input
          return (
              <NumberFormInput
                  key={_id}
                  viewsiteId={viewsiteId}
                  viewpageId={viewpageId}
                  elementId={elementId}
                  formInput={formInput}
                  onEditFormInput={props.onEditFormInput}
                  onDeleteFormInput={props.onDeleteFormInput} />
          );
      }
      else if(formInput.kind === "textarea") {
            // Display Textbox Form Input
            return (
                <TextareaFormInput
                    key={_id}
                    viewsiteId={viewsiteId}
                    viewpageId={viewpageId}
                    elementId={elementId}
                    formInput={formInput}
                    onEditFormInput={props.onEditFormInput}
                    onDeleteFormInput={props.onDeleteFormInput} />
            );
        }
      else if(formInput.kind === "checkbox") {
          // Display Textbox Form Input
          return (
              <CheckboxFormInput
                  key={_id}
                  viewsiteId={viewsiteId}
                  viewpageId={viewpageId}
                  elementId={elementId}
                  formInput={formInput}
                  onEditFormInput={props.onEditFormInput}
                  onDeleteFormInput={props.onDeleteFormInput} />
          );
      }
    });
  } else {
    return null;
  }
}



/*
 * Method used to display individual Form Inputs
 * Used by FormInputList
 */
function TextboxFormInput(props) {
  // Data needed to edit a Textbox Form Input
  let editClick = {
    viewsiteId: props.viewsiteId,
    viewpageId: props.viewpageId,
    elementId: props.elementId,
    _id: props.formInput._id,
    kind: props.formInput.kind,
    textboxLabel: props.formInput.textboxLabel
  };
  // Data needed to delete a Textbox Form Input
  let deleteClick = {
    viewsiteId: props.viewsiteId,
    viewpageId: props.viewpageId,
    elementId: props.elementId,
    _id: props.formInput._id,
    kind: props.formInput.kind
  };

  return (
    <li key={props.formInput._id} className="list-group-item d-flex">
      <div className="mr-auto p-2">
        <p><b>Textbox Label: </b>{props.formInput.textboxLabel}</p>
      </div>

      <div>
        <a
        className="p-2"
        href="javascript:;"
        onClick={() => props.onEditFormInput(editClick)}>
        <button type="button" className="btn btn-link btn-sm">
          Edit Textbox
        </button>
        </a>
      </div>

      <div>
        <a
        className="p-2"
        href="javascript:;"
        onClick={() => props.onDeleteFormInput(deleteClick)}>
          <button type="button" className="btn btn-danger btn-sm">
            Delete Textbox
          </button>
        </a>
      </div>
    </li>
  );
}

function NumberFormInput(props) {
    // Data needed to edit a Textbox Form Input
    let editClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind,
        numberLabel: props.formInput.numberLabel
    };
    // Data needed to delete a Textbox Form Input
    let deleteClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind
    };

    return (
        <li key={props.formInput._id} className="list-group-item d-flex">
            <div className="mr-auto p-2">
                <p><b>Number Label: </b>{props.formInput.numberLabel}</p>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onEditFormInput(editClick)}>
                    <button type="button" className="btn btn-link btn-sm">
                        Edit Number Label
                    </button>
                </a>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onDeleteFormInput(deleteClick)}>
                    <button type="button" className="btn btn-danger btn-sm">
                        Delete Number Label
                    </button>
                </a>
            </div>
        </li>
    );
}

function TextareaFormInput(props) {
    // Data needed to edit a Textbox Form Input
    let editClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind,
        textareaLabel: props.formInput.textareaLabel
    };
    // Data needed to delete a Textbox Form Input
    let deleteClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind
    };

    return (
        <li key={props.formInput._id} className="list-group-item d-flex">
            <div className="mr-auto p-2">
                <p><b>Textarea Label: </b>{props.formInput.textareaLabel}</p>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onEditFormInput(editClick)}>
                    <button type="button" className="btn btn-link btn-sm">
                        Edit Textarea
                    </button>
                </a>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onDeleteFormInput(deleteClick)}>
                    <button type="button" className="btn btn-danger btn-sm">
                        Delete Textarea
                    </button>
                </a>
            </div>
        </li>
    );
}

function CheckboxFormInput(props) {
    // Data needed to edit a Textbox Form Input
    let editClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind,
        textboxLabel: props.formInput.textboxLabel
    };
    // Data needed to delete a Textbox Form Input
    let deleteClick = {
        viewsiteId: props.viewsiteId,
        viewpageId: props.viewpageId,
        elementId: props.elementId,
        _id: props.formInput._id,
        kind: props.formInput.kind
    };

    return (
        <li key={props.formInput._id} className="list-group-item d-flex">
            <div className="mr-auto p-2">
                <p><b>Checkbox Label: </b>{props.formInput.checkboxLabel}</p>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onEditFormInput(editClick)}>
                    <button type="button" className="btn btn-link btn-sm">
                        Edit Checkbox
                    </button>
                </a>
            </div>

            <div>
                <a
                    className="p-2"
                    href="javascript:;"
                    onClick={() => props.onDeleteFormInput(deleteClick)}>
                    <button type="button" className="btn btn-danger btn-sm">
                        Delete Checkbox
                    </button>
                </a>
            </div>
        </li>
    );
}
/*
 * Form JSX view
 */
var FormJSX = function() {
  return(
    <div key={this.props.element._id} className="card border-primary mb-3">
      <div className="card-header">
        <button
        type="button"
        className="btn btn-link"
        onClick={() => {prepareCreateTextbox.call(this);}}>
        <i className="fa fa-plus" aria-hidden="true"></i> Add Textbox
        </button>
          <button
              type="button"
              className="btn btn-link"
              onClick={() => {prepareCreateNumber.call(this);}}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add Number Box
          </button>
        <button
            type="button"
            className="btn btn-link"
            onClick={() => {prepareCreateTextarea.call(this);}}>
          <i className="fa fa-plus" aria-hidden="true"></i> Add Textarea
        </button>
          <button
              type="button"
              className="btn btn-link"
              onClick={() => {prepareCreateCheckbox.call(this);}}>
              <i className="fa fa-plus" aria-hidden="true"></i> Add Checkbox
          </button>
      </div>


      <div className="card-body createTextbox">
        <TextboxForm
        description="Create Textbox"
        action="create"
        textbox={this.state.textbox}
        formInputSuccess={this.state.formInputSuccess}
        formInputError={this.state.formInputError}
        onChange={this.handleChange}
        onSubmit={this.handleCreateFormInput} />
      </div>

        <div className="card-body createNumber">
            <NumberForm
                description="Create Number"
                action="create"
                textbox={this.state.number}
                formInputSuccess={this.state.formInputSuccess}
                formInputError={this.state.formInputError}
                onChange={this.handleChange}
                onSubmit={this.handleCreateFormInput} />
        </div>

      <div className="card-body createTextarea">
        <TextareaForm
            description="Create Textarea"
            action="create"
            textbox={this.state.textarea}
            formInputSuccess={this.state.formInputSuccess}
            formInputError={this.state.formInputError}
            onChange={this.handleChange}
            onSubmit={this.handleCreateFormInput} />
      </div>

        <div className="card-body createCheckbox">
            <CheckboxForm
                description="Create Checkbox"
                action="create"
                textbox={this.state.checkbox}
                formInputSuccess={this.state.formInputSuccess}
                formInputError={this.state.formInputError}
                onChange={this.handleChange}
                onSubmit={this.handleCreateFormInput} />
        </div>

      <div className="card-body updateTextbox">
        <TextboxForm
        description="Update Textbox"
        action="update"
        textbox={this.state.textbox}
        formInputSuccess={this.state.formInputSuccess}
        formInputError={this.state.formInputError}
        onChange={this.handleChange}
        onSubmit={this.handleUpdateFormInput} />
      </div>

        <div className="card-body updateNumber">
            <NumberForm
                description="Update Number"
                action="update"
                textbox={this.state.number}
                formInputSuccess={this.state.formInputSuccess}
                formInputError={this.state.formInputError}
                onChange={this.handleChange}
                onSubmit={this.handleUpdateFormInput} />
        </div>
        <div className="card-body updateTextarea">
            <TextareaForm
                description="Update Textarea"
                action="update"
                textbox={this.state.textarea}
                formInputSuccess={this.state.formInputSuccess}
                formInputError={this.state.formInputError}
                onChange={this.handleChange}
                onSubmit={this.handleUpdateFormInput} />
        </div>
        <div className="card-body updateCheckbox">
            <CheckboxForm
                description="Update Checkbox"
                action="update"
                textbox={this.state.checkbox}
                formInputSuccess={this.state.formInputSuccess}
                formInputError={this.state.formInputError}
                onChange={this.handleChange}
                onSubmit={this.handleUpdateFormInput} />
        </div>

      <div className="card-body">
        <h4 className="card-title">
          <b>Form Title: </b>{this.props.element.formTitle}
        </h4>

        <p className="card-text"></p>
      </div>

      <ul className="list-group list-group-flush">
        <FormInputList
        viewsiteId={this.state.viewsiteId}
        viewpageId={this.state.viewpageId}
        elementId={this.state.element._id}
        formInputs={this.state.element.formInputs}
        onEditFormInput={this.handleEditFormInput}
        onDeleteFormInput={this.handleDeleteFormInput} />
      </ul>

      <div className="card-footer">
        <a
        className="card-link"
        href="javascript:;"
        onClick={() => this.props.onEditElement({
          viewsiteId: this.props.viewsiteId,
          viewpageId: this.props.viewpageId,
          _id: this.props.element._id,
          kind: "form",
          formTitle: this.props.element.formTitle
        })}>
          <button type="button" className="btn btn-link">
            Edit Form
          </button>
        </a>

        <a
        className="card-link float-right"
        href="javascript:;"
        onClick={() => this.props.onDeleteElement({
          viewsiteId: this.props.viewsiteId,
          viewpageId: this.props.viewpageId,
          _id: this.props.element._id,
          kind: "form"
        })}>
        <button type="button" className="btn btn-danger">
          Delete Form
        </button>
        </a>
      </div>
    </div>
  );
}

// Export the Form JSX view
export default FormJSX;
