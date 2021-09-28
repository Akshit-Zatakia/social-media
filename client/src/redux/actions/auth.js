import axios from "../../axios";
import { apis } from "../../api";

import { setAlert } from "./alert";
import { LOGIN_FAIL, LOGIN_SUCCESS, USERS_LOADED } from "../types";
import setAuthToken from "../../utils/setAuthToken";

// load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const { data } = await axios.get(apis.login);
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
      return;
    }
    dispatch({
      type: USERS_LOADED,
      payload: data.data,
    });
  } catch (e) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

// register user
export const register = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post(apis.register, JSON.stringify(body));
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
      return;
    }

    dispatch(setAlert(data.message, "success"));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

// login user
export const login = (body) => async (dispatch) => {
  try {
    const { data } = await axios.post(apis.login, JSON.stringify(body));
    console.log(data);
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
      return;
    }
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.data,
    });

    dispatch(setAlert(data.message, "success"));

    dispatch(loadUser());
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};
