import mongoose from "mongoose";
const connect = () => {
  mongoose.connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  



// Use findOneAndUpdate to update the document or insert it if it doesn't exist

};
export { connect };
