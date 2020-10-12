export const initialState = {
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
    products: [],
    totalAmount: 0,
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
};
