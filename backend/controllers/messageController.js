import uploadOnCloudinary from "../config/cloudinary.js";
import { upload } from "../middleware/multer";
import Conversation from "../models/conversationModel.js";
import Message from "../models/messageModel.js";

// send message
export const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] },
    });

    let newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        partcipants: [sender, receiver],
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.error(error);
    return req.status(500).json({ message: "send message error" });
  }
};

//
export const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const receiver = req.params;

    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] },
    }).populate("messages");

    if (!conversation) {
      res.status(404).json({ message: "Conversation is not found" });
    }

    return req.status(200).json(conversation?.messages);
  } catch (error) {
    console.error(error);
    return req.status(500).json({ message: "get message error" });
  }
};
