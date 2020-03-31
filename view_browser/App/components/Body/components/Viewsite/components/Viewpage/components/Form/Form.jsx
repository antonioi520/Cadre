// Import required modules
import React from 'react';

// Import required components
import Textbox from './components/Textbox';
import Number from './components/Number';
import Textarea from './components/Textarea';
import Checkbox from './components/Checkbox';

/*
 * Create list of Form Inputs a Form owns
 * Used by FormJSX
 */
function FormInputList(props) {
  if(props.formInputs) {
    return props.formInputs.map((formInput, index) => {
      let formInputValue = props.record[formInput._id];
      if(formInput.kind === "textbox") {
        return (
          <Textbox
          key={formInput._id}
          formInput={formInput}
          formInputValue={formInputValue}
          onChange={props.onChange} />
        );
      }
     else if(formInput.kind === "number"){
        return(
            <Number
            key={formInput._id}
            formInput={formInput}
            formInputValue={formInputValue}
            onChange={props.onChange} />
        )
      }
      else if(formInput.kind === "textarea"){
            return(
                <Textarea
                    key={formInput._id}
                    formInput={formInput}
                    formInputValue={formInputValue}
                    onChange={props.onChange} />
            )
     }
      else if(formInput.kind === "checkbox"){
          return(
              <Checkbox
                  key={formInput._id}
                  formInput={formInput}
                  formInputValue={formInputValue}
                  onChange={props.onChange} />
          )
      }
    });
  } else {
    return null;
  }
}

/*
 * Form JSX view
 */
var FormJSX = function() {
  return(
    <div>
      <h2>{this.props.element.formTitle}</h2>

      <form onSubmit={this.handleSubmit}>
        <FormInputList
        formInputs={this.state.formInputs}
        record={this.state.record}
        onChange={this.handleChange} />

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <br />
    </div>
  );
}

// Export Form JSX view
export default FormJSX;
