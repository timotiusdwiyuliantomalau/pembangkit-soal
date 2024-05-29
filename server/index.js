import express from "express";
<<<<<<< HEAD
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import mongoose from "mongoose";
import "dotenv/config";
import routes from "./src/routes/index.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes);

const port = process.env.PORT || 5000;

const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Mongodb connected");
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
}).catch((err) => {
  console.log({ err });
  process.exit(1);
});

//test
=======
import bodyParser from "body-parser";
import { hasilSoal, hasilPilihan} from "./utils/soal.js";
import { config } from "dotenv";
config();
import { connect } from "./db/inputData.js";
import { soal, jawaban } from "./db/model.js";
import path from 'path';
import cors from 'cors';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('script.js', 'react_js/build')));
app.use(cors({
  allowedHeaders: ['Content-Type'],
}));

const port = 3001;
let nomorArr = [];

connect();

app.get("/",(req,res)=>{
  res.json("Server sedang berjalan...");
})
app.post("/", (req, res) => {
  hasilSoal(req.body.inputSoal,req.body.jumlahSoal, async (result) => {
    let arrSoal = [];
    result.forEach((res) => arrSoal.push(res+ "#"));
    async function updateData() {
      try {
        const conditions = { nomor: req.body.nomor};
        const newData = { soal: `${arrSoal}` };
        await soal.findOneAndUpdate(conditions, newData, {
          upsert: true,
          new: true,
        });
      } catch (error) {
        console.error(error);
      }
    }
    updateData();
    hasilPilihan(req.body.inputSoal, (result) => {
      let arrJawaban = [];
      result.forEach((res) => arrJawaban.push(res + "#"));
      async function updateData() {
        try {
          const conditions = { nomor: req.body.nomor };
          const newData = { jawaban: `${arrJawaban}` };
          await jawaban.findOneAndUpdate(conditions, newData, {
            upsert: true,
            new: true,
          });
        } catch (error) {
          console.error(error);
        }
      }
      updateData();
    });
    res.json({
      soal: arrSoal,
    });
  });
});

app.get("/dataSoalJawaban", async (req, res) => {
  const soals = await soal.find().maxTimeMS(20000)
  const jawabans = await jawaban.find().sort({ nomor: 1 }).exec();
  res.json({soals,jawabans})
});

app.get("/paketSoal", async (req, res) => {
  // const soals = await soal.find().maxTimeMS(20000);~
  // const jawabans = await jawaban.find().maxTimeMS(20000);
  const result={message:'Halo'};
  res.json(result);
});

// app.post("/paketSoal", async (req, res) => {
//   const soals = await soal.find().maxTimeMS(20000);
//   const jawabans = await jawaban.find().maxTimeMS(20000);
//   let nomor = parseInt(req.body.nomor);
//   if (req.body.mundur) {
//     nomor -= 1;
//   } else {
//     nomor += 1;
//   }
//     res.render("pageSoal", {
//       title: "Halaman Soal",
//       layout: "main-layout",
//       dataSoals: soals,
//       dataJawabans: jawabans,
//       nomor,
//   })
// });

app.post("/paketSoal", async (req, res) => {
  const soals = await soal.find();
  const jawabans = await jawaban.find();
  let nomor = parseInt(req.body.nomor);
  if (req.body.mundur) {
    nomor -= 1;
  } else {
    nomor += 1;
  }
    res.render("pageSoal", {
      title: "Halaman Soal",
      layout: "main-layout",
      dataSoals: soals,
      dataJawabans: jawabans,
      nomor,
  })
});
app.post("/pageSoal", async (req, res) => {
  const soals = await soal.find().maxTimeMS(20000);
  const jawabans = await jawaban.find().maxTimeMS(20000);
  let nomor = parseInt(req.body.nomor);
  const skor=req.body.skor;
  if (req.body.mundur) {
    nomor -= 1;
  } else {
    nomor += 1;
  }
    res.render("pageSoal", {
      title: "Halaman Soal",
      layout: "main-layout",
      dataSoals: soals,
      dataJawabans: jawabans,
      nomor,
      skor,
  })
});


app.listen(port, () => {
  console.log(`Server sedang berjalan di http://localhost:${port}`);

});
>>>>>>> ac87d27b570888b2a9d3812fc35df08066108dd2
