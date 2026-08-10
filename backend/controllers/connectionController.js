const Connection = require("../models/Connection");

async function sendRequest(req, res) {
  try {
    const { receiverId } = req.body;
    const existing = await Connection.findOne({ sender: req.user.id, receiver: receiverId });
    if (existing) return res.status(400).json({ msg: "Request already sent" });

    const conn = await Connection.create({ sender: req.user.id, receiver: receiverId });
    res.json(conn);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

async function getConnections(req, res) {
  try {
    const incoming = await Connection.find({ receiver: req.user.id, status: "pending" })
      .populate("sender", "-password");
    const sent = await Connection.find({ sender: req.user.id, status: "pending" })
      .populate("receiver", "-password");
    const friends = await Connection.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
      status: "accepted"
    }).populate("sender receiver", "-password");

    res.json({ incoming, sent, friends });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

async function respondToRequest(req, res) {
  try {
    const { status } = req.body;
    const conn = await Connection.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(conn);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

module.exports = { sendRequest, getConnections, respondToRequest };
