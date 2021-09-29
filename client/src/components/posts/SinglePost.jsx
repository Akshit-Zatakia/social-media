import { Button, Card, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPost } from "../../redux/actions/post";

function SinglePost({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();

  // state for input
  const [text, setText] = useState("");

  // get post data from redux
  const { post } = useSelector((state) => state.post);

  // fetch a post from server
  useEffect(() => {
    dispatch(getPost(id));
  }, []);

  // send the comment
  const sendComment = (e) => {
    dispatch(addComment(id, text));
    setText("");
  };

  return (
    <div>
      <Card className="m-2 p-3">
        <Typography variant="h5">{post && post.text}</Typography>
        <Typography variant="caption">
          By: {post && post.user.firstName + " " + post.user.lastName}
        </Typography>
        <br />
        <Typography variant="caption">
          {post && moment(post.createdAt).fromNow()}
        </Typography>
      </Card>
      <Typography variant="body1" className="m-2 mt-4">
        Leave comment
      </Typography>

      <div className="comment_body">
        <TextField
          variant="outlined"
          placeholder="Tell your thoughts..."
          className="m-2"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={sendComment} class="btn btn-outline-dark">
          Send
        </button>
      </div>
      <div>
        {post &&
          post.comments.length > 0 &&
          post.comments.map((c) => {
            return (
              <div class="list-group-item list-group-item-action mb-2 mx-2">
                <div class="d-flex w-100 justify-content-between mb-2">
                  <h5 class="mb-1">{c.text}</h5>
                  <small class="text-muted">{moment(c.date).fromNow()}</small>
                </div>

                <Typography variant="caption">
                  {c.user.firstName + " " + c.user.lastName}
                </Typography>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SinglePost;
