import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

// Import all reducers
import leftMenu from '../components/LeftMenu/reducer';
import users from '../components/users/reducer';

let composed;

// Compose middleware and devTool
if (window.devToolsExtension) {
  composed = compose(
    applyMiddleware(thunk),
    window.devToolsExtension()
  );
} else {
  composed = compose(applyMiddleware(thunk));
}

// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    leftMenu,
    users,
    routing: routerReducer,
  }),
  {},
  composed
);

export default store;
