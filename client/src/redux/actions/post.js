import { apis } from "../../api";
import axios from "../../axios";
import {
  ADD_COMMENT,
  ADD_POST,
  GET_POST,
  GET_POSTS,
  SET_CURRENT_PAGE,
  UPDATE_LIKES,
} from "../types";
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

// add post
export const addPost = (text) => async (dispatch) => {
  try {
    const { data } = await axios.post(apis.addPost, JSON.stringify({ text }));
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }
    dispatch({
      type: ADD_POST,
      payload: data.data,
    });
    dispatch(setAlert(data.message, "success"));
  } catch (error) {
    dispatch(setAlert(error.response.data.message, "danger"));
  }
};

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(apis.likePost + id);
    console.log(data);
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: data.data,
      },
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.message, "danger"));
  }
};

// Remove like
export const removeLike = (id) => async (dispatch) => {
  try {
    const { data } = await axios.put(apis.unlikePost + id);
    console.log(data);
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }
    dispatch({
      type: UPDATE_LIKES,
      payload: {
        id,
        likes: data.data,
      },
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.message, "danger"));
  }
};

// get a post
export const getPost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(apis.getSinglePost + id);
    console.log("hello");
    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }

    dispatch({
      type: GET_POST,
      payload: data.data,
    });
  } catch (e) {
    dispatch(setAlert(e.response.data.message, "danger"));
  }
};

// add comment
export const addComment = (postId, text) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      apis.addComment + postId,
      JSON.stringify({ text })
    );

    if (data.error) {
      dispatch(setAlert(data.message, "danger"));
    }

    dispatch({
      type: ADD_COMMENT,
      payload: data.data,
    });

    dispatch(setAlert(data.message, "success"));
  } catch (e) {
    dispatch(setAlert(e.response.data.message, "danger"));
  }
};
