// Import required modules
import React from 'react';
import { NativeRouter, AndroidBackButton } from 'react-router-native';

// Import requred components
import DrawerLayout from './components/DrawerLayout';
import styles from './styles.js';

/*
 * Create main Application
 * Nest it inside a Native Router to allow for React Native navigation
 */
var AppJSX = function() {
  return(
    <NativeRouter>
      <AndroidBackButton>
        <DrawerLayout />
      </AndroidBackButton>
    </NativeRouter>
  );
}

// Export main Application
export default AppJSX;
