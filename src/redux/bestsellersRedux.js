import axios from 'axios';
import {isEmpty} from '../utils/checkIfObjIsEmpty';


/* selectors */
export const getAllBestsellers = ({bestsellers}) => bestsellers;

/* action name creator */
const reducerName = 'bestsellers';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_BESTSELLERS_START = createActionName('FETCH_BESTSELLERS_START');
const FETCH_BESTSELLERS_SUCCESS = createActionName('FETCH_BESTSELLERS_SUCCESS');
const FETCH_BESTSELLERS_ERROR = createActionName('FETCH_BESTSELLERS_ERROR');

/* action creators */
export const fetchBestsellersStarted = payload => ({ payload, type: FETCH_BESTSELLERS_START });
export const fetchBestsellersSuccess = payload => ({ payload, type: FETCH_BESTSELLERS_SUCCESS });
export const fetchBestsellersError = payload => ({ payload, type: FETCH_BESTSELLERS_ERROR });

/* thunk creators */

export const fetchBestsellers = () => {

  return (dispatch, getState) => { 
    const state = getState();
    if(
      isEmpty(state.bestsellers.kits.data || 
        isEmpty(state.bestsellers.kids.data || 
        isEmpty(state.bestsellers.books.data) || 
        isEmpty(state.bestsellers.accessories.data)))) {
      dispatch(fetchBestsellersStarted());
      axios
        .get('http://localhost:8000/api/products/bestsellers')
        .then(res => {
          dispatch(fetchBestsellersSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchBestsellersError(err.message || true));
        });
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_BESTSELLERS_START: {
      return {
        kits: {
          ...statePart,
          loading: {
            active: true,
            error: false,
          },
        },
        kids: {
          ...statePart,
          loading: {
            active: true,
            error: false,
          },
        },
        books: {
          ...statePart,
          loading: {
            active: true,
            error: false,
          },
        },
        accessories: {
          ...statePart,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_BESTSELLERS_SUCCESS: {
      return {
        kits: {
          data: action.payload.filter(item => item.section === 'kits'),
          loading: {
            active: true,
            error: false,
          },
        },
        kids: {
          data: action.payload.filter(item => item.section === 'kids'),
          loading: {
            active: true,
            error: false,
          },
        },
        books: {
          data: action.payload.filter(item => item.section === 'books'),

          loading: {
            active: true,
            error: false,
          },
        },
        accessories: {
          data: action.payload.filter(item => item.section === 'accessories'),
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_BESTSELLERS_ERROR: {
      return {
        kits: {
          ...statePart,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        kids: {
          ...statePart,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        books: {
          ...statePart,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        accessories: {
          ...statePart,
          loading: {
            active: true,
            error: action.payload,
          },
        },
      };
    }
    default:
      return statePart;
  }
};
