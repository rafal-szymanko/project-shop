import axios from 'axios';
import {isEmpty} from '../utils/checkIfObjIsEmpty';


/* selectors */
export const getAllBanners = ({banners}) => banners.data;

/* action name creator */
const reducerName = 'banners';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_BANNERS_START = createActionName('FETCH_BANNERS_START');
const FETCH_BANNERS_SUCCESS = createActionName('FETCH_BANNERS_SUCCESS');
const FETCH_BANNERS_ERROR = createActionName('FETCH_BANNERS_ERROR');

/* action creators */
export const fetchBannersStarted = payload => ({ payload, type: FETCH_BANNERS_START });
export const fetchBannersSuccess = payload => ({ payload, type: FETCH_BANNERS_SUCCESS });
export const fetchBannersError = payload => ({ payload, type: FETCH_BANNERS_ERROR });

/* thunk creators */

export const fetchAllBanners = () => {

  return (dispatch, getState) => {

    const state = getState();

    if(isEmpty(state.banners.data)) {
      dispatch(fetchBannersStarted());
      axios
        .get('http://localhost:8000/api/banners')
        .then(res => {
          dispatch(fetchBannersSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchBannersError(err.message || true));
        });
    }
  };
};


/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_BANNERS_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_BANNERS_SUCCESS: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: false,
        },
        data: action.payload,
      };
    }
    case FETCH_BANNERS_ERROR: {
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
