import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setCurrentPage } from "../../redux/actions/post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/Loader";
import PostTile from "./PostTile";
import AddPostDialog from "./AddPostDialog";

function Post() {
  const dispatch = useDispatch();

  // get the current page number from redux
  const { currentPage, posts } = useSelector((state) => state.post);
  //  get the authentication
  const { isAuthenticated } = useSelector((state) => state.auth);

  // state for dialog
  const [open, setOpen] = useState(false);

  useEffect(() => {
    //   if authenticated then send request
    if (isAuthenticated) {
      getData();
    }
  });

  const getData = () => {
    console.log("get");
    dispatch(getPosts(currentPage + 1));
  };

  // open add dialog
  const openDialog = () => {
    setOpen(true);
  };

  return (
    <div className="m-2">
      <button onClick={(e) => openDialog()} className="btn btn-dark mb-3">
        Add Post
      </button>
      <div class="list-group">
        <InfiniteScroll
          dataLength={posts.length}
          next={getData}
          hasMore={posts.length > 0 ? true : false}
          loader={posts.length > 0 && <Loader />}
        >
          {posts &&
            posts.map((post) => {
              return <PostTile post={post} />;
            })}
        </InfiniteScroll>
      </div>
      <AddPostDialog open={open} setOpen={setOpen} />
    </div>
  );
}

export default Post;
