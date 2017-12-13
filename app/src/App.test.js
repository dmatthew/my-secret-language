import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalLocalStorage from './Test/Helpers/GlobalLocalStorage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
