import "./chatOnline.css"
import axios from "axios"
import { useState,useEffect,useRef } from "react"

const ChatOnline =({onlineUsers ,currentId})=> {

    const [online,setOnline] = useState([])
    let newOnline = onlineUsers
    console.log("currenrId ",currentId)

    const API_URL= process.env.REACT_APP_API_URL

    useEffect( ()=>{
        newOnline.filter( (u) => 
            u.userId !== currentId
        )
        console.log(newOnline)
        newOnline.map( async(user)=> {
            try {
                if (currentId !== user.userId) {
                    const res = await axios.get(`${API_URL}/api/users?userId=${user.userId}`)
                    setOnline([...online,res.data])
                }
            } catch (error) {
                console.log(error)
            }
        })
        //console.log(online)
    },[onlineUsers])

    console.log("user online ",online)
    return(
        <>
        { online.map((value) => { return(
        <div className="chatOnline">
            <br></br>
            <h3>user online</h3>
            <br></br>
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