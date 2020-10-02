import axios from 'axios';

/* selectors */
export const getRequest = ({ newsletter }, name) => newsletter.requests[name];


/* action name creator */
const reducerName = 'newsletter';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

export const SUBSCRIBE_NEWSLETTER = createActionName('SUBSCRIBE_NEWSLETTER');


/* action creators */

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

export const subscribeNewsletter = payload => ({ payload, type: SUBSCRIBE_NEWSLETTER});



/* thunk creators */

export const addNewsletterRequest = (mail) => {
  return async dispatch => {
    dispatch(startRequest({ name: 'SUBSCRIBE_NEWSLETTER' }));

    try {
      let res = await axios.post(`http://localhost:8000/api/newsletter`, mail);
      dispatch(subscribeNewsletter(res));
      dispatch(endRequest({ name: 'SUBSCRIBE_NEWSLETTER' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'SUBSCRIBE_NEWSLETTER', error: e.message }));
    }
  }; 
};

/* reducers */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case SUBSCRIBE_NEWSLETTER:
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
