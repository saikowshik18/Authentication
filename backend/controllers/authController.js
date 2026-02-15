import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};


export const signup = async (req, res) => {
    const { name, email, password } = req.body;
  
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
  
    res.status(201).json({
      token: generateToken(user._id),
    });
  };

  


  export const login = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });
  
    res.json({
      token: generateToken(user._id),
    });
  };

  






  export const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found" });
  
    const resetToken = crypto.randomBytes(32).toString("hex");
  
    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 10 * 60 * 1000;
  
    await user.save();
  
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  
    const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  
    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset",
      html: `<p>Click here to reset password:</p>
             <a href="${resetURL}">${resetURL}</a>`,
    });
  
    res.json({ message: "Reset email sent" });
  };

  





  export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });
  
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
  
    await user.save();
  
    res.json({ message: "Password reset successful" });
  };
  