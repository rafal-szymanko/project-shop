import axios from 'axios';

/* selectors */
export const getAllBestsellers = ({products}) => products;
export const getAll = ({products}) => products;
export const getAllKits = ({products}) => products.kits;
export const getAllItemsForKids = ({products}) => products.kids;
export const getAllBooks = ({products}) => products.books;
export const getAllAccessories = ({products}) => products.accessories;


/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');

/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });

/* thunk creators */

export const fetchBestsellers = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/bestsellers')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAll = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/all')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchKits = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/kits')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchForKids = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/kids')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchBooks = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/books')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

export const fetchAccessories = () => {

  return (dispatch, getState) => {    
    dispatch(fetchStarted());
    axios
      .get('http://localhost:8000/api/products/accessories')
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
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
    case FETCH_SUCCESS: {
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
    case FETCH_ERROR: {
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
