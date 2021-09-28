const e = require("express");
const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/error");
const auth = require("../../middleware/auth");
const router = require("express").Router();

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
router.get("/", auth, async (req, res) => {});

module.exports = router;
