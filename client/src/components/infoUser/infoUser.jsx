import "./infoUser.css"
import axios from "axios"
import { useState,useEffect,memo } from "react"
import { useParams } from "react-router"
import { deleteConversations,getConversations } from "../../api/apiUser"
const InfoUser = ({oppositeUser,user,setConversations}) => {
     //console.log("member ",currentChat.members)
    //console.log("oppositeUser ", oppositeUser)
    const handleLogout = ()=>{
        localStorage.setItem("user",null)
        window.location.reload()
    }

    const handleCancelConnect = async() =>{
        await deleteConversations(oppositeUser._id,user._id)
        setConversations(await getConversations(user._id))
        window.location.reload()
    }
    return(
        <>
        { oppositeUser.username ? ( 
        <div className="opposite">
            <div className="oppositeAvatar">
                <img
                    src={
                        oppositeUser.profilePicture
                        ?  oppositeUser.profilePicture
                        : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                    }
                    alt=""
                />
            </div>
            <p>
                {oppositeUser.username}
            </p>
            <div className="btn-user">
                <button onClick={handleCancelConnect}> Huỷ kết nối </button>
                <button> Chặn kết nối </button>
            </div>
        </div>
        ) : (
            <div className="opposite">
            <div className="oppositeAvatar">
                <img
                    src={
                        user.profilePicture
                        ?  user.profilePicture
                        : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
                    }
                    alt=""
                />
            </div>
            <p> {user.username} </p>
            <p> {user.email} </p>
            <div className="btn-user">
                <button onClick={handleLogout}> Đăng xuất </button>
            </div>
        </div>
        )}
        </>
    )
}
export default memo(InfoUser)