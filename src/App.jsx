import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import WaktuSholat from './pages/WaktuSholat/WaktuSholat'
import Navbar from './components/Navbar/Navbar'
import AlQuranApp from './pages/Quran/Quran'
// import QiblatFinder from './pages/WaktuSholat/QiblatFinder/QiblatFinder'
import Doa from './pages/Doa/doa'
import  NavPage  from './pages/NavPage/NavPage'
import Sholat from './pages/Sholat/Sholat'
import Home from './pages/Home/Home'
import Setting from './pages/Setting/Setting'

const App = () => {
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
          <Route path="/settings" element={<Setting />} />
        </Routes>
        <Navbar />
      </BrowserRouter>
    </>
  )
}

export default App