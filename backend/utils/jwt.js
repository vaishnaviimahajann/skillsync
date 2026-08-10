const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "skillsync_secret_2026";

function signToken(userId) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

module.exports = { signToken, verifyToken, JWT_SECRET };
