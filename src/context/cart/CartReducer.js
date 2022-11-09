import {
  REMOVE_ITEM,
  ADD_TO_CART,
  INCREASE,
  DECREASE,
  CLEAR,
} from './CartActions';

const CartReducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        const data = {
          id: action.payload.id,
        };
        state.cartItems.push({
          ...data,
          quantity: 1,
        });
      }

      return {
        ...state,
        cartItems: [...state.cartItems],
      };

    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };

    case INCREASE:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.id !== action.payload.product.id
          ),
          {
            id: action.payload.product.id,
            quantity:
              state.cartItems.find(
                (item) => item.id === action.payload.product.id
              ).quantity + action.payload.quantity,
          },
        ],
      };

    case DECREASE:
      return {
        ...state,
        cartItems: [
          ...state.cartItems.filter(
            (item) => item.id !== action.payload.product.id
          ),
          {
            id: action.payload.product.id,
            quantity:
              state.cartItems.find(
                (item) => item.id === action.payload.product.id
              ).quantity - action.payload.quantity,
          },
        ],
      };

    case CLEAR:
      return {
        cartItems: [],
      };

    default:
      return state;
  }
};

export default CartReducer;
