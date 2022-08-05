import "./message.css"
import {format} from "timeago.js"
import { useEffect,useRef } from "react"

const Message = ({message, own,messages})=>{

    const scrollref = useRef()

    useEffect(()=>{
        scrollref.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])
    return(
        <div className={own ? "message own" : "message"} ref={scrollref}>
            <div className="messageTop">
                <img className="messageImg"
                    src="https://i0.wp.com/researchictafrica.net/wp/wp-content/uploads/2016/10/default-profile-pic.jpg?ssl=1"
                    alt=""/>
                <p className="messageText">{message.text}</p>
            </div>
            <div className="messageBottom">{format(message.createdAt)}</div>
        </div>
    ) 
}

export default Message