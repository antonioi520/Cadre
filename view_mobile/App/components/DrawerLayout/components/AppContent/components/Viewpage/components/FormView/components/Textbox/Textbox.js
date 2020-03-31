// Import required modules
import React from 'react';
import {
  Content,
  Button,
  Text,
  Form,
  Item,
  Input,
  Label,
  H1,
  H2,
  H3
} from 'native-base';

// Import requred components
import styles from './styles.js';

/*
 * Textbox JSX view
 */
var TextboxJSX = function() {
  return (
    <Item>
      <Label>
        {this.props.formInput.textboxLabel}
      </Label>

      <Input
      value={this.props.formInputValue}
      onChangeText={this.handleChange} />
    </Item>
  );
}

// Export Textbox JSX view
export default TextboxJSX;
