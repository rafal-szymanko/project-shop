import {initialState} from './initialState';

const local = JSON.parse(localStorage.getItem('cart'));

let state = {};

if(local) {
  state = {
    bestsellers: {
      kits: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      kids: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      books: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      accessories: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
    },
    
    products: {
      kits: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      kids: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      books: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
      accessories: {
        data: {},
        loading: {
          active: false,
          error: false,
        },
      },
    },
    product: {
      data: {},
      loading: {
        active: false,
        error: false,
      },
    },
    cart: {
      products: local.products,
      totalAmount: local.totalAmount,
    },
    banners: {
      data: {},
      loading: {
        active: false,
        error: false,
      },
    },
    order: {
      data: [],
      requests: [],
    },
    newsletter: {
      data: [],
      requests: [],
    },
    filter : '',
  };
}

  

export const persistedState = local
  ? state
  : initialState;

