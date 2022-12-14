import axios from "axios"
import { apiURL } from "../config/config"

const loginCall = async (userCredential) => {
    try {
      const res = await axios.post (`${apiURL}/api/auth/login`, userCredential)
      console.log("res ",res)
      return res.data
    } catch (err) {
    }
  };

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
        await axios.post(`${apiURL}/api/conversation/`,{
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

const updateAvatarUser =  async (userId,linkAvatar) => {
    try {
        await axios.put(`${apiURL}/api/users/${userId}`,{
        userId: userId,
        profilePicture: linkAvatar
       });
   } catch (error) {
       console.log(error)
       return 
   }
};


export  {
    loginCall,
    getConversations,
    createConversations,
    getMessages,
    getUserById,
    getUserByUsername,
    deleteConversations,
    updateAvatarUser
}