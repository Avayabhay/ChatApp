import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function useGetConversations() {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getAllConversations = async () => {
      try {
        setLoading(true);

        //Get method
        const res = await fetch("api/user");

        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        setConversations(data);
        console.log(conversations);
      } catch (error) {
        toast.error(error.error);
      } finally {
        setLoading(false);
      }
    };
    getAllConversations();
  }, []);

  return { loading, conversations };
}

export default useGetConversations;
