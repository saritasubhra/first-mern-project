const Contact = require("../models/contactModel");

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

module.exports = createContact;
