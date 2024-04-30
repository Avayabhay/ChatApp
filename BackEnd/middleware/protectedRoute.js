import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.model.js";

dotenv.config();

const protectedRoute = async (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(400).json({ error: "Invalid Token" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (!decoded) {
      return res.status(400).json({ error: "unauthorized User!" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ error: "unauthorized User! - No Such User" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Internal Error" });
  }
};

export default protectedRoute;
