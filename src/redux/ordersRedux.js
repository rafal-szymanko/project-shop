import axios from 'axios';

/* selectors */

/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

const ADD_ORDER = createActionName('ADD_ORDER');


/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addOrder = payload => ({ payload, type: ADD_ORDER });



/* thunk creators */

export const addOrderRequest = (order) => {
  return async dispatch => {
    console.log(order);
    dispatch(startRequest({ name: 'ADD_ORDER' }));

    try {
      let res = await axios.post(`http://localhost:8000/api/orders`, order);
      dispatch(addOrder(res));
      dispatch(endRequest({ name: 'ADD_ORDER' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'ADD_ORDER', error: e.message }));
    }
  }; 
};

/* reducers */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    default:
      return statePart;
  }
};