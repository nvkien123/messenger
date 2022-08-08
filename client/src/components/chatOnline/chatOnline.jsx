import "./chatOnline.css"
import axios from "axios"
import { useState,useEffect,useRef } from "react"

const ChatOnline =({onlineUsers ,currentId})=> {

    const online= []
    let newOnline = onlineUsers

    const API_URL= process.env.REACT_APP_API_URL

    useEffect( ()=>{
        newOnline.filter( (u) => 
            u.userId !== currentId
        )
        console.log(newOnline)
        newOnline.map( async(user)=> {
            try {
                const res = await axios.get(`${API_URL}/api/users?userId=${user.userId}`)
                online.push(res.data)
            } catch (error) {
                console.log(error)
            }
        })
        console.log(online)
    },[onlineUsers])

    console.log(online)
    return(
        <>
        { online.map((value) => { return(
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" 
                        src="https://dbk.vn/uploads/ckfinder/images/tranh-anh/Anh-thien-nhien-3.jpg" 
                        alt=""/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">{value.username}</span>
            </div>
        </div>
         )} )}
        </>
    )
}

export default ChatOnline