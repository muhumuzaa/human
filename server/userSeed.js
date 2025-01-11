import User from "./models/User.js"
import bcrypt from 'bcrypt'
import connectTodb from "./db/db.js"


const userRegister = async() =>{

    connectTodb()
    const hashedPassword = await bcrypt.hash('admin', 10)
    try{
        const newUser = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin'
        })
    
        await newUser.save();

    }catch(error){
        console.log('failed to create new user: ', error);
        
    }
    
}

export default userRegister();