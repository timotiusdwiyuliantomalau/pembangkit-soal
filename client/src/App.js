import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Home } from "./pages/Home";
import { Nav } from './pages/Nav'
import { Data } from './pages/Data';
import { Ujian } from './pages/Ujian';

function App() {
return(
  <BrowserRouter>
      {window.location.pathname.substring(1)!='ujian'&&window.location.pathname.substring(1)!='Ujian'?
      <Nav/>:<p className='hidden'>ayo</p>}
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/data' element={<Data/>}/>
      <Route path='/ujian' element={<Ujian/>}/>
      </Routes>
  </BrowserRouter>)
}

export default App;
