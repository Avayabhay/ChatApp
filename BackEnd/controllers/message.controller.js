import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  //   console.log("Message Sent!");
  //   res.status(200).json({ message: "Message sent successfully!" });

  //   const user_id = req.params.id;
  //   console.log(user_id);

  //FLow
  //get Sender ID
  //get Receiver ID
  //get Message
  // create a message
  // create a conversation
  // save both to dataBase
  try {
    const { message } = req.body;
    const { id: receiver_id } = req.params;
    const user_id = req.user._id;

    console.log(message, receiver_id, user_id);
    const conversation = Conversation.findOne({
      participants: { $all: [receiver_id, user_id] },
    });

    if (!conversation) {
      conversation = Conversation.create({
        participants: [receiver_id, user_id],
      });
    }

    const newMessage = new Message({
      receiver_id,
      sender_id: user_id,
      message,
    });

    if (newMessage) {
      console.log(newMessage._id);
      conversation.message.push(newMessage._id);
    }

    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Error while sending the message!!" });
  }
};
