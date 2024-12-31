const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const signUp = async (req, res, next) => {
  try {
    const { fullname, email, password, passwordConfirm } = req.body;

    const user = await User.create({
      fullname,
      email,
      password,
      passwordConfirm,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      status: "success",
      message: "User created successfully",
      token,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      err,
    });
  }
};

const logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide email and password");
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Please provide valid email and password");
    }
    // const token = generateToken(user._id);

    res.status(200).json({
      status: "success",
      message: "Log in successful",
    });
  } catch (err) {
    res.status(400).send({
      status: "fail",
      error: err.message,
      err,
    });
  }
};

module.exports = { signUp, logIn };
