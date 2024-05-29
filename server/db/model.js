import mongoose from "mongoose";
const soal = mongoose.model("soal", {
  nomor: {
    type: Number,
    require: true,
  },
  soal: {
    type: String,
    require: true,
  },
});
const jawaban=mongoose.model('jawaban',{
  nomor:{
    type:Number,
    require:true,
  },
  jawaban:{
    type:String,
    require:true,
  },
})
export { soal,jawaban };
