import React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import App from './components/App'
import reducers from './reducers'
import 'normalize.css';
import './index.css';

const store = createStore(reducers)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
