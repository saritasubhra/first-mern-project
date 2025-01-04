const User = require("../models/userModel");
const AppError = require("../utils/appError");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return next(new AppError("No users found", 404));
    }

    res.status(200).json({
      status: "success",
      results: users.length,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, deleteUser };
