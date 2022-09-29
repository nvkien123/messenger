import bcrypt from "bcrypt";
import User from "../models/User.js";

const registerUser = async()=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
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
      const validPassword = await bcrypt.compare(req.body.password, user.password)
      if (!validPassword) {
        res.status(400).json("wrong password")
        return
      }
      //console.log(user)
      res.status(200).json(user)
    } catch (err) {
      res.status(400).json(err)
    }
};
export default {
    registerUser,
    login
}