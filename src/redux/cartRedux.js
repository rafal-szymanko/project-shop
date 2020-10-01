
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

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });
export const updateCart = payload => ({ payload, type: UPDATE_CART });
export const clearCart = payload => ({ payload, type: CLEAR_CART });


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
