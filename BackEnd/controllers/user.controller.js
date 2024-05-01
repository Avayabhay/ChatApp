import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const logged_user = req.user._id;
    const all_Users = await User.find({ _id: { $ne: logged_user } });
    res.status(200).json(all_Users);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Cannot get te users" });
  }
};
