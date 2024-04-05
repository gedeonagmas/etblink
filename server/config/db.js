import mongoose from "mongoose";
const mongodb = async () => {
  await mongoose.connect(
    "mongodb+srv://user:z1OoheclB06GxVER@cluster0.rhayeki.mongodb.net/ETBLINK?retryWrites=true&w=majority"
  ); //replace by MONGO_URL
  console.log("JMS database connected successfully");
};

export default mongodb;
