import { Schema, model } from "mongoose";

const slotSchema = new Schema(
  {
    start_date: { type: Date },
    end_date: { type: Date },
    isBooked: { type: Boolean, default: false },

    // User details (only required when booked)
    name: {
      type: String,
      required: function () {
        return this.isBooked;
      },
    },
    email: {
      type: String,
      required: function () {
        return this.isBooked;
      },
    },
    phone: { type: String },

    // Course & Payment Information
    courseId: {
      type: String,
      required: function () {
        return this.isBooked;
      },
    },
    price: {
      type: Number,
      required: function () {
        return this.isBooked;
      },
    },

    order_id: { type: String, unique: true, sparse: true }, // Ensuring unique order IDs
    paymentId: { type: String, unique: true, sparse: true }, // Unique for tracking payments
    payment_status: {
      type: String,
      enum: ["pending", "captured", "failed"],
      default: "pending",
    },
    payment_method: { type: String },

    inviteUrl: { type: String },

    // Timestamps (handled automatically)
  },
  {
    timestamps: true, // Auto-adds createdAt & updatedAt
  }
);

// Index for faster queries
slotSchema.index({ paymentId: 1 });
slotSchema.index({ order_id: 1 });

export default model("Slot", slotSchema);
