import Swal from "sweetalert2";
import axios from "axios";
import { LOGIN, LOGIN_ERROR, LOGIN_REQUEST, LOGOUT } from "./auth.actionType";

export const LogIn = (creds) => async (dispatch) => {
  dispatch({
    type: LOGIN_REQUEST,
  });

  try {
    const { data } = await axios.post(
      `https://kryzen-backend-3v2h.onrender.com/user/login`,
      creds
    );
    console.log(data);

    Swal.fire({
      icon: "success",
      title: data.msg,
    });
    return dispatch({
      type: LOGIN,
      payload: data.token,
      token: localStorage.setItem("userToken", data.token),
      userUID: localStorage.setItem("userUID", data.userUID)
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    Swal.fire({
      icon: "error",
      title: message,
    });
    return dispatch({
      type: LOGIN_ERROR,
      payload: message,
    });
  }
};

export const LogOut = () => ({ type: LOGOUT });
