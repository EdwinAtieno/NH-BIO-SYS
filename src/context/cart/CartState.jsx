import { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';
import CartReducer from './CartReducer';

const CartState = ({ children }) => {
  const storage = localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];

  const persistCart = (cartItems) => {
    localStorage.setItem(
      'cart',
      JSON.stringify(cartItems.length > 0 ? cartItems : [])
    );
  };

  const initialState = {
    cartItems: storage,
    ...persistCart(storage),
  };
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    persistCart(state.cartItems);
  }, [state.cartItems]);

  const addToCart = (payload) => {
    dispatch({ type: 'ADD_TO_CART', payload });
  };

  const increase = (product, quantity = 1) => {
    dispatch({
      type: 'INCREASE',
      payload: {
        product,
        quantity,
      },
    });
  };

  const decrease = (product, quantity = 1) => {
    dispatch({
      type: 'DECREASE',
      payload: {
        product,
        quantity,
      },
    });
  };

  const removeFromCart = (payload) => {
    dispatch({ type: 'REMOVE_ITEM', payload });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR' });
  };

  const isInCart = (commodity) => {
    return !!state.cartItems.find((item) => item.id === commodity.id);
  };

  const value = useMemo(() => ({
    showCart: state.showCart,
    cartItems: state.cartItems,
    numberOfCartItems: state.cartItems.length,
    addToCart,
    removeFromCart,
    increase,
    decrease,
    clearCart,
    isInCart,
    ...state,
  }));

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

CartState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CartState;
