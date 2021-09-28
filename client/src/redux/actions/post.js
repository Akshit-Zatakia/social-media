import { apis } from "../../api";
import axios from "../../axios";
import { GET_POSTS, SET_CURRENT_PAGE } from "../types";
import { setAlert } from "./alert";

// set the current page
export const setCurrentPage = (page) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page,
  });
};

// get all posts
export const getPosts = (page) => async (dispatch) => {
  try {
    const { data } = await axios.get(apis.getPost + `/${page}`);
    console.log(data);
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }
    dispatch({
      type: GET_POSTS,
      payload: data.data,
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};
