import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import { useState } from "react";

export const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();

  const sendMessage = async (message) => {
    try {
      console.log(JSON.stringify(message), selectedConversation);
      setLoading(true);
      const res = await fetch(`api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw Error(data.error);
      }

      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
};
