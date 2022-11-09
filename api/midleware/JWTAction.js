import jwt from "jsonwebtoken"
import dotenv from"dotenv";

dotenv.config();

const verifyToken = (req,res,next) => {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
        res.status(400).json({message:"can't authenticate"})
        return 
    }
    let key = process.env.JWT_SECRET
    jwt.verify(authorizationHeader,key,(err,_decoded)=>{
        if(err) {
            console.log("error ",err)
            res.status(400).json({message:"can't authenticate"})
            return 
        }
        next()
    })
}

export default {
    verifyToken
}