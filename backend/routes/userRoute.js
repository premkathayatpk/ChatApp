import express from "express";
import {
  getCurrentUser,
  updateProfile,
} from "../controllers/userController.js";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, getCurrentUser);
userRouter.put("/profile", isAuth, upload.single("image"), updateProfile);

export default userRouter;
