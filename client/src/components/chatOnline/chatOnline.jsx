import "./chatOnline.css"
import axios from "axios"
import { useState,useEffect } from "react"
import { apiURL } from "../../config/config"
import { SettingsSharp } from "@material-ui/icons"

const ChatOnline =({onlineUsers ,currentId})=> {

    const [online,setOnline] = useState([])
    console.log("old user ",onlineUsers)
    useEffect( ()=>{
        let newOnline = []
        newOnline = onlineUsers.filter( (u) => 
            u.userId !== currentId
        )
        if (newOnline.length === 0) {
            setOnline((online)=>[])
            return
        }
        newOnline.map( async(user)=> {
            try {
                if (currentId !== user.userId) {
                    const res = await axios.get(`${apiURL}/api/users?userId=${user.userId}`)
                    setOnline((online)=>[...online,res.data])
                }
            } catch (error) {
                console.log(error)
            }
        })
        //setOnline([{},{},{},{},{},{},{},{}])
        //console.log(online)
    },[onlineUsers,currentId])

   // console.log("all user online ",online)
    return(
        <>
        <h3>user online</h3>
        <div className="chatOnline">
            { online.map((value) => { return(
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
                    <span className="chatOnlineName">{value.username || "noname"}</span>
                </div>
            )})}
        </div>
        </>
    )
}

export default ChatOnline