import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  console.log(messages);
  // const load = true;
  if (!loading && messages.length === 0)
    return (
      <div className="px-4 flex-1 overflow-auto text-center text-black">
        Start a Conversation
      </div>
    );
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {/* {console.log(messages)} */}
      {loading ? (
        <>
          {[...Array(3)].map((_, idx) => (
            <MessageSkeleton key={idx} />
          ))}
        </>
      ) : (
        <>
          {messages.map((msg) => (
            <Message key={msg._id} message={msg} />
          ))}
        </>
      )}
    </div>
  );
};
export default Messages;
