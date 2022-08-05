import axios from "axios"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import "./conversation.css"

const Conversation = ({conversation ,currentUser}) =>{

    const [user,setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(()=>{
        const friendId = conversation.members.find((m)=>m !== currentUser._id)

        const getUser = async () =>{
            try {
                const res = await axios("http://localhost:8080/api/users?userId=" + friendId)
                setUser(res.data)
                // console.log("res ",res.data)
            } catch (error) {
                console.log("err",error)
            }
        }
        getUser()
    },[currentUser,conversation])

    return(
        <div className="conversation">
                        <img className="conversationImg" 
                            src={user.profilePicture ? user.profilePicture : "https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?ssl=1"}
                            alt=""/>
                        
                        <span className="conversationName">{user.username}</span>
        </div>
     )
}

export default Conversation