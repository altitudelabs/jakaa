import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import { reducer as LeftMenu } from '../components/LeftMenu';
import { reducer as Search } from '../components/Search';
import { reducer as ProductDetail } from '../components/Product/Detail';

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
    LeftMenu,
    Search,
    ProductDetail,
  }),
  {},
  composed
);

export default store;
