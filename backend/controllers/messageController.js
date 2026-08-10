const Message = require("../models/Message");

async function getMessages(req, res) {
  try {
    const msgs = await Message.find({
      $or: [
        { sender: req.user.id, receiver: req.params.userId },
        { sender: req.params.userId, receiver: req.user.id }
      ]
    }).sort("createdAt");
    res.json(msgs);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { getMessages };
