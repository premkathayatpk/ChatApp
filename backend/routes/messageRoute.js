import express from "express";

import isAuth from "../middleware/isAuth.js";
import { getMessages, sendMessage } from "../controllers/messageController.js";
import { upload } from "../middleware/multer.js";

const messageRoute = express.Router();

messageRoute.post(
  "/send/:receiver",
  isAuth,
  upload.single("image"),
  sendMessage,
);
messageRoute.get(
  "/get/:receiver",
  isAuth,

  getMessages,
);

export default messageRoute;
