import Auth from "./auth.route.js"
import Conversation from "./conversation.route.js"
import Message from "./message.route.js"
import User from "./user.route.js"

const route = (app) => {
    app.use("/api/auth", Auth);
    app.use("/api/users", User);
    app.use("/api/conversation",Conversation)
    app.use("/api/message",Message)
}

export default route