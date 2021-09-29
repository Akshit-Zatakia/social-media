require("dotenv").config();
const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/error");
const auth = require("../../middleware/auth");
const router = require("express").Router();
const { pageLimit } = require("../../config/constant");

// models
const Post = require("../../models/Post");

// @route  POST api/post
// @desc   Create a Post
// @access Private
router.post(
  "/",
  [auth, check("text", "valid text").isString()],
  async (req, res) => {
    // check for error
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({
        message,
        error: true,
      });
    }

    // get text from request body
    const { text } = req.body;

    try {
      // creating new post
      const post = await Post.create({
        user: req.user.id,
        text,
      });

      res.json({
        data: post,
        message: "Posted successfully.",
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: e.message,
        error: true,
      });
    }
  }
);

// @route  GET api/post
// @desc   Get all posts
// @access Private
router.get("/:pageNo", auth, async (req, res) => {
  const page = parseInt(req.params.pageNo);
  try {
    let posts = await Post.find()
      .limit(pageLimit)
      .skip((page - 1) * pageLimit)
      .sort({ createdAt: -1 })
      .exec();
    if (posts.length == 0) {
      return;
    }

    res.json({
      data: posts,
      message: "Succeed!",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

// @route  PUT api/post/like/:id
// @desc   Like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params.id,
      "likes.user": req.user.id,
    });
    // Check is post has already been liked
    if (post) {
      return res
        .status(400)
        .json({ message: "Post already liked", error: true });
    }

    // add the like in post likes array
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: { user: req.user.id } } }
    );

    post = await Post.findById(req.params.id);

    res.json({
      data: post.likes,
      message: "Succeed!",
      error: false,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      error: true,
    });
  }
});

// @route  PUT api/post/unlike/:id
// @desc   Unlike a post
// @access Private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    let post = await Post.findOne({
      _id: req.params.id,
      "likes.user": req.user.id,
    });
    // Check is post has already been liked
    if (!post) {
      return res
        .status(400)
        .json({ message: "Please like the post first!", error: true });
    }

    // delete the like in post likes array
    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { likes: { user: req.user.id } } }
    );

    post = await Post.findById(req.params.id);

    res.json({
      data: post.likes,
      message: "Succeed!",
      error: false,
    });
  } catch (e) {
    console.error(e.message);
    res.status(500).send("Server error");
  }
});

// @route  POST api/post/comment/:id
// @desc   Comment on a post
// @access Private
router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").notEmpty()]],
  async (req, res) => {
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({ message, error: true });
    }
    try {
      // check if post exists
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json({
          message: "Post not found!",
          error: true,
        });
      }

      // add the comment in post comments array
      await Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: { user: req.user.id, text: req.body.text } },
      });

      post = await Post.findById(req.params.id)
        .populate({
          path: "comments",
          populate: { path: "user" },
        })
        .select("-password");

      res.json({
        data: post.comments,
        message: "Succeed!",
        error: false,
      });
    } catch (e) {
      res.status(500).json({
        message: e.message,
        error: true,
      });
    }
  }
);

// @route  DELETE api/post/comment/:id/:comment_id
// @desc   Delete a comment
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    // check if comment exists or not
    const isCommentExists = await Post.findOne({
      _id: req.params.id,
      "comments.id": req.params.comment_id,
    });
    if (!isCommentExists) {
      return res.status(400).json({
        message: "Comment not found!",
        error: true,
      });
    }

    await Post.findByIdAndUpdate(req.params.id, {
      $pull: { comments: { _id: req.params.comment_id } },
    });

    res.json({
      message: "Comment deleted!",
      error: false,
    });
  } catch (e) {
    res.status(500).json({
      message: e.message,
      error: true,
    });
  }
});

// @route  GET api/post/single/:postId
// @desc   Get a post
// @access Private
router.get("/single/:postId", auth, async (req, res) => {
  const postId = req.params.postId;
  try {
    let post = await Post.findById(postId)
      .populate("user")
      .populate({
        path: "comments",
        populate: { path: "user" },
      })
      .select("-password")
      .exec();
    if (!post) {
      return res.status(400).json({
        message: "Post not found!",
        data: [],
        error: true,
      });
    }

    res.json({
      data: post,
      message: "Succeed!",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      error: true,
    });
  }
});

module.exports = router;
