const Message = require("../models/Message");

function registerSocketHandlers(io) {
  const onlineUsers = {};

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      onlineUsers[userId] = socket.id;
    });

    socket.on("send_message", async ({ senderId, receiverId, text }) => {
      const msg = await Message.create({ sender: senderId, receiver: receiverId, text });
      const receiverSocket = onlineUsers[receiverId];
      if (receiverSocket) io.to(receiverSocket).emit("receive_message", msg);
      socket.emit("message_sent", msg);
    });

    socket.on("disconnect", () => {
      for (const [uid, sid] of Object.entries(onlineUsers)) {
        if (sid === socket.id) { delete onlineUsers[uid]; break; }
      }
    });
  });
}

module.exports = registerSocketHandlers;
