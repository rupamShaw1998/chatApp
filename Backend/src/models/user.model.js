import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // phone: {
    //   type: String,
    // },
    // avatar: {
    //   type: String,
    //   default: "",
    // },
    // bio: {
    //   type: String,
    //   default: "",
    // },
    // date_of_birth: {
    //   type: Date,
    //   default: null,
    // },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
