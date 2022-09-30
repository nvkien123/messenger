import "./chatOnline.css"
import axios from "axios"
import { useState,useEffect } from "react"
import { apiURL } from "../../config/config"

const ChatOnline =({onlineUsers ,currentId})=> {

    const [online,setOnline] = useState([])
    let newOnline = []
    //console.log("currenrId ",currentId)

    useEffect( ()=>{
        newOnline = onlineUsers.filter( (u) => 
            u.userId !== currentId
        )
        if (newOnline.length === 0) {
            setOnline([])
            return
        }
        newOnline.map( async(user)=> {
            try {
                if (currentId !== user.userId) {
                    const res = await axios.get(`${apiURL}/api/users?userId=${user.userId}`)
                    setOnline([...online,res.data])
                }
            } catch (error) {
                console.log(error)
            }
        })
        //console.log(online)
    },[onlineUsers])

    console.log("all user online ",online)
    return(
        <>
        <h3>user online</h3>
        { online.map((value) => { return(
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" 
                        src={
                            value.profilePicture
                            ?  value.profilePicture
                            : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                        }
                        alt=""/>
                   
                </div>
                <span className="chatOnlineName">{value.username}</span>
            </div>
        </div>
         )} )}
        </>
    )
}

export default ChatOnline