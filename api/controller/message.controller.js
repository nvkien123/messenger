import Message from "../models/Message.js";

const createMessage = async(req,res)=> {
    const newMessage = new Message(req.body);    
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(400).json(error)
    }
}

const getMessageByConversation = async(req,res) =>{
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        });
        res.status(200).json(messages)
    } catch (error) {
        res.status(400).json(error)
    }
}

export default {
    createMessage,
    getMessageByConversation
}