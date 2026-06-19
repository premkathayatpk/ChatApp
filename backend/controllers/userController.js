import User from "../models/userModel.js";

//get current user
export const getCurrentUser = async (req, res) => {
  try {
    const userId = req.userId;

    const user = await User.findById(userId).$where("-password");

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
