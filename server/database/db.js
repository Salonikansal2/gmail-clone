import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = "salonikansal2244";
const PASSWORD = "sagga2244";

const Connection = () => {
  const DB_URI = `mongodb+srv://salonikansal2244:sagga2244@gmailcluster.0ubjv.mongodb.net/?retryWrites=true&w=majority&appName=gmailCluster`;
  try {
    mongoose.connect(DB_URI, { useNewUrlParser: true });
    mongoose.set("strictQuery", false);
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log("Error while connecting with the database ", error.message);
  }
};

export default Connection;
