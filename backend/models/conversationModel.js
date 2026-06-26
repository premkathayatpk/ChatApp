import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    partcipants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [{ type: String }],
  },
  { timestamps: true },
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
export default Conversation;
