import axios from 'axios';
import {isEmpty} from '../utils/checkIfObjIsEmpty';

/* selectors */
export const getAll = ({products}) => products;
export const getAllKits = ({products}) => products.kits;
export const getAllItemsForKids = ({products}) => products.kids;
export const getAllBooks = ({products}) => products.books;
export const getAllAccessories = ({products}) => products.accessories;

export const getFilteredProducts = ({products, filter}) => {

  const pattern = new RegExp(filter.searchPhrase, 'i');
  if(filter.searchPhrase) {
    const kits = products.kits.data.filter(kit => pattern.test(kit.name));
    const kids = products.kids.data.filter(kid => pattern.test(kid.name));
    const books = products.books.data.filter(book => pattern.test(book.name));
    const accessories = products.accessories.data.filter(accessory => pattern.test(accessory.name));

    const all = [...kits, ...kids, ...books, ...accessories];
    return all;
  }
};

/* action name creator */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */

const FETCH_ALL_START = createActionName('FETCH_ALL_START');
const FETCH_ALL_SUCCESS = createActionName('FETCH_ALL_SUCCESS');
const FETCH_ALL_ERROR = createActionName('FETCH_ALL_ERROR');

const FETCH_KITS_START = createActionName('FETCH_KITS_START');
const FETCH_KITS_SUCCESS = createActionName('FETCH_KITS_SUCCESS');
const FETCH_KITS_ERROR = createActionName('FETCH_KITS_ERROR');

const FETCH_KIDS_START = createActionName('FETCH_KIDS_START');
const FETCH_KIDS_SUCCESS = createActionName('FETCH_KIDS_SUCCESS');
const FETCH_KIDS_ERROR = createActionName('FETCH_KIDS_ERROR');

const FETCH_BOOKS_START = createActionName('FETCH_BOOKS_START');
const FETCH_BOOKS_SUCCESS = createActionName('FETCH_BOOKS_SUCCESS');
const FETCH_BOOKS_ERROR = createActionName('FETCH_BOOKS_ERROR');

const FETCH_ACCESSORIES_START = createActionName('FETCH_ACCESSORIES_START');
const FETCH_ACCESSORIES_SUCCESS = createActionName('FETCH_ACCESSORIES_SUCCESS');
const FETCH_ACCESSORIES_ERROR = createActionName('FETCH_ACCESSORIES_ERROR');

/* action creators */

export const fetchAllStarted = payload => ({ payload, type: FETCH_ALL_START });
export const fetchAllSuccess = payload => ({ payload, type: FETCH_ALL_SUCCESS });
export const fetchAllError = payload => ({ payload, type: FETCH_ALL_ERROR });

export const fetchKitsStarted = payload => ({ payload, type: FETCH_KITS_START });
export const fetchKitsSuccess = payload => ({ payload, type: FETCH_KITS_SUCCESS });
export const fetchKitsError = payload => ({ payload, type: FETCH_KITS_ERROR });

export const fetchKidsStarted = payload => ({ payload, type: FETCH_KIDS_START });
export const fetchKidsSuccess = payload => ({ payload, type: FETCH_KIDS_SUCCESS });
export const fetchKidsError = payload => ({ payload, type: FETCH_KIDS_ERROR });

export const fetchBooksStarted = payload => ({ payload, type: FETCH_BOOKS_START });
export const fetchBooksSuccess = payload => ({ payload, type: FETCH_BOOKS_SUCCESS });
export const fetchBooksError = payload => ({ payload, type: FETCH_BOOKS_ERROR });

export const fetchAccessoriesStarted = payload => ({ payload, type: FETCH_ACCESSORIES_START });
export const fetchAccessoriesSuccess = payload => ({ payload, type: FETCH_ACCESSORIES_SUCCESS });
export const fetchAccessoriesError = payload => ({ payload, type: FETCH_ACCESSORIES_ERROR });

/* thunk creators */

export const fetchAll = () => {

  return (dispatch, getState) => {    
    const state = getState();
    if(
      isEmpty(state.products.kits.data || 
        isEmpty(state.products.kids.data || 
        isEmpty(state.products.books.data) || 
        isEmpty(state.products.accessories.data)))) {
      dispatch(fetchAllStarted());
      axios
        .get('http://localhost:8000/api/products/all')
        .then(res => {
          dispatch(fetchAllSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchAllError(err.message || true));
        });
    }
  };
};

export const fetchKits = () => {

  return (dispatch, getState) => {
    const state = getState();
    if(isEmpty(state.products.kits.data)) {
      dispatch(fetchKitsStarted());
      axios
        .get('http://localhost:8000/api/products/kits')
        .then(res => {
          dispatch(fetchKitsSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchKitsError(err.message || true));
        });
    }
  };
};

export const fetchForKids = () => {
  return (dispatch, getState) => {
    const state = getState();
    if(isEmpty(state.products.kids.data)) {
      dispatch(fetchKidsStarted());
      axios
        .get('http://localhost:8000/api/products/kids')
        .then(res => {
          dispatch(fetchKidsSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchKidsError(err.message || true));
        });
    }
  };
};

export const fetchBooks = () => {

  return (dispatch, getState) => {
    const state = getState();
    if(isEmpty(state.products.books.data)) {
      dispatch(fetchBooksStarted());
      axios
        .get('http://localhost:8000/api/products/books')
        .then(res => {
          dispatch(fetchBooksSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchBooksError(err.message || true));
        });
    }
  };
};

export const fetchAccessories = () => {
  return (dispatch, getState) => {    
    const state = getState();
    if(isEmpty(state.products.kids.data)) {
      dispatch(fetchAccessoriesStarted());
      axios
        .get('http://localhost:8000/api/products/accessories')
        .then(res => {
          dispatch(fetchAccessoriesSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchAccessoriesError(err.message || true));
        });
    }
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_ALL_START: {
      return {
        kits: {
          ...statePart.kits,
          loading: {
            active: true,
            error: false,
          },
        },
        kids: {
          ...statePart.kids,
          loading: {
            active: true,
            error: false,
          },
        },
        books: {
          ...statePart.books,
          loading: {
            active: true,
            error: false,
          },
        },
        accessories: {
          ...statePart.accessories,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_ALL_SUCCESS: {
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
    case FETCH_ALL_ERROR: {
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
    case FETCH_KITS_START: {
      return {
        kits: {
          ...statePart.kits,
          loading: {
            active: true,
            error: false,
          },
        },
        ...statePart,
      };
    }
    case FETCH_KITS_SUCCESS: {
      return {
        ...statePart,
        kits: {
          data: action.payload,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_KITS_ERROR: {
      return {
        kits: {
          ...statePart.kits,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        ...statePart,
      };
    }
    case FETCH_KIDS_START: {
      return {
        kids: {
          ...statePart.kids,
          loading: {
            active: true,
            error: false,
          },
        },
        ...statePart,
      };
    }
    case FETCH_KIDS_SUCCESS: {
      return {
        ...statePart,
        kids: {
          data: action.payload,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_KIDS_ERROR: {
      return {
        kids: {
          ...statePart.kids,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        ...statePart,
      };
    }
    case FETCH_BOOKS_START: {
      return {
        books: {
          ...statePart.books,
          loading: {
            active: true,
            error: false,
          },
        },
        ...statePart,
      };
    }
    case FETCH_BOOKS_SUCCESS: {
      return {
        ...statePart,
        books: {
          data: action.payload,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_BOOKS_ERROR: {
      return {
        books: {
          ...statePart.books,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        ...statePart,
      };
    }
    case FETCH_ACCESSORIES_START: {
      return {
        accessories: {
          ...statePart.accessories,
          loading: {
            active: true,
            error: false,
          },
        },
        ...statePart,
      };
    }
    case FETCH_ACCESSORIES_SUCCESS: {
      return {
        ...statePart,
        accessories: {
          data: action.payload,
          loading: {
            active: true,
            error: false,
          },
        },
      };
    }
    case FETCH_ACCESSORIES_ERROR: {
      return {
        accessories: {
          ...statePart.accessories,
          loading: {
            active: true,
            error: action.payload,
          },
        },
        ...statePart,
      };
    }
    default:
      return statePart;
  }
};
