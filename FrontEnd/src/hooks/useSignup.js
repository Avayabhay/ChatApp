import { useState } from "react";
import toast, { ErrorIcon } from "react-hot-toast";
import { TbAspectRatio } from "react-icons/tb";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const signup = async ({
    userName,
    fullName,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = validateInput({
      userName,
      fullName,
      password,
      confirmPassword,
      gender,
    });
    if (!success) {
      return;
    }

    setLoading(true);
    try {
      // const res = await fetch()
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
}

export default useSignup;

function validateInput({
  userName,
  fullName,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !userName || !password || !confirmPassword || !gender) {
    toast.error("Fill all the fields!");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password should be of min 6 chars");
    return false;
  }

  return true;
}
