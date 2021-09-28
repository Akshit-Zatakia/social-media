import { GET_POSTS, SET_CURRENT_PAGE } from "../types";

const initialState = {
  currentPage: 0,
  posts: [],
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
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    default:
      return state;
  }
}
