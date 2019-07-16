import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as RouterProvider } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import GlobalStyles from './styles';
import { Provider as ReduxProvider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { createLogger} from 'redux-logger';
import appReducer from './reducer';

const logger = createLogger({
  collapsed: true,
});
const store = createStore(appReducer, applyMiddleware(logger));

ReactDOM.render(
  <ReduxProvider store={store}>
    <RouterProvider>
      <GlobalStyles />
      <App />
    </RouterProvider>
  </ReduxProvider>
  , document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
