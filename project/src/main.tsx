// src/main.jsx (or src/index.js if you're not using Vite/CRA default)

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // <<< IMPORTANT: Import BrowserRouter ONLY here.
import App from './App'; // Import your main App component.
import './index.css'; // Your global CSS file.

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    {/* THIS IS THE SINGLE, TOP-LEVEL BROWSERROUTER FOR YOUR ENTIRE APP */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);