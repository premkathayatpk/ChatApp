import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/userModel.js";

//get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: `User Not FOund` });
    }
    return res
      .status(200)
      .json({ success: true, message: `Get current User Successfully`, user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Get current user error, ${error}` });
  }
};

//update profile
export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        image,
      },
      { new: true },
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Profile Error ${error}` });
  }
};

//get other user

export const getOtherUsers = async (req, res) => {
  try {
    const users = await User.find({
      _id: { $ne: req.userId },
    }).select("-password");

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: `Get other users error ${error}` });
  }
};
