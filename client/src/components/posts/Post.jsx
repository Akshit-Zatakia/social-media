import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts, setCurrentPage } from "../../redux/actions/post";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "../loader/Loader";
import PostTile from "./PostTile";

function Post() {
  const dispatch = useDispatch();

  // get the current page number from redux
  const { currentPage, posts } = useSelector((state) => state.post);
  //  get the authentication
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    //   if authenticated then send request
    if (isAuthenticated) {
      getData();
    }
  }, []);

  const getData = () => {
    dispatch(getPosts(currentPage + 1));
  };

  return (
    <div className="m-2">
      {/* <button className="rounded-circle border border-white mx-auto">+</button> */}
      <div class="list-group">
        <InfiniteScroll
          dataLength={posts.length}
          next={getData}
          hasMore={true}
          loader={<Loader />}
        >
          {posts &&
            posts.map((post) => {
              return <PostTile post={post} />;
            })}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default Post;
