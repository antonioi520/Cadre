// Import required modules
import React from 'react';
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  H1,
  H2,
  H3
} from 'native-base';

// Import requred components
import Textbox from './components/Textbox';
import styles from './styles.js';

/*
 * Create list of FormInputs a Form owns
 * Used by FormViewJSX
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
    });
  } else {
    return null;
  }
}

/*
 * Form View JSX view
 */
var FormViewJSX = function() {
  return(
    <Content>
      <H2>
        {this.props.element.formTitle}
      </H2>

      <Form>
        <FormInputList
        formInputs={this.state.formInputs}
        record={this.state.record}
        onChange={this.handleChange} />

        <Button
        block
        onPress={this.handleSubmit}>
          <Text>
            Submit
          </Text>
        </Button>
      </Form>

      <Text>
        {"\n"}
      </Text>
    </Content>
  );
}

// Export Form View JSX view
export default FormViewJSX;
