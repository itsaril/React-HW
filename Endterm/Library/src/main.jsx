import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'; 
import { store } from './store';        
import App from './App.jsx';
import './styles/global.css';
import { AuthProvider } from './contexts/AuthContext';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW Registration: Success! Scope is:', registration.scope);
      })
      .catch(error => {
        console.error('SW Registration: Failed!', error);
      });
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}> 
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </Provider> 
  </React.StrictMode>,
);
