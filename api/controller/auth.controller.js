import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"
import dotenv from"dotenv";
dotenv.config();

const registerUser = async(req, res)=>{
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(req.body.password, salt);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        res.status(400).json(err)
      }
}
const login = async (req, res) => {  
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        res.status(404).json("user not found");
        return
      }
      const validPassword = await bcryptjs.compare(req.body.password, user.password)
      if (!validPassword) {
        res.status(400).json("wrong password")
        return
      }
      let payload = {
          username: user._doc.username,
          email : user._doc.email
      }
      let key = process.env.JWT_SECRET
      let token = jwt.sign(payload,key)
      res.status(200).json({...payload,token})
    } catch (err) {
      res.status(400).json(err)
    }
};
export default {
    registerUser,
    login
}