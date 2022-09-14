import express from "express";
import mongoose from "mongoose";
import dotenv from"dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import cors from "cors"
import http from "http"
import multer from "multer";
import { Server, Socket } from "socket.io";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import coversationRoute from "./routes/conversation.js"
import messageRoute from "./routes/message.js"
import logging from "./config/logging.js";

const app = express();
const NAME_SPACE = "Server";
dotenv.config();
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

app.use(cors({ origin: "*",methods: "*", optionsSuccessStatus: 200 }));
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// upload file
//app.use("/images", express.static(path.join(__dirname, "public/images")));
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/conversation",coversationRoute)
app.use("/api/message",messageRoute)

/// socket.io
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
let users =[]
const addUser =(userId,socketId) =>{
    if (!users.some( (user) => {       
        return user.userId === userId
    }) ) {
        users.push({userId ,socketId})
    }
}
const removeUser = (socketId) => {
    users = users.filter( (user) => user.socketId !== socketId)
}
const getUser = (userId) => {
    return users.find( user => user.userId === userId)
}
io.on("connection", (socket) => {
    console.log("a user connected")
    socket.on("addUser", (userId)=>{
        addUser(userId,socket.id)
        io.emit("getUsers",users)
    })
    socket.on("sendMessage", ({senderId,receiverId,text}) => {
        const user = getUser(receiverId)      
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        }) 
    })
    socket.on("disconnect", ()=>{
        console.log("a user disconnect")
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})

httpServer.listen(8080, () => {
  logging.info(
    NAME_SPACE,
    "Server is running http://localhost:8080"
  );
});
