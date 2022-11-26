import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useContext,useState } from "react";
import { useHistory } from "react-router";
// import { AuthContext } from "../../context/AuthContext";

import { getUserByUsername,createConversations,getConversations } from "../../api/apiUser";

export default function Topbar({setConversations,userId,user}) {
  // const { user } = useContext(AuthContext);
  const [textSearch,setTextSearch] = useState("")
  const history = useHistory();
  const handleSubmit = async(e) =>{
    e.preventDefault()
    const newUser = await getUserByUsername(textSearch)
    await createConversations(userId,newUser._id)
    setConversations(await getConversations(userId))
    setTextSearch("")
  }
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link style={{ textDecoration: "none" }} onClick={()=>{history.push("/");}}>
          <span className="logo">Messenger</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <form onSubmit={handleSubmit}>
            <input
              placeholder="connect to new users by username"
              className="searchInput"
              onChange={(e)=>{setTextSearch(e.target.value)}}
              value={textSearch}
            />
          </form>
        </div>
      </div>
      <div className="topbarRight">
        
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
          </div>
          <div className="topbarIconItem">
            <Chat />
          </div>
          <div className="topbarIconItem">
            <Notifications /> 
          </div>
        </div>
        <Link onClick={()=>{history.push("/");}}>
          <img
            src={
              user.profilePicture
                ?  user.profilePicture
                : "http://hethongxephangtudong.net/public/client/images/no-avatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}
