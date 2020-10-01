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
    products: [{
      image: 'manchester-united-heritage-football-size-5.jpg',
      name: 'Manchester United Heritage Football - Size 5',
      price: 39,
      productId: '5f70976bea54e60e487b199d',
      quantity: '2',
    }],
    totalAmount: 78,
  },
  banners: {
    data: {},
    loading: {
      active: false,
      error: false,
    },
  },
};
