import Conversation from "../models/Conversation.js";

const createConversation = async(req,res)=>{
    if (req.body.senderId === req.body.receiverId) {
        res.status(400).json({message:"sender must be different from receiver"})
        return
    }
    let findConversation = await Conversation.findOneAndUpdate({ members: [req.body.senderId, req.body.receiverId]},{isDelete:false})
    if(findConversation) {
        res.status(200).json({status: true})
        return
    }

    findConversation = await Conversation.findOneAndUpdate({ members: [req.body.receiverId,req.body.senderId]},{isDelete:false})
    
    if(findConversation) {
        res.status(400).json({status:true})
        return
    }
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId], 
        isDelete : false
    });
    try {
        const saveConversation = await newConversation.save();
        res.status(200).json({status: true})
    } catch (error) {
        res.status(400).json(error)
        
    }
}

const getConversationById = async(req,res) => {
    try {
        console.log("getConversationById")
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]},
            isDelete : false
        });
        res.status(200).json(conversation);
    } catch (error) {
        console.log("error ",error)
        res.status(400).json(error)
        
    }
}

const getConversation = async(req,res) => {
    const newConversation = {
        members: [req.body.senderId, req.body.receiverId], 
    };
    try {
        Conversation.findOne( {members: [req.body.senderId, req.body.receiverId], isDelete : false}, (err,value)=> {
            if(value !== null){
                res.status(200).json(value)
            }
        });
        Conversation.findOne( {members: [req.body.receiverId, req.body.senderId],isDelete : false }, (err,value)=> {
            if(value !== null){
                res.status(200).json(value)
            }
            value = []
            res.status(200).json(value)
        });
    } catch (error) {
        res.status(400).json(error)
        
    }
}

const deleteConversation = async(req,res) => {
    try {
        await Conversation.findOneAndUpdate({members: [req.body.receiverId, req.body.senderId],isDelete : false },{isDelete : true})
        await Conversation.findOneAndUpdate({members: [req.body.senderId , req.body.receiverId],isDelete : false },{isDelete : true})
        res.status(200).json({status: true});
    } catch (error) {
        res.status(400).json(error)
        
    }
}

export default {
    createConversation,
    getConversationById,
    getConversation,
    deleteConversation,
}