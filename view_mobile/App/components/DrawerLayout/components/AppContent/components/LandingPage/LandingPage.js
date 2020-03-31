// Import required modules
import React from 'react';
import { Content, H1 } from 'native-base';

/*
 * Landing Page JSX view
 */
var LandingPageJSX = function() {
  return (
    <Content>
      <H1>
        {this.props.viewsiteName}
      </H1>
    </Content>
  );
}

// Export the Landing Page JSX view
export default LandingPageJSX;
