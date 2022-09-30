import "./infoUser.css"
import {memo } from "react"
import { deleteConversations,getConversations,updateAvatarUser } from "../../api/apiUser"
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../config/firebase";
import { useState } from "react"
const InfoUser = ({oppositeUser,user,setConversations}) => {
     //console.log("member ",currentChat.members)
    //console.log("oppositeUser ", oppositeUser)
    const [statusAvatar,setStatusAvatar] = useState(false)
    const [file, setFile] = useState();
    const [stateFile,setStateFile] = useState("Submit")
    const handleLogout = ()=>{
        localStorage.setItem("user",null)
        window.location.reload()
    }

    const handleCancelConnect = async() =>{
        await deleteConversations(oppositeUser._id,user._id)
        setConversations(await getConversations(user._id))
        window.location.reload()
    }

    const changeHandler = (event) => {
        setFile(event.target.files[0]);
        console.log("file ",event.target.files[0])
    }
    const handleSubmission = () => {
        if (!file) return;
        const sotrageRef = ref(storage, `avatar/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);

        setStateFile("updating")
        uploadTask.on("state_changed",()=>{},
            (error) => console.log("err ",error),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
                    console.log("File available at", downloadURL);
                    await updateAvatarUser(user._id,downloadURL)
                    user.profilePicture = downloadURL
                    localStorage.setItem("user", JSON.stringify(user))
                    setFile(null)
                    setStateFile("Submit")
                });
            }
        );
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
                    <button onClick={()=>{setStatusAvatar((statusAvatar) => !statusAvatar)}}> Set Avatar </button>
                </div>
                { statusAvatar &&
                    <div className="set-avatar">
                        <div className="choose-avatar">
                            <input type="file" name="file" onChange={changeHandler} />
                        </div>
                        
                        <div className="submit-button">
                        <button onClick={handleSubmission}>{stateFile}</button>
                        </div>
                    </div>
                }
        </div>
        )}
        </>
    )
}
export default memo(InfoUser)