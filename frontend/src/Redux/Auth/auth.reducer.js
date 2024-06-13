import { LOGIN, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT } from "./auth.actionType";

const initState = {
  isAuth: false,
  token: "",
};
export const authReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }

    case LOGIN: {
      return {
        ...state,
        isAuth: true,
        token: payload,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isAuth: false,
        token: "",
      };
    }

    default: {
      return state;
    }
  }
};
