const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/error");
const { comparePassword, generateToken } = require("../../config/security");
const auth = require("../../middleware/auth");

// models
const Users = require("../../models/Users");

// @route  GET api/auth
// @desc   Get authenticated user
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");

    // check for if user not found
    if (!user) {
      return res.status(400).json({
        message: "No user found!",
        error: true,
      });
    }
    res.json({ data: user, message: "Succeed!", error: false });
  } catch (e) {
    res.status(500).json({ message: e.message, error: true });
  }
});

// @route  POST api/auth
// @desc   Authenticate user & get token
// @access Public
router.post(
  "/",
  [
    check("email", "valid email").isEmail(),
    check("password", "password").notEmpty(),
  ],
  async (req, res) => {
    // check for error messages
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(400).json({ message, error: true });
    }

    // get values from request body
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({ email });
      // See if user exists
      if (!user) {
        return res
          .status(400)
          .json({ message: "User is not registered!", error: true });
      }

      //   check if password is correct or not
      if (!(await comparePassword(password, user.password))) {
        return res
          .status(400)
          .json({ message: "Please provide valid password!", error: true });
      }

      // creating payload for JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      //   generating token
      const token = await generateToken(payload);

      //   returning token
      res.json({
        message: "Logged in successfully",
        data: token,
        error: false,
      });
    } catch (e) {
      res.status(500).json({
        message: e,
        message,
        error: true,
      });
    }
  }
);

module.exports = router;
