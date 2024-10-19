const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

// REGISTER - SIGNUP //
const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
      return res.json({
        success: false,
        message: "Please fill all the required fields",
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.json({
        success: false,
        message: "User alredy exist with this username or email!!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Registered Successfully.",
      newUser: newUser,
    });
  } catch (error) {
    console.log("Error while register user", error);
    res.status(500).json({
      success: false,
      message: "Error while register new user",
    });
  }
};

// LOGIN - SIGNIN //
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userAlreadyExists = await User.findOne({ email });

    if (!userAlreadyExists) {
      return res.json({
        success: false,
        message: "User not registered with this email, try register first!!",
      });
    }

    const checkPassword = await bcrypt.compare(
      password,
      userAlreadyExists.password
    );

    if (!checkPassword) {
      return res.json({
        success: false,
        message: "Incorrect Password, try again!!!",
      });
    }

    const token = jwt.sign(
      {
        id: userAlreadyExists._id,
        role: userAlreadyExists.role,
        email: userAlreadyExists.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true, secure: false }).json({
      success: true,
      message: "Logged In Successfully, Welcome Back",
      user: {
        email: userAlreadyExists.email,
        role: userAlreadyExists.role,
        id: userAlreadyExists._id,
      },
    });
  } catch (error) {
    console.log("Error while login user", error);
    res.status(500).json({
      success: false,
      message: "Error while login to user account",
    });
  }
};

// LOGOUT //
const logout = async (req, res) => {
  try {
    res.clearCookie("token").json({
      success: true,
      message: "Logged Out Successfully.",
    });
  } catch (error) {
    console.log("Error while logout user", error);
    res.status(500).json({
      success: false,
      message: "Error while logout user",
    });
  }
};

// MIDDLEWARE FOR AUTH

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "Token not found or expired, try Login again...",
      });
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    console.log("Error in middleware while token verify", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while token verify!!!",
    });
  }
};

module.exports = { register, login, logout, authMiddleware };
