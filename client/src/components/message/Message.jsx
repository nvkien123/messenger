import "./message.css"
import {format} from "timeago.js"
import { useEffect,useRef } from "react"

const Message = ({message, own,messages,profilePicture})=>{

    const scrollref = useRef()
   // console.log("profilePicture ",profilePicture)

    useEffect(()=>{
        scrollref.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])
    return(
        <div className={own ? "message own" : "message"} ref={scrollref}>
            <div className="messageTop">
                <img className="messageImg"
                    src= {profilePicture ? profilePicture : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"}
                    alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    ) 
}

export default Message