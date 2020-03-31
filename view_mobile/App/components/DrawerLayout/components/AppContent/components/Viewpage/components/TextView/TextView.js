// Import required modules
import React from 'react';
import { Content, Text } from 'native-base';

// Import requred components
import styles from './styles.js';

/*
 * Text View JSX view
 */
var TextViewJSX = function() {
  return (
    <Content>
      {this.props.element.textValue.split('\n').map(function(item, key) {
        return (
          <Text key={key}>
            {item}
          </Text>
        )
      })}

      <Text>
        {"\n"}
      </Text>
    </Content>
  );
}

// Export TextView JSX view
export default TextViewJSX;
