import express from "express";
const router = express.Router();
import { createContact } from "../validators/joi.validator.js";
import Contact from "../models/contact.js";

router.post("/other/contact", createContact, async (req, res) => {
  try {
    const { name, email, phone, message, agree } = req.validatedBody;
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      agree,
    });
    await newContact.save();
    res.status(201).json({
      data: newContact,
      message: "Successfully created contact",
      code: 201,
    });
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
