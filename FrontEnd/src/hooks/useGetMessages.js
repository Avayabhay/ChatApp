import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  useEffect(() => {
    const getMessages = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/message/${selectedConversation._id}`);

        const data = await res.json();
        if (data.error) {
          throw Error(data.error);
        }

        // console.log(data);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation) {
      getMessages();
    }
  }, [selectedConversation, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
