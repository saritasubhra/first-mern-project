const express = require("express");
const {
  getAllUsers,
  deleteUser,
  updateUser,
  getUser,
} = require("../controllers/userController");
const { protect, restrictToAdmin } = require("../controllers/authController");

const router = express.Router();

router.use(protect, restrictToAdmin);

router.route("/").get(getAllUsers);
router.route("/:id").get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
