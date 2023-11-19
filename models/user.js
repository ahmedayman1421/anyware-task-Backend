import bcrypt from "bcryptjs";
import validator from "validator";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Please provide your email"],
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  avatar: {
    type: String,
    default: "default.jpeg",
    required: [true, "Please provide your avatar"],
  },
  role: {
    type: String,
    enum: ["student", "instructor", "admin"],
    default: "student",
  },
  gender: {
    type: String,
    required: [true, "Please provide your Gender"],
    enum: ["male", "female"],
  },
  contact: {
    phone: { type: String },
    address: {
      street: { type: String },
      city: { type: String },
      state: { type: String },
      zipCode: { type: String },
      country: { type: String },
    },
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords are not the same!",
    },
  },
  socialProfiles: {
    twitter: { type: String },
    linkedIn: { type: String },
    github: { type: String },
    website: { type: String },
  },
  bio: { type: String },
  dateOfBirth: { type: Date },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.methods.changePasswordAfter = function (iat) {
  if (this.passwordChangedAt) {
    const changedTimesamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return iat < changedTimesamp;
  }
  return false;
};

userSchema.methods.matchPassword = async function (
  enteredPassword,
  newPassword
) {
  return await bcrypt.compare(enteredPassword, newPassword);
};

// Document MDW
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    this.passwordConfirm = undefined;

    if (!this.isNew) this.passwordChangedAt = Date.now() - 1000;
  }

  next();
});

const User = mongoose.model("User", userSchema);

export default User;
