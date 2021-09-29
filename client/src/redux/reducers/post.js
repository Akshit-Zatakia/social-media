import {
  GET_POSTS,
  GET_POST,
  SET_CURRENT_PAGE,
  ADD_POST,
  UPDATE_LIKES,
  ADD_COMMENT,
} from "../types";

const initialState = {
  currentPage: 0,
  posts: [],
  post: null,
  loading: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: [...state.posts, ...payload],
        currentPage: state.currentPage + 1,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case UPDATE_LIKES:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        loading: false,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: payload,
        },
        loading: false,
      };
    default:
      return state;
  }
}
