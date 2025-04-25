import { Schema, model } from "mongoose";

const admissionsSchema = new Schema(
  {
    institution_name: {
      type: String,
      required: true,
    },
    contact_person: {
      type: String,
      required: true,
    },
    destination_role: {
      type: String,
      required: true,
    },
    phone_number: {
      type: String,
      required: true,
    },
    email_address: {
      type: String,
      required: true,
    },
    selected_course: {
      type: String,
      required: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    number_of_participants: {
      type: Number,
      required: true,
    },
    additional_support: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
export default model("Admissions", admissionsSchema);
