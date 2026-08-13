const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  college:  { type: String, default: "" },
  branch:   { type: String, default: "" },
  bio:      { type: String, default: "" },
  skills:   [String],
  github:   { type: String, default: "" },
  linkedin: { type: String, default: "" },
  avatar:   { type: String, default: "" },
  resumeUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
