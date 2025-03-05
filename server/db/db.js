import mongoose from "mongoose";

const connectTodb = async() =>{
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'YourDatabaseName'
        })
    }catch(error){
        console.log(error);
    }
    }

export default connectTodb