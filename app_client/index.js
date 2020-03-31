// Import required modules
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// Import requred components
import App from './App';
import './scss/custom.scss';

/*
 * Set the main Application mount point on the document root
 * Nest it inside a Browser Router to allow for React SPA navigation
 */
ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
  ), document.getElementById('root')
);
