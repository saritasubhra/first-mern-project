const Contact = require("../models/contactModel");
const AppError = require("../utils/appError");

const createContact = async (req, res, next) => {
  try {
    const { fullname, email, message } = req.body;
    const contact = await Contact.create({ fullname, email, message });

    res.status(201).json({
      status: "success",
      message: "message sent successsfully",
      contact,
    });
  } catch (err) {
    next(err);
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    if (!contacts) {
      return next(new AppError("No contacts found", 404));
    }

    res.status(200).json({
      status: "success",
      results: contacts.length,
      data: contacts,
    });
  } catch (err) {
    next(err);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "Deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { createContact, getAllContacts, deleteContact };
