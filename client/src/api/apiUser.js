import axios from "axios"
import { apiURL } from "../config/config"

const getConversations = async (userId)=>{
    try {
        const res = await axios.get(`${apiURL}/api/conversation/${userId}`)
        console.log("data ",res.data)
        return res.data
    } catch (error) {
        console.log(error)
        return []
    }
}

const createConversations = async (senderId,receiverId)=>{
    try {
        const res = await axios.post(`${apiURL}/api/conversation/`,{
            senderId: senderId,
            receiverId: receiverId
          })
    } catch (error) {
        console.log(error)
    }
}

const getMessages = async(currentChatId) =>{
    try {
        const res = await axios.get(`${apiURL}/api/message/${currentChatId}`)
        return res.data
    } catch (error) {
        console.log(error)
        return []
    }
}

const getUserById = async (userId) => {
     try {
        const res = await axios.get(`${apiURL}/api/users?userId=${userId}`);
        return res.data
    } catch (error) {
        console.log(error)
        return 
    }
};

const getUserByUsername = async (username) => {
    try {
       const res = await axios.get(`${apiURL}/api/users?username=${username}`);
       return res.data
   } catch (error) {
       console.log(error)
       return 
   }
};

const deleteConversations = async (senderId,receiverId) => {
    try {
       const res = await axios.put(`${apiURL}/api/conversation/delete`,{
        senderId: senderId,
        receiverId: receiverId
       });
       return res.status
   } catch (error) {
       console.log(error)
       return 
   }
};


export  {
    getConversations,
    createConversations,
    getMessages,
    getUserById,
    getUserByUsername,
    deleteConversations
}