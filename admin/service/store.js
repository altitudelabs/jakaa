import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';


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
    routing: routerReducer,
  }),
  {},
  composed
);

export default store;
