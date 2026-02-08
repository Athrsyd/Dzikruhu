import React, { use } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Smartphone, AlertCircle } from 'lucide-react'
import WaktuSholat from './pages/WaktuSholat/WaktuSholat'
import Navbar from './components/Navbar/Navbar'
import AlQuranApp from './pages/Quran/Quran'
// import QiblatFinder from './pages/WaktuSholat/QiblatFinder/QiblatFinder'
import Doa from './pages/Doa/doa'
import  NavPage  from './pages/NavPage/NavPage'
import Sholat from './pages/Sholat/Sholat'
import Home from './pages/Home/Home'
import Setting from './pages/Setting/Setting'
import TasbihDigital from './pages/Tasbih/Tasbih'

const App = () => {
  console.log(window.innerWidth)
  if (window.innerWidth > 850) {
    return (
      <div className='flex flex-col justify-center items-center h-screen bg-linear-to-br from-red-50 to-orange-50'>
        <AlertCircle size={80} className='text-red-500 mb-6' />
        <Smartphone size={60} className='text-orange-500 mb-6 animate-bounce' />
        <h1 className='text-3xl font-bold mb-4 text-gray-800'>Aplikasi ini hanya dapat digunakan pada perangkat mobile.</h1>
        <p className='text-center text-gray-600 max-w-md'>Silakan buka aplikasi ini pada perangkat dengan layar lebih kecil untuk pengalaman terbaik.</p>
      </div>
    )
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/kiblat" element={<QiblatFinder/>} /> */}
          <Route path='sholat' element={<Sholat/>}/>
          <Route path="/quran/*" element={<AlQuranApp />} />
          <Route path="/doa" element={<Doa />} />
          <Route path="/more" element={<NavPage />} />
          <Route path="/tasbih" element={<TasbihDigital />} />
          <Route path="/settings" element={<Setting />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  )
}

export default App