const express = require("express");
const { getAllUsers, deleteUser } = require("../controllers/userController");
const { protect, restrictToAdmin } = require("../controllers/authController");

const router = express.Router();

router.use(protect, restrictToAdmin);

router.route("/").get(getAllUsers);
router.route("/:id").delete(deleteUser);

module.exports = router;
