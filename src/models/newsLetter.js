import { Schema, model } from "mongoose";

const newsLetterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
export default model("NewsLetter", newsLetterSchema);
