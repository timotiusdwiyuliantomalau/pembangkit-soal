import axios from "axios";
import { useRef, useState } from "react";

export function Home(props){
const [inputSoal,setInputSoal]=useState('');
  const [hasilSoal,setHasilSoal]=useState([]);
  const [jumlahSoal,setJumlahSoal]=useState([]);
  const [nomor,setNomor]=useState(0);

  async function handleDataSoal(e){
  document.body.style.cursor='wait';
  setTimeout(()=>{
    document.body.style.cursor='default';
  },[2000])
  setNomor(e.target.parentNode.nextElementSibling.value);
  const res=await axios.post("http://localhost:3001/",{nomor:e.target.parentNode.nextElementSibling.value,inputSoal,jumlahSoal});
  setHasilSoal(res.data.soal);
}

const hoverTooltip=(e)=>{
  if(e.target.id=='tooltip'){
  e.target.nextElementSibling.classList.remove('hidden');
  setTimeout(()=>{
    e.target.nextElementSibling.classList.add('hidden');
  },[400]);
}
}

  function hapusContainer(e){
  e.target.parentNode.parentNode.parentNode.classList.add('hidden');
  }

  let arrSoal=[];
  for(let i=1;i<11;i++){
      arrSoal.push(
      <div key={i} className="soalContainer flex flex-col mb-4">
      <label className="text-l font-serif font-semibold tracking-wider uppercase text-[#2B2E4A]" htmlFor={'soal'+i}>Tujuan P {i}</label>
      <div className="flex gap-3 relative">
      <input  onChange={(e)=>{setInputSoal(e.target.value)}} id={'soal'+i} className="w-[30rem] bg-[#FBFADA] border-[1px] border-gray-400 rounded-md pl-2 text-wrap" type="text"/>
      {/* <input  onChange={(e)=>{setJumlahSoal(e.target.value)}} id={'soal'+i} className="w-[30rem] bg-[#FBFADA] border-[1px] border-gray-400 rounded-md pl-2 text-wrap" type="text"/> */}
      <span className="relative">
    <svg id="tooltip" onClick={handleDataSoal} onMouseOver={hoverTooltip} className="p-2 rounded-full bg-[#12372A] cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 15 16" {...props}><path fill="#ffff" d="M12.49 7.14L3.44 2.27c-.76-.41-1.64.3-1.4 1.13l1.24 4.34c.05.18.05.36 0 .54l-1.24 4.34c-.24.83.64 1.54 1.4 1.13l9.05-4.87a.98.98 0 0 0 0-1.72Z"></path></svg>
    <p className="w-[5.4rem] -bottom-[1.3rem] -left-5 text-xs text-center rounded-sm hidden absolute text-white bg-gray-600">Submit Button</p>
    </span>
    <input type="hidden" defaultValue={i}/>
    {hasilSoal.length>0&&nomor==i&&
    <span className="relative">
    <svg id="tooltip" onClick={hapusContainer} className="cursor-pointer bg-blue-900 p-[7px] rounded-full" onMouseOver={hoverTooltip} xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24" {...props}><path fill="#ffff" d="M21 7v12q0 .825-.587 1.413T19 21H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h12zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18m-6-8h9V6H6z"></path></svg>
    <p className="w-[5rem] -bottom-[1.3rem] hidden -left-5 text-xs text-center rounded-sm absolute text-white bg-gray-600">Save Button</p>
    </span>}
      </div>
      {nomor==i&&<span className="mb-4 mt-1 w-[30rem] pl-4">
        {hasilSoal.length>0&&hasilSoal.map((soal,i)=>(<p key={i}>{soal.substring(0,soal.length-1)}</p>))}
      </span>}
    </div>
    )
    }
  return (
    <>
    <div className="flex flex-col pl-6">
      <span className="mb-7 mt-3 text-3xl font-medium  rounded-full w-60 text-center">Generate Soal</span>
      {arrSoal.map(soal=>(soal))}
    </div>
    </>
  );
}
