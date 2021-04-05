import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import store from "./store";

export const StoreContext = React.createContext();

ReactDOM.render(
  <React.StrictMode>
      <StoreContext.Provider value={store}>
        <App />
      </StoreContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

