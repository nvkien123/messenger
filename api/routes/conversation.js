const router = require("express").Router();
const Conversation = require("../models/Conversation");

router.post("/", async(req,res)=>{
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId], 
    });
    try {
        const saveConversation = await newConversation.save();
        res.status(200).json(saveConversation)
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.get("/:userId", async(req,res) => {
    try {
        const conversation = await Conversation.find({
            members: { $in: [req.params.userId]},
        });
        res.status(200).json(conversation);
    } catch (error) {
        res.status(500).json(error)
        
    }
})

router.get("", async(req,res) => {
    const newConversation = {
        members: [req.body.senderId, req.body.receiverId], 
    };
    try {
        Conversation.findOne( {members: [req.body.senderId, req.body.receiverId], }, (err,value)=> {
            if(value !== null){
                res.status(200).json(value)
            }
        });
        Conversation.findOne( {members: [req.body.receiverId, req.body.senderId], }, (err,value)=> {
            if(value !== null){
                res.status(200).json(value)
            }
            value = []
            res.status(200).json(value)
        });
    } catch (error) {
        res.status(500).json(error)
        
    }
})

module.exports = router;