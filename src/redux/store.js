import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { persistedState } from './persistedState';
import { reducer as bannersReducer } from './bannersRedux';
import { reducer as productsReducer } from './productsRedux';
import { reducer as productReducer } from './productRedux';
import { reducer as cartReducer } from './cartRedux';
import { reducer as orderReducer } from './ordersRedux';
import { reducer as newsletterReducer } from './newsletterRedux';

// define reducers
const reducers = {
  banners: bannersReducer,
  products: productsReducer,
  product: productReducer,
  cart: cartReducer,
  order: orderReducer,
  newsletter: newsletterReducer,
};

// add blank reducers for initial state properties without reducers
Object.keys(initialState).forEach(item => {
  if (typeof reducers[item] == 'undefined') {
    reducers[item] = (statePart = null) => statePart;
  }
});

const combinedReducers = combineReducers(reducers);

// create store
export const store = createStore(
  combinedReducers,
  persistedState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
