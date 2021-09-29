import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { IconButton } from "@mui/material";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useDispatch } from "react-redux";
import { addLike, removeLike } from "../../redux/actions/post";

function PostTile({ post }) {
  const dispatch = useDispatch();

  return (
    <div class="list-group-item list-group-item-action mb-2">
      <div class="d-flex w-100 justify-content-between mb-2">
        <h5 class="mb-1">{post.text}</h5>
        <small class="text-muted">{moment(post.createdAt).fromNow()}</small>
      </div>
      <span>{post.likes.length}</span>
      <IconButton
        onClick={(e) => {
          dispatch(addLike(post._id));
        }}
      >
        <ThumbUpIcon color="action" />
      </IconButton>
      <IconButton
        onClick={(e) => {
          dispatch(removeLike(post._id));
        }}
      >
        <ThumbDownIcon color="disabled" />
      </IconButton>
      <Link
        to={"/post/" + post._id}
        className="btn btn-outline-dark btn-sm ms-3"
      >
        Discussion
      </Link>
    </div>
  );
}

export default PostTile;
