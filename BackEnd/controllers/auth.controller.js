export const signup = (req, res) => {
  console.log("singed up User");
  res.send("SIGN UP NOW!!");
};

export const login = (req, res) => {
  console.log("Login User");
  res.send("Log In NOW!!");
};

export const logout = (req, res) => {
  console.log("Login User");
  res.send("Logged Out!!");
};
