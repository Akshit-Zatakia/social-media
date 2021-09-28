const { check, validationResult } = require("express-validator");
const getErrorMessage = require("../../config/error");
const router = require("express").Router();
const { hashPassword } = require("../../config/security");
// models
const Users = require("../../models/Users");

// @route  POST api/users
// @desc   Register user
// @access Public
router.post(
  "/",
  [
    check("firstName", "firstName").notEmpty(),
    check("lastName", "lastName").notEmpty(),
    check("email", "valid email").isEmail(),
    check("password", "strong password").isStrongPassword(),
  ],
  async (req, res) => {
    // check for the error message
    const message = getErrorMessage(validationResult(req));
    if (message) {
      return res.status(500).json({
        message,
        error: true,
      });
    }

    let { firstName, lastName, email, password } = req.body;

    try {
      // get the user with this email
      let user = await Users.findOne({ email });

      // if email exists then send error message
      if (user) {
        return res.status(400).json({
          message: "User already exists!",
          error: true,
        });
      }

      // hashing the password and saving it in password
      password = await hashPassword(password);

      // create new user
      user = await Users.create({
        firstName,
        lastName,
        email,
        password,
      });

      res.json({
        message: "User registered successfully",
        error: false,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
        error: true,
      });
    }
  }
);

module.exports = router;
