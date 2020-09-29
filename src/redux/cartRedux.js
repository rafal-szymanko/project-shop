
/* selectors */
export const getCartItems = ({cart}) => cart;
export const getTotalAmount = ({cart}) => cart.totalAmount;


/* action name creator */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* action types */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const COUNT_TOTAL_AMOUNT = createActionName('COUNT_TOTAL_AMOUNT');
const REMOVE_FROM_CART  = createActionName('REMOVE_FROM_CART');

/* action creators */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const countTotalAmount = payload => ({ payload, type: COUNT_TOTAL_AMOUNT });
export const removeFromCart = payload => ({ payload, type: REMOVE_FROM_CART });


/* reducer */
export const reducer = (statePart = [], action = {}) => {
    
  switch (action.type) {
    case ADD_TO_CART: {
      console.log(statePart.products);
      return  {
        ...statePart,
        products: [...statePart.products, action.payload],
      };
    }
    case COUNT_TOTAL_AMOUNT: {
      console.log(action.payload);
      return  {
        totalAmount: action.payload,
        products: [
          ...statePart.products,
        ],
      };
    }
    case REMOVE_FROM_CART: {
      return {
        ...statePart,
        products: statePart.products.filter(obj => obj.productId !== action.payload),
      };
    }
    default:
      return statePart;
  }
};
