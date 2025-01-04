const express = require("express");
const {
  createContact,
  getAllContacts,
  deleteContact,
} = require("../controllers/contactController");
const { protect, restrictToAdmin } = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(protect, restrictToAdmin, getAllContacts)
  .post(createContact);
router.route("/:id").delete(protect, restrictToAdmin, deleteContact);

module.exports = router;
