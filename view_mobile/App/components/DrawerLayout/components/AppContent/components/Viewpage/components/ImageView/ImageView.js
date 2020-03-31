// Import required modules
import React from 'react';
import { Image } from 'react-native';
import { Content, Text } from 'native-base';

// Import requred components
import styles from './styles.js';

/*
 * Image View JSX view
 */
var ImageViewJSX = function() {
  return (
    <Content
    style={styles.imageContainer}>
      <Image
      style={styles.imageStyle}
      source={{uri: "http://159.203.105.123:3000/" + this.props.element.imageLocation}} />

      <Text>
        {"\n"}
      </Text>
    </Content>
  );
}

// Export ImageView JSX view
export default ImageViewJSX;
