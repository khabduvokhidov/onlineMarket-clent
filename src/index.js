import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import InfoContextProvider from './context/InfoContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <InfoContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </InfoContextProvider>
);