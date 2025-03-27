import express from "express";
const router = express.Router();

import NewsLetter from "../models/newsLetter.js";
import { createNewsletter } from "../validators/joi.validator.js";

router.post("/newsletter", createNewsletter, async (req, res) => {
  try {
    const { email } = req.body;
    const newNewsLetter = new NewsLetter({
      email,
    });
    await newNewsLetter.save();
    res.status(201).json({
      data: newNewsLetter,
      message: "Successfully created newsletter",
      code: 201,
    });
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/newsletter", async (req, res) => {
  try {
    const newsletters = await NewsLetter.find();
    res.status(200).json({
      data: newsletters,
      message: "Successfully fetched all newsletters",
      code: 200,
    });
  } catch (err) {
    res.status(500).json({ status: "failed", error: err.message });
  }
});

export default router;
