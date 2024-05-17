import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {console.log(messages)}

      {loading ? (
        <>
          <MessageSkeleton />
          <MessageSkeleton />
        </>
      ) : (
        <>
          {messages.map((msg) => {
            <Message />;
          })}
        </>
      )}
    </div>
  );
};
export default Messages;
