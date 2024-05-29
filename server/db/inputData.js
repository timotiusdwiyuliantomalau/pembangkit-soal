import mongoose from "mongoose";
import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);
const connect = () => {
mongoose.connect("mongodb+srv://pembangkit-soal:123@cluster0.8i5kff4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
  console.log("Mongodb connected");
  server.listen(3003, () => {
    console.log(`Server is listening on port 3001`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});
};
export { connect };
