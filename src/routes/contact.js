import express from "express";
const router = express.Router();
import { createContact } from "../validators/joi.validator.js";
import Contact from "../models/contact.js";

router.post("/other/contact", createContact, async (req, res) => {
  try {
    const { name, email, phone, message,agree } = req.validatedBody;
    const newContact = new Contact({
      name,
      email,
      phone,
      message,
      agree
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

router.get("/other/contact", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      data: contacts,
      message: "Successfully fetched all contacts",
      code: 200,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
});


router.get("/other/contact/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json({
      data: contact,
      message: "Successfully fetched contact",
      code: 200,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
