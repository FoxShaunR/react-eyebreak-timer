import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './index.css';
import timerApp from './reducers/timers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(timerApp);

if (typeof window !== 'undefined') {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
  registerServiceWorker();
}
