import asyncHandler from "express-async-handler";
import generateToken from "../common/generateToken.js";
import User from "../models/userModel.js";

// ************* LOGIN *******************

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// ************* REGISTER *******************
// @desc Register a new uer
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.user._id);
  if (userExists) {
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.user._id);
  if (userExists) {
    userExists.name = req.body.name || userExists.name;
    userExists.email = req.body.email || userExists.email;
    userExists.password = req.body.password || userExists.password;

    await userExists.save();
    res.json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

export const deleteUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id);
  if (userExists) {
    await User.deleteOne({ _id: userExists._id });
    res.status(200).json({ message: "User removed" });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

export const getUserById = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id).select("-password");
  if (userExists)
    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    });
  else res.status(404).json({ message: "User not found" });
});

export const updateUser = asyncHandler(async (req, res) => {
  const userExists = await User.findById(req.params.id).select("-password");
  const { name, email, password, isAdmin } = req.body;

  if (userExists) {
    userExists.name = name || userExists.name;
    userExists.email = email || userExists.email;
    userExists.password = password || userExists.password;
    userExists.isAdmin = isAdmin || userExists.isAdmin;

    await userExists.save();

    res.status(200).json({
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
    });
  } else res.status(404).json({ message: "User not found" });
});
