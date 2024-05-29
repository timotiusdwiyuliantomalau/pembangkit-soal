import mongoose from "mongoose";
const connect = () => {
  mongoose.connect("mongodb+srv://pembangkit-soal:<password>@cluster0.8i5kff4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
  



// Use findOneAndUpdate to update the document or insert it if it doesn't exist

};
export { connect };
