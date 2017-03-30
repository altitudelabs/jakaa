import './main.scss';
import './favicon.ico';

import React from 'react';
import { render } from 'react-dom';
import {
         IndexRoute,
        //  IndexRedirect,
         Router,
         Route,
         browserHistory,
       } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './service/store';

import App from './components/App';
import Users from './components/Users';
import UserDetail from './components/UserDetail';
import Transactions from './components/Transactions';
import TransactionDetail from './components/TransactionDetail';

// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store

const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Router history={history}>
      <Route path={'/admin'} component={App}>
        <IndexRoute component={Users} />
        <Route path={'users'} component={Users} />
        <Route path={'users/:id'} component={UserDetail} />
        <Route path={'transactions'} component={Transactions} />
        <Route path={'transactions/:id'} component={TransactionDetail} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
