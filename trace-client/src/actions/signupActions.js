import api from "../api";
import { SUCCESS_MESSAGE } from "./types";
/*
import { userLoggedIn } from "./authActions";
*/

export const signup = data => dispatch =>
  api.auth.signup(data).then(data => {
    dispatch(successMessage());
  });

// Success
export const successMessage = () => {
  return {
    type: SUCCESS_MESSAGE
  };
};
