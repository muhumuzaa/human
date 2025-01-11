import jwt, { decode } from 'jsonwebtoken'
import User from '../models/User.js'


const authMiddleware = async(req, res, next) =>{
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token){
            return res.status(404).json({success: false, error: 'No token provided'})
        }
        const decoded = jwt.verify(token, process.env.JW_KEY)
        if(!decoded){
            return res.status(404).json({success: false, error: 'Token cannot be verified'})
        }
        const user = await User.findById({_id: decoded._id}).select('-password')
        if(!user){
            return res.status(404).json({success: false, error: 'User is not found'})
        }
        req.user = user
        next()
    }catch(error){
        if(error.response && error.response.data.error){
            return res.status(500).json({success: false, error:'Server error'})
        }
        
    }
}

export default authMiddleware