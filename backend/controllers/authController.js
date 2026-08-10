const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/jwt");
const { toPublicUser } = require("../utils/formatUser");

async function signup(req, res) {
  try {
    const { name, email, password, college, branch } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, college, branch });
    const token = signToken(user._id);
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Wrong password" });

    const token = signToken(user._id);
    res.json({ token, user: toPublicUser(user) });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

async function getMe(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
}

module.exports = { signup, login, getMe };
