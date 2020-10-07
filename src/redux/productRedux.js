import axios from 'axios';

/* selectors */
export const getById = ({product}) => product.data;


/* action name creator */
const reducerName = 'product';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_PRODUCT_START = createActionName('FETCH_PRODUCT_START');
const FETCH_PRODUCT_SUCCESS = createActionName('FETCH_PRODUCT_SUCCESS');
const FETCH_PRODUCT_ERROR = createActionName('FETCH_PRODUCT_ERROR');

/* action creators */
export const fetchProductStarted = payload => ({ payload, type: FETCH_PRODUCT_START });
export const fetchProductSuccess = payload => ({ payload, type: FETCH_PRODUCT_SUCCESS });
export const fetchProductError = payload => ({ payload, type: FETCH_PRODUCT_ERROR });

/* thunk creators */

export const fetchItem = (id) => {

  return (dispatch, getState) => {    
    dispatch(fetchProductStarted());
    axios
      .get(`http://localhost:8000/api/products/${id}`)
      .then(res => {
        dispatch(fetchProductSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchProductError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_PRODUCT_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_PRODUCT_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_PRODUCT_ERROR: {
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
