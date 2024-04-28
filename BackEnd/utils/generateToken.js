import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true, //prevent XSS attack
    sameSite: "strict", //prevent CSRF attack
    secure: process.env.NODE_ENV !== "DEVELOPMENT",
  });
};

export default generateTokenAndSetCookie;
