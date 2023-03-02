import React, { useEffect, useMemo, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import AuthContext from './AuthContext';
import AuthReducer from './AuthReducer';

import { SIGN_IN, LOGOUT, FORGOT_PASSWORD } from './AuthActions';

const AuthState = ({ children }) => {
  const initialState = {
    isAuthenticated: false,
    user: null,
    token: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, [], () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : initialState;
  });

  const [user, setUser] = useState(state?.user);
  const [authToken, setAuthToken] = useState(state?.token);

  useEffect(() => {
    setUser(state?.user);
    setAuthToken(state?.token);
  }, [state]);

  // Sign in user
  const signIn = (token) => {
    dispatch({
      type: SIGN_IN,
      payload: {
        isAuthenticated: true,
        user: jwtDecode(token.access),
        token,
      },
    });
  };

  // Logout user
  const logOut = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // Forgot Password
  const forgotPassword = () => {
    dispatch({
      type: FORGOT_PASSWORD,
    });
  };

  const value = useMemo(() => ({
    user,
    authToken,
    setUser,
    setAuthToken,
    signIn,
    logOut,
    forgotPassword,
  }));

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthState.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthState;
