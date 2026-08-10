const express = require("express");
const router = express.Router();
const { updateProfile, discoverUsers } = require("../controllers/userController");
const auth = require("../middleware/auth");

router.put("/profile", auth, updateProfile);
router.get("/discover", auth, discoverUsers);

module.exports = router;
