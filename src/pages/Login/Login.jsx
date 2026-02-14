import { useState, useEffect } from 'react'
import { useNavbar } from '../../context/NavbarContext'
import { useLocation } from '../../context/LocationContext'
import { useUsername } from '../../context/UsernameContext'
import { useNavigate } from 'react-router-dom'
import { User, MapPin, ChevronDown } from 'lucide-react'
// import bgLogin from '../'


const Login = () => {
  const navigate = useNavigate()
  const { provinsi, setProvinsi, kabkota, setKabkota, daftarProvinsi, daftarKabKota } = useLocation()
  const { setUsername } = useUsername()
  const { setIsOpen } = useNavbar()
  const [inputUsername, setInputUsername] = useState('')
  const [inputProvinsi, setInputProvinsi] = useState('')
  const [inputKabkota, setInputKabkota] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsOpen(false)
  }, [])

  const changeUsername = (e) => {
    setInputUsername(e.target.value)
  }
  const changeProvinsi = (e) => {
    setInputProvinsi(e.target.value)
    setProvinsi(e.target.value);
    const firstKabKota = daftarKabKota.length > 0 ? daftarKabKota[0] : '';
    setInputKabkota(firstKabKota);
  }

  useEffect(() => {
    console.log(inputUsername)
    console.log(inputProvinsi)
    console.log(inputKabkota)
  }, [inputUsername, inputProvinsi, inputKabkota])

  const handleOnClick = (e) => {
    e.preventDefault();
    localStorage.setItem('username', inputUsername);
    localStorage.setItem('kabkota', inputKabkota);
    localStorage.setItem('provinsi', inputProvinsi);
    setUsername(inputUsername);
    setKabkota(inputKabkota);
    setIsLoggedIn(true);
    setIsOpen(true);
    navigate('/');
  }

  const loadingAnimation = () => {
    return (
      <div >
        <p className='text-2xl font-bold mb-4 text-gray-800'>Loading...</p>
      </div>
    )
  }


  return (
    <div className="bg-[url('/bg-Login.jpg')] w-full h-screen flex flex-col justify-end items-center bg-cover bg-center relative overflow-hidden">
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-emerald-950/95 via-emerald-900/60 to-transparent" />

      {/* Decorative Islamic pattern circles */}
      <div className="absolute top-16 -right-7.5 w-40 h-40 rounded-full border border-white/10 animate-pulse" />
      <div className="absolute top-24 -right-2.5 w-28 h-28 rounded-full border border-white/5" />
      <div className="absolute top-10 -left-5 w-32 h-32 rounded-full border border-white/10 animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Top branding area */}
      <div className="relative z-10 flex flex-col items-center mb-auto mt-20">
        {/* Crescent & star icon */}
        <div className="">
          <img src="/MuslimApp_Logo (1).png" alt="" className='w-20 h-20 mb-4' />
        </div>
        <h1 className="text-white text-2xl font-bold tracking-wide">Dzikruhu</h1>
        <p className="text-emerald-200/70 text-sm mt-1">Teman Ibadah Harianmu</p>
      </div>

      {/* Bottom card */}
      <div className="relative z-10 w-full px-6 pb-12 pt-8">
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-7 border border-white/15 shadow-2xl shadow-black/20">
          {/* Header */}
          <div className="text-center mb-6">
              <p className="text-center text-emerald-200/30 text-[20px] mb-2">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <h2 className="text-white text-xl font-bold mb-1">Assalamu'alaikum!</h2>
            <p className="text-emerald-100/60 text-xs leading-relaxed">
              Masukkan data dirimu agar kami bisa menyesuaikan jadwal sholat di wilayahmu
            </p>
          </div>

          <form action="" className="flex flex-col gap-3">
            {/* Username input */}
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70" />
              <input
                type="text"
                placeholder="Masukkan nama kamu"
                value={inputUsername}
                onChange={(e) => changeUsername(e)}
                className="w-full pl-11 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white placeholder-white/40 text-sm outline-none focus:border-emerald-400/60 focus:bg-white/15 transition-all duration-300"
              />
            </div>

            {/* Provinsi select */}
            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70 z-10" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/50 z-10 pointer-events-none" />
              <select
                name="provinsi"
                id=""
                onChange={(e) => changeProvinsi(e)}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm outline-none focus:border-emerald-400/60 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer [&>option]:text-gray-800"
              >
                <option value="">Pilih Provinsi</option>
                {daftarProvinsi.map((prov) => (
                  <option key={prov} value={prov}>{prov}</option>
                ))}
              </select>
            </div>

            {/* Kabupaten select */}
            <div className={`relative transition-all duration-400 ease-in-out ${inputProvinsi === '' ? 'hidden opacity-0' : 'opacity-100'}`}>
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-300/70 z-10" />
              <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-300/50 z-10 pointer-events-none" />
              <select
                name="kabupatem"
                id=""
                onChange={(e) => { setInputKabkota(e.target.value) }}
                className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-white/10 border border-white/15 text-white text-sm outline-none focus:border-emerald-400/60 focus:bg-white/15 transition-all duration-300 appearance-none cursor-pointer [&>option]:text-gray-800"
              >
                {daftarKabKota.length === 0 && <option value="">Pilih Kabupaten/Kota</option>}
                {daftarKabKota.map((kab) => (
                  <option key={kab} value={kab}>{kab}</option>
                ))}
              </select>
            </div>

            {/* Login button */}
            <button
              onClick={(e) => handleOnClick(e)}
              className="w-full mt-2 py-3.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold text-sm tracking-wide shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 active:scale-[0.98] transition-all duration-300"
            >
              Mulai Sekarang
            </button>
          </form>

          {/* Bottom decorative text */}
        </div>
      </div>
    </div>
  )
}

export default Login