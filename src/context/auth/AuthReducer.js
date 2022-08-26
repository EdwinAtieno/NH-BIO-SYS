import { SIGN_IN, LOGOUT, FORGOT_PASSWORD } from './AuthActions';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN:
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...action.payload,
      };
    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
      };
    case FORGOT_PASSWORD:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default AuthReducer;
