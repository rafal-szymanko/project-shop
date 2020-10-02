
/* selectors */
export const getCartItems = ({cart}) => cart;
export const getTotalAmount = ({cart}) => cart.totalAmount;


/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const REMOVE_FROM_CART  = createActionName('REMOVE_FROM_CART');
const UPDATE_CART  = createActionName('UPDATE_CART');
const CLEAR_CART  = createActionName('CLEAR_CART');

const START_REQUEST = createActionName('START_REQUEST');
const END_REQUEST = createActionName('END_REQUEST');
const ERROR_REQUEST = createActionName('ERROR_REQUEST');

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const updateCart = payload => ({ payload, type: UPDATE_CART });
export const clearCart = payload => ({ payload, type: CLEAR_CART });

export const startRequest = payload => ({ payload, type: START_REQUEST });
export const endRequest = payload => ({ payload, type: END_REQUEST });
export const errorRequest = payload => ({ payload, type: ERROR_REQUEST });

/* thunk creators */

export const addItemRequest = (data) => {

  return async dispatch => {
    dispatch(startRequest({ name: 'ADD_TO_CART' }));
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    try {
      let cart = {};

      if(cartProducts === null) {
        cart = {
          products: [data.cart],
          totalAmount: data.amount,
        };
      } else {
        cart = {
          products: [data.cart, ...cartProducts.products],
          totalAmount: data.amount,
        };
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      dispatch(addToCart(data));
      dispatch(endRequest({ name: 'ADD_TO_CART' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'ADD_TO_CART', error: e.message }));
    }
  }; 
};

export const removeItemRequest = (data) => {

  return async dispatch => {
    dispatch(startRequest({ name: 'REMOVE_FROM_CART' }));
    const cartProducts = JSON.parse(localStorage.getItem('cart'));
    const filtered = cartProducts.products.filter(obj => obj.productId !== data.id);
    console.log(data.amount);
    try {
      let cart = {};

      if(filtered.length === 0) {
        cart = {
          products: [],
          totalAmount: 0,
        };
      } else {
        cart = {
          products: filtered,
          totalAmount: data.amount,
        };
      }
      localStorage.setItem('cart', JSON.stringify(cart));

      dispatch(removeFromCart(data));
      dispatch(endRequest({ name: 'REMOVE_FROM_CART' }));
  
    } catch(e) {
      dispatch(errorRequest({ name: 'REMOVE_FROM_CART', error: e.message }));
    }
  }; 
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return  {
        totalAmount: action.payload.amount,
        products: [...statePart.products, action.payload.cart],
      };
    }
    case UPDATE_CART: {
      const filtered = statePart.products.filter(obj => obj.productId === action.payload.id);
      Object.assign(filtered[0], {comment: action.payload.text});
      return {
        ...statePart,
        products: [...statePart.products],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        totalAmount: action.payload.amount,
        products: statePart.products.filter(obj => obj.productId !== action.payload.id),
      };
    }
    case CLEAR_CART: {
      return  {
        totalAmount: 0,
        products: [],
      };
    }
    default:
      return statePart;
  }
};
