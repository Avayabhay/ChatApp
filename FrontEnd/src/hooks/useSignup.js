import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);

  const { setAuthUser } = useAuthContext();
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
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          userName,
          fullName,
          password,
          confirmPassword,
          gender,
        }),
      });

      const data = await res.json();
      // console.log(data);

      //If there's any error while registering the user
      if (data.error) {
        // console.log("Throwing error");
        const errMsg = data.error;
        console.log(errMsg);
        throw new Error(data.error);
      }

      // console.log("Should not execute");
      //store the user to the local
      localStorage.setItem("chat-app-user", JSON.stringify(data));
      //set the context
      setAuthUser(data);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
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
