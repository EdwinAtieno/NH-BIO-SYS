import React, { useEffect, useMemo, useReducer } from 'react';
import PropTypes from 'prop-types';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import {
  SIGN_IN_ADMIN,
  LOGOUT_ADMIN,
  FORGOT_PASSWORD_ADMIN,
} from './AuthActions';

const AuthState = ({ children }) => {
  const initialState = {
    admin: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, [], () => {
    const localData = localStorage.getItem('user');

    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(state));
  }, [state]);

  // Sign in user
  const signInAdmin = (phoneNumber, isAuth) => {
    dispatch({
      type: SIGN_IN_ADMIN,
      payload: {
        phoneNumber,
        isAuth,
      },
    });
  };

  // Logout user
  const logOutAdmin = () => {
    dispatch({
      type: LOGOUT_ADMIN,
    });
  };

  // Forgot Password
  const forgotPassword = () => {
    dispatch({
      type: FORGOT_PASSWORD_ADMIN,
    });
  };

  const value = useMemo(() => ({
    admin: state.admin,
    signInAdmin,
    logOutAdmin,
    forgotPassword,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthState;
