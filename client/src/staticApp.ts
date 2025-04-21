// This file is used to bootstrap a static version of the app without a backend
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import React from 'react';

// Render the app - This code should match what's in main.tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  React.createElement(App)
);