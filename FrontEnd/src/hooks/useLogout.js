import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

export const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);
      const data = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "context-type": "application/json" },
      });

      const res = await data.json();
      if (res.error) {
        throw new Error(res.error);
      }
      //clear local storage & authUser Context
      localStorage.removeItem("chat-app-user");
      setAuthUser(null);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};
