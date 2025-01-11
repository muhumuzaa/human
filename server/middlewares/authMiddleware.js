import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User.js'


const authMiddleware = async(req, res, next) =>{
    try{
        const token = req.headers.Authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({success: false, error: 'No token provided'})
        }
        const decoded = jwt.verify(token, process.env.JW_KEY)
        if(!decoded){
            return res.status(404).json({success: false, error: 'Token cannot be verified'})
        }
        const user = User.findById({_id: decoded._id}).select('-password')
        if(!user){
            res.status(404).json({success: false, error: 'User is not found'})
        }
        req.user = user
        next()
    }catch(error){
        if(error.response && error.response.data.error){
            res.status(500).json({success: false, error:'Server error'})
        }
        
    }
}

export default authMiddleware