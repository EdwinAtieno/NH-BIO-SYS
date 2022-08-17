import {
  SIGN_IN_ADMIN,
  LOGOUT_ADMIN,
  FORGOT_PASSWORD_ADMIN,
} from './AuthActions';

const AuthReducer = (state, action) => {
  switch (action.type) {
    case SIGN_IN_ADMIN:
      return {
        admin: action.payload,
      };
    case LOGOUT_ADMIN:
      return {
        admin: null,
      };
    case FORGOT_PASSWORD_ADMIN:
      return {
        ...state,
      };

    default:
      return state;
  }
};

export default AuthReducer;
