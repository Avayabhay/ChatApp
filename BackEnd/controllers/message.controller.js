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
    let conversation = await Conversation.findOne({
      participants: { $all: [receiver_id, user_id] },
    });
    console.log(conversation);

    if (!conversation) {
      console.log("creating new Conversation...!");
      conversation = await Conversation.create({
        participants: [receiver_id, user_id],
      });
      console.log(conversation);
    }

    const newMessage = new Message({
      receiver_id,
      sender_id: user_id,
      message,
    });

    if (newMessage) {
      //   console.log(newMessage._id);
      conversation.messages.push(newMessage._id);
      //   console.log(conversation);
    }

    await conversation.save();
    await newMessage.save();

    //Optimizing the save()
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json({ message: newMessage });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Error while sending the message!!" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const sender_id = req.user._id;
    const receiver_id = req.params.id;
    // console.log(sender_id, receiver_id);
    let conversation = await Conversation.findOne({
      participants: { $all: [sender_id, receiver_id] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }

    // console.log(conversation);
    const messages = conversation.messages;

    const StringMessages = messages.map((m) => m.message);
    // console.log(StringMessages);
    // console.log(conversation);
    // console.log(messages);
    res.status(200).json(messages);
    // res.status(200).json({ message: "Got the conversation successfully!!" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: "Error while getting the message!!" });
  }
};
