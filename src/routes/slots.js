import express from "express";
const router = express.Router();
import crypto from "crypto";
import Slot from "../models/slot.js";
import Razorpay from "../utils/razorpay.js";
import createGoogleMeet from "../utils/googleMeet.js";
import dotenv from "dotenv";
dotenv.config();
import { createOrder, createSlot } from "../validators/joi.validator.js";
router.post("/slots/order", createOrder, async (req, res) => {
  try {
    const order = await Razorpay.orders.create({
      amount: req.validatedBody.amount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    const newSlot = new Slot({
      order_id: order.id,
      price: req.validatedBody.amount,
      payment_status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await newSlot.save();

    return res.status(200).json({
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (err) {
    console.error("Error during payment:", err);
    return res.status(500).json({ status: "failed", error: err.message });
  }
});
async function validateWebhookSignature(payload, signature, secret) {
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload, "utf8")
    .digest("hex");
  return generatedSignature === signature;
}

router.post("/slots/webhook", async (req, res) => {
  try {
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      return res.status(500).json({ message: "Webhook secret missing" });
    }

    const receivedSignature = req.headers["x-razorpay-signature"];
    let isValid = await validateWebhookSignature(
      JSON.stringify(JSON.parse(req.rawBody)),
      receivedSignature,
      webhookSecret
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid Signature" });
    }
    const event = req.body.event;

    if (event === "payment.captured") {
      const { order_id, id, amount, status, method, email } =
        req.body.payload.payment.entity;

      await Slot.findOneAndUpdate(
        { order_id },
        {
          payment_status: "captured",
          payment_method: method,
          email: email,
          payment_id: id,
          updatedAt: new Date(),
          isBooked: true,
        }
      );

      res
        .status(200)
        .json({ message: "Payment Captured & Updated Successfully" });
    } else {
      console.warn(`Unhandled Webhook Event: ${event}`);
      res.status(400).json({ message: "Unhandled Webhook Event" });
    }
  } catch (err) {
    console.error("Error in webhook", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/slots/book", createSlot, async (req, res) => {
  try {
    const { paymentId } = req.validatedBody;
    const slot = await Slot.findOne({ order_id: paymentId });

    if (!slot) {
      return res
        .status(404)
        .json({ message: "Slot not found for this payment" });
    }

    Object.assign(slot, req.validatedBody, { updatedAt: new Date() });

    await slot.save();

    return res
      .status(200)
      .json({ message: "Slot updated successfully", data: slot });
  } catch (err) {
    console.error("Error updating slot:", err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/slots/status/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    const slot = await Slot.findOne({ paymentId: orderId });

    if (!slot) {
      return res.status(404).json({ message: "Slot not found" });
    }
    return res.status(200).json({
      payment_status: slot.payment_status,
      slotDetails: slot,
    });
  } catch (error) {
    console.error("Error checking slot status:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/slots/:id", async (req, res) => {
  try {
    const slot = await Slot.findById(req.params.id);
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/slots", async (req, res) => {
  try {
    const slots = await Slot.find();
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/slots/:id", async (req, res) => {
  try {
    const slot = await Slot.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body,
      { new: true }
    );
    if (!slot) return res.status(404).json({ message: "Slot not found" });
    res.status(200).json(slot);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
