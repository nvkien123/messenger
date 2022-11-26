import "./messenger.css"
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import ChatOnline from "../../components/chatOnline/chatOnline"
import InfoUser from "../../components/infoUser/infoUser"
import {getConversations , getMessages, getUserById} from "../../api/apiUser.js"
import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import {io} from "socket.io-client"
import { apiURL } from "../../config/config"

const socket = io(apiURL)

const Messenger = ({user}) =>{

    const [conversations,setConversations] = useState([])
    const [currentChat,setCurrentChat] = useState(null)
    const [oppositeUser, setOppositeUser] = useState({});
    const [messages,setMessages] = useState([])
    const [newMessage,setNewMessage] = useState("")
    const [arrivalMessage,setArrivalMessage] = useState("")
    const [onlineUsers,setOnlineUsers] = useState([])
    const fetchData = async()=>{
        if (!user) {
          console.log("false")
          return 
        }
        let newUser = await getUserById(user._id)
       // console.log("new user ",newUser)
        localStorage.setItem("user", JSON.stringify(newUser))
        user = newUser
    }
    fetchData()

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
        setMessages((messages)=> [...messages,arrivalMessage])
    },[arrivalMessage,currentChat])

    useEffect(()=>{
        console.log("add user")
        socket.emit("addUser",user?._id)
    },[])

    useEffect(()=>{
        socket.on("getUsers",users => {
            console.log("users ",users)
            setOnlineUsers(users)
        })
    },[])

    useEffect( ()=>{
        const fetchData = async() => {
            setConversations(await getConversations(user._id))
        }
        fetchData()
    }, [user?._id])
    
    useEffect( ()=>{
        const fetchData = async() => {
            setMessages( await getMessages(currentChat?._id))
        }
        fetchData()
    }, [currentChat])

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (newMessage === "") {
            return
        }
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
            const res = await axios.post(`${apiURL}/api/message`,message)
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
        { 
        user && 
        <>
        <Topbar setConversations={setConversations} userId = {user._id} user={user}/>
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
                        }
        </>
    )
}

export default Messenger
