import User from '../models/User.js'
import connectTodb from '../db/db.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const Login = async(req, res) =>{
    try{
        await connectTodb()
        const {email, password} = req.body;
        const user = await User.findOne({email})

        if(!user){
            return res.status(404).json({success: false, error: 'No user with this email'})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(404).json({success: false, error: "Password is incorrect"})
        }

        const token = jwt.sign({_id: user._id, role: user.role}, process.env.JW_KEY, {expiresIn: '10d'})
        return res.status(200).json({success: true, token, user: {_id: user.id, name: user.name, role: user.role}})
    }catch(error){
        return res.status(500).json({success: false, error: error.message})
    }
}

const verify = (req, res) =>{
    return res.status(200).json({success: true, user: req.user})
}


export {Login, verify};