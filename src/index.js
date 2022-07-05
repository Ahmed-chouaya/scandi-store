import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ContextProvider } from './Context';
import { BrowserRouter } from "react-router-dom";
import ScrollToTop from './ScrollToTop';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <BrowserRouter>
      <ScrollToTop />
      <App />
    </BrowserRouter>
    </ContextProvider>
  </React.StrictMode>
);