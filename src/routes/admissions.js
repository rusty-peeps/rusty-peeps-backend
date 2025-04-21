import express from "express";
const router = express.Router();
import { createAdmissions } from "../validators/joi.validator.js";
import Admissions from "../models/admissions.js";

router.post("/admissions", createAdmissions, async (req, res) => {
  try {
    const {
      institution_name,
      contact_person,
      destination_role,
      phone_number,
      email_address,
      selected_course,
      start_date,
      number_of_participants,
      additional_support,
    } = req.body;
    const newBlog = new Admissions({
      institution_name,
      contact_person,
      destination_role,
      phone_number,
      email_address,
      selected_course,
      start_date,
      number_of_participants,
      additional_support,
    });
    await newBlog.save();
    res.status(201).json({
      data: newBlog,
      message: "Successfully created blog",
      code: 201,
    });
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
