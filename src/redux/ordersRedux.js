import axios from 'axios';

/* selectors */
export const getRequest = ({ order }, name) => order.requests[name];


/* action name creator */
const reducerName = 'order';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const ADD_ORDER = createActionName('ADD_ORDER');


/* action creators */

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const addOrder = payload => ({ payload, type: ADD_ORDER });



/* thunk creators */

export const addOrderRequest = (order) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_ORDER' }));

    try {
      let res = await axios.post(`http://localhost:8000/api/orders`, order);
      dispatch(addOrder(res));
      dispatch(endRequest({ name: 'ADD_ORDER' }));
      localStorage.clear();
    } catch(e) {
      dispatch(errorRequest({ name: 'ADD_ORDER', error: e.message }));
    }
  }; 
};

/* reducers */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_ORDER:
      return { ...statePart, data: [...statePart.data, action.payload] };
    case START_REQUEST:
      return { ...statePart, requests: {...statePart.requests, [action.payload.name]: { pending: true, error: null, success: false }} };
    case END_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: null, success: true }} };
    case ERROR_REQUEST:
      return { ...statePart, requests: { ...statePart.requests, [action.payload.name]: { pending: false, error: action.payload.message, success: false }} };
    default:
      return statePart;
  }
};
