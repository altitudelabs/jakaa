import './main.scss';
import './favicon.ico';
import React from 'react';
import { render } from 'react-dom';
import {
  IndexRoute,
  Router,
  Route,
  useRouterHistory,
} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import store from './store';
import { createHistory } from 'history';

import App from './components/App';
import Home from './components/Home';
import {
  Detail as ProductDetail,
  Create as ProductCreate,
} from './components/Product';
import Profile from './components/Profile';
import {
  action as LeftMenuAction,
} from './components/LeftMenu';
// Needed for onTouchTap
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

// Create an enhanced history that syncs navigation events with the store
const browserHistory = useRouterHistory(createHistory)({
  // NOTE for gh-pages
  basename: '/jakaa',
});
const history = syncHistoryWithStore(browserHistory, store);

render(
  <Provider store={store}>
    {/* Tell the Router to use our enhanced history */}
    <Router history={history}>
      <Route
        path={'/'}
        component={App}
        onChange={(prevState, nextState) => {
          if (nextState.location.action !== 'POP') {
            window.scrollTo(0, 0);
          }
          LeftMenuAction.close();
        }}
      >
        <IndexRoute component={Home} />
        <Route path={'product/new'} component={ProductCreate} />
        <Route path={'product/:id'} component={ProductDetail} />
        <Route path={'profile/:id'} component={Profile} />
        <Route path="*" component={Home} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
