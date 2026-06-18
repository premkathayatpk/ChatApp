import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";

//signup
export const signUp = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const checkUserByUserName = await User.findOne({ userName });

    if (checkUserByUserName) {
      return res.status(400).json({ message: "UserName already exist" });
    }

    const checkUserByEmail = await User.findOne({ email });

    if (checkUserByEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 char.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: false,
    });

    return res
      .status(200)
      .json({ success: true, message: "User SignUp successfully", user });
  } catch (error) {
    console.error("Server error", error);
    return res
      .status(500)
      .json({ success: false, message: "SignUp error", error: error.message });
  }
};

//login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User Not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid email or password" });
    }

    const token = genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60 * 1000,
      sameSite: "None",
      secure: false,
    });

    return res
      .status(200)
      .json({ success: true, message: "User Login successfully", user });
  } catch (error) {
    console.error("Server error", error);
    return res
      .status(500)
      .json({ success: false, message: "Login error", error: error.message });
  }
};

//logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    return res
      .status(200)
      .json({ success: true, message: "User Logout successfully" });
  } catch (error) {
    console.error("Server error", error);
    return res
      .status(500)
      .json({ success: false, message: "Logout error", error: error.message });
  }
};
