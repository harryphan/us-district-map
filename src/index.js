import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import configureStore from './configureStore';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Main from './containers/MainContainer';
import { fetchNationalVotingData} from "./reducers/votingData";
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
import {CssBaseline} from "@material-ui/core";

const store = configureStore();
store.dispatch(fetchNationalVotingData);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Main />
        </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
