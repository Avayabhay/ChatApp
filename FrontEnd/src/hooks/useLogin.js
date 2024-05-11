import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/AuthContext";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ userName, password }) => {
    //validate the inputs
    const success = handleLoginInputs(userName, password);
    if (!success) {
      return;
    }
    try {
      setLoading(true);

      //Post request to the Backend
      console.log("enter");
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }

      //set the user to local storage and update the context
      localStorage.setItem("chat-app-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { login, loading };
}

export default useLogin;

const handleLoginInputs = (userName, password) => {
  if (!userName || !password) {
    toast.error("Fill all the input fields");
    return false;
  }

  //TO DO: put other Validations
  return true;
};
