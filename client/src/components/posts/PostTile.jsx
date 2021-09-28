import React from "react";
import { Link } from "react-router-dom";

function PostTile({ post }) {
  return (
    <Link to="" class="list-group-item list-group-item-action mb-2">
      <div class="d-flex w-100 justify-content-between mb-2">
        <h5 class="mb-1">{post.text}</h5>
        <small class="text-muted">3 days ago</small>
      </div>

      <i class="bi bi-heart me-2"></i>
      <i class="bi bi-heart-fill"></i>
    </Link>
  );
}

export default PostTile;
