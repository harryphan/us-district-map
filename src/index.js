import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Main from './containers/Main';
import {fetchCounties, fetchStates} from "./reducers/boundaries";
import {fetchCovidData, fetchUSCovidData} from "./reducers/covidData";

const store = configureStore();
store.dispatch(fetchStates);
store.dispatch(fetchCounties);
store.dispatch(fetchCovidData);
store.dispatch(fetchUSCovidData);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
