import mongoose from "mongoose";
const mongodb = async () => {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }); //replace by MONGO_URL
  console.log("JMS database connected successfully");
};

export default mongodb;
