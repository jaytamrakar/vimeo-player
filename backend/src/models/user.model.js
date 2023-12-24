import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: [true, "Please provide an email."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: [true, "Your full name is required."],
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // * Cloudinary url
      required: [true, "Please provide an avatar."],
    },
    coverImage: {
      type: String, // * Cloudinary url
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required."],
      minlength: 6,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = 10;
  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  const payload = {
    _id: this._id,
    email: this.email,
    username: this.username,
    fullname: this.fullname,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY,
  });
};

userSchema.methods.generateRefreshToken = function () {
  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
