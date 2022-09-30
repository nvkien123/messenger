import express from "express";
import mongoose from "mongoose";
import dotenv from"dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path"
import cors from "cors"
import http from "http"
import multer from "multer";
import route from "./routes/index.js";
import { Server, Socket } from "socket.io";
import logging from "./config/logging.js";

const app = express();
const NAME_SPACE = "Server";
dotenv.config();
mongoose.connect(
  process.env.MONGGO_URL,
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


route(app)

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

/// socket.io
const httpServer = http.createServer(app);
let users =[]
const addUser =(userId,socketId) =>{
    if (!users.some( (user) => {       
        return user.userId === userId
    }) ) {
        users.push({userId ,socketId})
        return true
    }
    return false
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
        if(addUser(userId,socket.id)) {
          io.emit("getUsers",users)
        }
    })
    socket.on("sendMessage", ({senderId,receiverId,text}) => {
        const user = getUser(receiverId)      
        io.to(user?.socketId).emit("getMessage", {
            senderId,
            text
        }) 
    })
    socket.on("disconnect", ()=>{
        console.log("a user disconnect ",socket.id)
        removeUser(socket.id)
        io.emit("getUsers",users)
    })
})

httpServer.listen(process.env.PORT || 8080, () => {
  logging.info(
    NAME_SPACE,
    "Server is running http://localhost:8080"
  );
});
