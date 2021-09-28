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
      await Post.create({
        user: req.user.id,
        text,
      });

      res.json({
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
      .exec();
    if (posts.length == 0) {
      return res.status(400).json({
        message: "No posts available!",
        data: [],
        error: true,
      });
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
    const post = await Post.findOne({
      _id: req.params.id,
      "likes.user": req.user.id,
    });
    // Check is post has already been liked
    if (post) {
      return res
        .status(400)
        .json({ message: "Post already liked", error: true });
    }

    await Post.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { likes: { user: req.user.id } } }
    );
    res.json({
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
    const post = await Post.findById(req.params.id);
    // Check is post has already been liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }
    // Get remove index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
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
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select("-password");
      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (e) {
      console.error(e.message);
    }
  }
);

// @route  DELETE api/post/comment/:id/:comment_id
// @desc   Delete a comment
// @access Private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);
    post.comments.splice(removeIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (e) {
    console.error(e.message);
    if (e.kind === "ObjectId") {
      return res.status(404).json({ msg: "Comment not found" });
    }
    res.status(500).send("Server error");
  }
});

module.exports = router;
