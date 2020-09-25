import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { initialState } from './initialState';
import { reducer as kitsReducer } from './kitsRedux';
import { reducer as booksReducer } from './booksRedux';
import { reducer as kidsReducer } from './kidsRedux';
import { reducer as accesoriesReducer } from './accesoriesRedux';
import { reducer as bannersReducer } from './bannersRedux';

// define reducers
const reducers = {
  kits: kitsReducer,
  books: booksReducer,
  kids: kidsReducer,
  accesories: accesoriesReducer,
  banners: bannersReducer,
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
  initialState,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
);
