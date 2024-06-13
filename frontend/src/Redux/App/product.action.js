import axios from "axios";
import {
  USER_PROFILE_ERROR,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
} from "./product.actionTypes";
export const getUserProfile = () => async (dispatch) => {
  dispatch({
    type: USER_PROFILE_REQUEST,
  });
  
  const config = {
    headers: {
      authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
  };
  try {
    const { data } = await axios.get(
      `https://kryzen-backend-3v2h.onrender.com/product`,
      config
    );
    console.log(data);
    return dispatch({
      type: USER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch ({
    response: {
      data: { message },
    },
  }) {
    console.log(message);
    return dispatch({
      type: USER_PROFILE_ERROR,
      payload: message,
    });
  }
};
