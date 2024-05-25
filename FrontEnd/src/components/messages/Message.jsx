import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  // console.log(message);
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  let msgReceived = true;

  if (authUser?._id !== message.sender_id) {
    msgReceived = true;
  } else {
    msgReceived = false;
  }

  let chatClasses = !msgReceived ? "chat-end" : "chat-start";

  return (
    //<div className="">hey</div>

    <div className={`chat ${chatClasses}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            src={
              msgReceived
                ? selectedConversation?.profilePic
                : authUser?.profilePic
            }
            alt="user avatar"
          />
        </div>
      </div>
      <div
        className={`chat-bubble text-white pb-2 ${
          msgReceived ? "" : "bg-blue-500"
        }`}
      >
        {message?.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {message.createdAt}
      </div>
    </div>
  );
};
export default Message;
