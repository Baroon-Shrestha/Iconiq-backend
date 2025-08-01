const mongoose = require("mongoose");

const ChatMessageSchema = new mongoose.Schema({
  sender: {
    type: String,
    enum: ["admin", "user"],
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const ChatMessage = mongoose.model("ChatMessage", ChatMessageSchema);

module.exports = ChatMessage;
