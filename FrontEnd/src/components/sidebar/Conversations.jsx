import { generateEmoji } from "../../../../BackEnd/utils/randomEmojiGenerator";
import useGetConversations from "../../hooks/useGetConversations";
import Conversation from "./Conversation";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  // console.log(conversations);
  // console.log(generateEmoji());
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {loading ? (
        <div className="loading loading-spinner"></div>
      ) : (
        conversations.map((conversation, idx) => (
          <Conversation
            key={conversation._id}
            conversation={conversation}
            emoji={generateEmoji()}
            lastIndex={idx === conversations.length - 1}
          />
        ))
      )}
    </div>
  );
};
export default Conversations;
