import mongoose from "mongoose";
import express from "express";
const app = express();
const connect = () => {
mongoose.connect("mongodb+srv://pembangkit-soal:123@cluster0.8i5kff4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
};
export { connect };
