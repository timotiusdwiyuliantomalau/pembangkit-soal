import axios from "axios";
import { useEffect, useRef, useState } from "react";

export function Ujian() {
  const [soal, setSoal] = useState([]);
  const [jawaban, setJawaban] = useState([]);
  let nomorRefresh = parseInt(localStorage.getItem("nomor"));
  const [nomorSoal, setNomorSoal] = useState(nomorRefresh ?? 0);
  const [nomorPaket, setNomorPaket] = useState(0);
  const [hasilSkor, setHasilSKor] = useState(false);
  const [kunciJawaban, setKunciJawaban] = useState([]);
  const [arrayOption, setArrayOption] = useState(
    JSON.parse(localStorage.getItem("jawaban")) || []
  );
  let [nilai, setNilai] = useState(0);
  const btnOption = useRef();
  const btnNomorSoal = useRef();

  useEffect(() => {
    let kunciJawabans = [];
    async function getData() {
      const data = await axios.get("http://localhost:3001/dataSoalJawaban");
      data.data.jawabans.forEach((datas) => {
        kunciJawabans.push(
          datas.jawaban
            .split("#")
            [datas.jawaban.split("#").length - 2].split(":")[1]
            .substring(2, 1)
        );
        setKunciJawaban(kunciJawabans);
      });

      for (let i = 0; i < data.data.soals.length; i++) {
        if (data.data.soals[i].nomor == nomorSoal + 1) {
          setSoal(data.data.soals[i].soal.split("#")[nomorPaket].substring(3));
        }
        const jawabanSplit = data.data.jawabans[nomorSoal].jawaban.split("#");
        if (jawabanSplit.length == 8) {
          setJawaban([
            jawabanSplit[1].substring(1),
            jawabanSplit[2].substring(1),
            jawabanSplit[3].substring(1),
            jawabanSplit[4].substring(1),
          ]);
        } else if (jawabanSplit.length == 9) {
          setJawaban([
            jawabanSplit[2].substring(1),
            jawabanSplit[3].substring(1),
            jawabanSplit[4].substring(1),
            jawabanSplit[5].substring(1),
          ]);
        } else {
          setJawaban([
            jawabanSplit[3].substring(1),
            jawabanSplit[4].substring(1),
            jawabanSplit[5].substring(1),
            jawabanSplit[6].substring(1),
          ]);
        }
      }
    }
    getData();
    localStorage.setItem("jawaban", JSON.stringify(arrayOption));
  }, [nomorSoal, nomorPaket, arrayOption]);

  const handleNextQuest = () => {
    if (nomorSoal < kunciJawaban.length - 1) {
      setNomorSoal(nomorSoal + 1);
    }
    btnOption.current.childNodes.forEach((btn) => {
      btn.classList.remove("bg-green-800");
    });
    btnNomorSoal.current.childNodes.forEach((btn) => {
      btn.classList.remove("bg-slate-300");
    });
  };

  const handlePrevQuest = () => {
    if (nomorSoal > 0) {
      setNomorSoal(nomorSoal - 1);
    }
    btnOption.current.childNodes.forEach((btn) => {
      btn.classList.remove("bg-green-800");
    });
    btnNomorSoal.current.childNodes.forEach((btn) => {
      btn.classList.remove("bg-slate-300");
    });
  };

  function changeNomorSoal(e) {
    setNomorSoal(e.target.textContent - 1);
    btnOption.current.childNodes.forEach((btn) =>
      btn.classList.remove("bg-green-800")
    );
    btnNomorSoal.current.childNodes.forEach((btn) => {
      btn.classList.remove("bg-slate-300");
    });
    e.target.classList.add("bg-slate-300");
  }

  function clickOption(e) {
    e.target.parentNode.childNodes.forEach((btn, i) => {
      btn.classList.remove("bg-green-800");
      btn.removeAttribute("id");
    });
    e.target.classList.add("bg-green-800");
    e.target.setAttribute("id", "selected");
    const soalSama = arrayOption.find((option) => option.nomor == nomorSoal);
    if (soalSama) {
      soalSama.jawaban = e.target.textContent.substring(1, 0);
      setArrayOption(arrayOption);
    } else {
      setArrayOption([
        ...arrayOption,
        { nomor: nomorSoal, jawaban: e.target.textContent.substring(1, 0) },
      ]);
    }
  }
  useEffect(() => {
    if (kunciJawaban.length > 0) {
      btnNomorSoal.current.children[2].classList.add("bg-slate-300");
    }
    localStorage.setItem("nomor", nomorSoal);
    for (let i = 0; i < kunciJawaban.length; i++) {
      arrayOption[i] &&
        btnNomorSoal.current.children[i].classList.add("bg-green-500");
    }
  }, [kunciJawaban, nomorSoal, arrayOption]);

  function showScore() {
    setHasilSKor(true);
    for (let i = 0; i < kunciJawaban.length; i++) {
      if(kunciJawaban[i] == arrayOption[i].jawaban){
        setNilai((nilai += 10));
      }
    }
    localStorage.removeItem("jawaban");
  }

  return (
    <div className="relative">
      <h1>Ujian Sekolah</h1>
      {hasilSkor && (
        <div className="absolute top-10 left-40 bg-white z-10 w-1/2 h-1/2 p-3 rounded-md">
          <h1 className="text-3xl">Hasil Nilai</h1>
          <p className="text-xl">Nilai Anda adalah {nilai} / 100</p>
        </div>
      )}
      <div className="ml-4 flex gap-4">
        <div>
          <p className="font-medium">
            {nomorSoal + 1}. {soal}
          </p>
          <span className="flex flex-col gap-2" ref={btnOption}>
            {jawaban.map((jwb, i) => (
              <button
                onClick={clickOption}
                className="text-left text-white bg-green-600 hover:bg-green-800 p-1 rounded-lg w-96"
                key={i}
              >
                {jwb}
              </button>
            ))}
          </span>
        </div>
        {kunciJawaban.length > 0 && (
          <div
            ref={btnNomorSoal}
            className={`bg-slate-200 grid grid-cols-4 h-48 p-2`}
          >
            {kunciJawaban.map((nomor, i) => (
              <div
                key={i}
                onClick={changeNomorSoal}
                className="w-12 h-12 cursor-pointer hover:bg-slate-300 rounded-full flex justify-center items-center"
              >
                {i + 1}
              </div>
            ))}
          </div>
        )}
        <button
          onClick={showScore}
          className="self-start p-1 bg-red-600 rounded-md text-white font-medium"
        >
          Selesai
        </button>
      </div>
      <div className="flex gap-12 text-2xl">
        <button
          className="p-2 bg-blue-700 text-white rounded-xl"
          onClick={handlePrevQuest}
        >
          &laquo;
        </button>
        <button
          className="p-2 bg-blue-700 text-white rounded-xl"
          onClick={handleNextQuest}
        >
          &raquo;
        </button>
      </div>
    </div>
  );
}
