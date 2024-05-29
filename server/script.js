import express from "express";
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
