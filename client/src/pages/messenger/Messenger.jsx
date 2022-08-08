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
import {io} from "socket.io-client"

const Messenger = () =>{

    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState("")
    const [onlineUsers,setOlineUsers] = useState([])
    const socket = useRef()

    const {user} = useContext(AuthContext)

    const API_URL= process.env.REACT_APP_API_URL

    useEffect(()=>{
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage" , data => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])

    useEffect( () =>{
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
        setMessages([...messages,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
        socket.current.emit("addUser",user._id)
        socket.current.on("getUsers",users => {
            setOlineUsers(users)
        })
    },[user])

    useEffect( ()=>{
        const getConversations = async ()=>{
            try {
                const res = await axios.get(`${API_URL}/api/conversation/${user._id}`)
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
                const res = await axios.get(`${API_URL}/api/message/${currentChat?._id}`)
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

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage",{
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post(`${API_URL}/api/message`,message)
            setMessages([...messages,res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

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
                    <ChatOnline 
                        onlineUsers ={onlineUsers} 
                        currentId ={user._id}
                    />
                </div>
            </div>
        </div>
        </>

    )
}

export default Messenger
