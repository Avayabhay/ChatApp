import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../../skeletons/MessageSkeleton";
import Message from "./Message";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  const load = true;
  return (
    <div className="px-4 flex-1 overflow-auto ">
      {console.log(messages)}

      {load ? (
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
