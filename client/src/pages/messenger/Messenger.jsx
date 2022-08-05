import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/chatOnline"
import { AuthContext } from "../../context/AuthContext"
import {useContext} from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect,useRef } from "react"

const Messenger = () =>{

    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const scrollref = useRef()

    const {user} = useContext(AuthContext)

    useEffect( ()=>{
        const getConversations = async ()=>{
            try {
                const res = await axios.get("http://localhost:8080/api/conversation/"+user._id)
                //console.log("conver ",res.data)
                setConversations(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getConversations()
    }, [user._id])
    
    useEffect( ()=>{
        const getMessages = async() =>{
            try {
                const res = await axios.get("http://localhost:8080/api/message/"+ currentChat?._id)
                setMessages(res.data)
            } catch (error) {
                console.log(error)
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }
        try {
            const res = await axios.post("http://localhost:8080/api/message",message)
            setMessages([...messages,res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    // useEffect(()=>{
    //     scrollref.current?.scrollIntoView({behavior: "smooth"})
    // }, [messages])


    // console.log(messages)

    return (
        <>
        <Topbar />
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c)=>(
                    <div onClick={()=>{setCurrentChat(c)}}>
                    <Conversation conversation={c} currentUser ={user}/>
                    </div>
                    ))}
                      
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    { currentChat ? (
                    <>
                    <div className="chatBoxTop" >   
                        {messages.map( (m) => { return (           
                            <Message message={m} own ={m.sender === user._id} messages={messages}/>
                        )})}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea className="chatMessageInput" placeholder= "writing something ..."
                            onChange={(e)=>{
                                setNewMessage(e.target.value)
                            }}
                            value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                    </div>
                </> ) : ( <span className="noCoverSactionText">open a conversation to start a chat</span>) }
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                    <ChatOnline />
                    <ChatOnline />
                    <ChatOnline />
                </div>
            </div>
        </div>
        </>

    )
}

export default Messenger
