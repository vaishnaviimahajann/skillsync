const express = require("express");
const router = express.Router();
const { sendRequest, getConnections, respondToRequest } = require("../controllers/connectionController");
const auth = require("../middleware/auth");

router.post("/send", auth, sendRequest);
router.get("/", auth, getConnections);
router.put("/:id", auth, respondToRequest);

module.exports = router;
