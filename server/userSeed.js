import connectTodb from "./db/db.js";
import User from "./models/User.js";
import bcrypt from 'bcrypt'

const userRegister = async() =>{
    connectTodb()
    try{
        const hashedPassword = await bcrypt.hash('admin', 10)
        const newUser = new User({
            name: 'Admin',
            email: 'admin@gmail.com',
            password: hashedPassword,
            role: 'admin',
        })

        await newUser.save();
    }catch(error){
        console.log(error);
        
    }
}

userRegister();