import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureLocalStorage from './setup/configureLocalStorage';
import {saveToLocalStorage} from './middleware/saveToLocalStorage';

configureLocalStorage();

const persistedState = {
  words: JSON.parse(localStorage.getItem('words')),
  notes: JSON.parse(localStorage.getItem('notes'))
}

const store = createStore(rootReducer, persistedState, applyMiddleware(saveToLocalStorage));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
