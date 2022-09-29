import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/chatOnline"
import InfoUser from "../../components/infoUser/infoUser"
import { AuthContext } from "../../context/AuthContext"
import {getConversations , getMessages, getUserById} from "../../api/apiUser.js"
import {useContext} from "react"
import axios from "axios"
import { useState } from "react"
import { useEffect,useRef } from "react"
import {io} from "socket.io-client"

const socket = io(process.env.REACT_APP_API_URL)

const Messenger = () =>{

    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [oppositeUser, setOppositeUser] = useState({});
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState("")
    const [onlineUsers,setOnlineUsers] = useState([])

    const {user} = useContext(AuthContext)

    const apiUrl= process.env.REACT_APP_API_URL

    useEffect(()=>{
        //console.log("current chat ",currentChat)
        socket.on("getMessage" , data => {
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
        console.log("add user")
        socket.emit("addUser",user._id)
    },[user])

    useEffect(()=>{
        socket.on("getUsers",users => {
            //console.log("users ",users)
            setOnlineUsers(users)
        })
    },[])

    useEffect( async()=>{

        setConversations(await getConversations(user._id))
        console.log("conversations ",conversations)
    }, [user._id])
    
    useEffect( async()=>{
        setMessages( await getMessages(currentChat?._id))
    }, [currentChat])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.emit("sendMessage",{
            senderId: user._id,
            receiverId: receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post(`${apiUrl}/api/message`,message)
            setMessages([...messages,res.data])
            setNewMessage("")
        } catch (error) {
            console.log(error)
        }
    }

    const handleCurrentChat = (c)=>{
        const fetchUser = async () => {
            let oppositeId = (c.members[0] === user._id ? c.members[1] : c.members[0])
            setOppositeUser(await getUserById(oppositeId));
        };
        fetchUser()
        setCurrentChat(c)
    }

    return (
        <>
        <Topbar setConversations={setConversations} userId = {user._id}/>
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                <ChatOnline onlineUsers={onlineUsers} currentId = {user._id}/>
                    <h3>all user</h3>
                    <input placeholder="Search for friends" className="chatMenuInput"/>
                    {conversations.map((c)=>(
                        <div onClick={()=>{handleCurrentChat(c)}}>
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
                        { oppositeUser.username && messages.map( (m) => { return (           
                            <Message message={m} own ={m.sender === user._id} messages={messages} profilePicture ={m.sender === user._id ? user.profilePicture : oppositeUser.profilePicture}/>
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
                    <InfoUser 
                       oppositeUser ={oppositeUser}
                       user = {user}
                       setConversations = {setConversations}
                    />
                </div>
            </div>
        </div>
        </>

    )
}

export default Messenger
