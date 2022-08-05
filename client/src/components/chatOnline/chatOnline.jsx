import "./chatOnline.css"

const ChatOnline =()=> {
    return(
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" 
                        src="https://dbk.vn/uploads/ckfinder/images/tranh-anh/Anh-thien-nhien-3.jpg" 
                        alt=""/>
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">John Doe</span>
            </div>
        </div>
    )
}

export default ChatOnline