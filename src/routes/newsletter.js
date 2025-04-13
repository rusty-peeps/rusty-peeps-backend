import express from "express";
const router = express.Router();

import NewsLetter from "../models/newsLetter.js";
import { createNewsletter } from "../validators/joi.validator.js";

router.post("/newsletter", createNewsletter, async (req, res) => {
  try {
    const { email } = req.body;
    let isEmailExist = await NewsLetter.findOne({ email });
    if (isEmailExist) {
      return res.status(201).json({
        message: "Email already exists",
        code: 201,
      });
    }
    const newNewsLetter = new NewsLetter({
      email,
    });
    await newNewsLetter.save();
    res.status(200).json({
      data: newNewsLetter,
      message: "Successfully created.",
      code: 200,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
