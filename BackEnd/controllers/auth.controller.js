import { error } from "console";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  //   console.log("singed up User");
  //   res.send("SIGN UP NOW!!");
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    //check if pass and confirmPass matches
    if (password !== confirmPassword) {
      return res.status(400).json({ error: " passwords do not match!" });
    }

    // First check if user already exists
    const user = await User.findOne({ userName });
    console.log(fullName, userName, password, confirmPassword, gender);
    if (user) {
      return res
        .status(400)
        .json({ error: "User arlready exists, please Sign In!" });

      //redirect to the login page
      // res.redirect("/api/auth/login");
    }
    console.log("Niche aaya!");
    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
    console.log(hashedPass);

    // Put a profile pic based on gender
    const boyProPic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlProPic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    //create the User
    const newUser = new User({
      fullName,
      userName,
      password: hashedPass,
      gender,
      profilePic: gender == "male" ? boyProPic : girlProPic,
    });

    if (newUser) {
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullname,
        userName: newUser.userName,
        gender: newUser.gender,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User!" });
    }
  } catch (error) {
    console.log("Error in signing up the User:", error.message);
    res.status(400).json({ error: "Internal Server error!" });
  }
};

export const login = (req, res) => {
  console.log("Login User");
  res.send("Log In NOW!!");
};

export const logout = (req, res) => {
  console.log("Login User");
  res.send("Logged Out!!");
};
