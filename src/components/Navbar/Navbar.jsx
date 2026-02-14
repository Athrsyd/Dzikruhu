import { useNavbar } from '../../context/NavbarContext.jsx';
import { Link, useLocation } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaMosque, FaQuran } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";

const Navbar = () => {
  const { isOpen, setPathBefore } = useNavbar();
  const location = useLocation();
  const pathname = location.pathname;

  // Tentukan halaman aktif berdasarkan URL
  const getActivePage = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/sholat')) return 'pray';
    if (pathname.startsWith('/quran')) return 'quran';
    // semua halaman di /more, /tasbih, /doa, /settings = 'more'
    if (['/more', '/tasbih', '/doa', '/settings'].some(p => pathname.startsWith(p))) return 'more';
    return '';
  }

  const activePage = getActivePage();

  const savePathBefore = () => {
    setPathBefore(pathname);
  }

  const navItems = [
    { id: 'home', to: '/', icon: IoHomeSharp, label: 'Home' },
    { id: 'pray', to: '/sholat', icon: FaMosque, label: 'Sholat' },
    { id: 'quran', to: '/quran', icon: FaQuran, label: 'Quran' },
    { id: 'more', to: '/more', icon: MdOutlineMoreHoriz, label: 'Lainnya' },
  ]

  if (!isOpen) return null;
  return (
    <header className="w-full fixed bottom-0 left-0 z-50 px-2 pb-5">
      <nav className="bg-green-500/30 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/10 rounded-t-2xl px-2 ">
        <div className="flex flex-row items-center justify-around">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            const Icon = item.icon;
            return (
              <Link key={item.id} to={item.to} onClick={savePathBefore} className="flex-1 flex justify-center">
                <div className={`flex flex-col items-center px-3 rounded-xl transition-all duration-300 ease-in-out relative
                  ${isActive ? 'text-white -translate-y-4' : 'text-gray-400 py-2'}`}>
                  <div className={`p-3 rounded-full transition-all duration-300 
                    ${isActive ? 'bg-emerald-500 shadow-lg shadow-emerald-500/40 scale-110' : ''}`}>
                    <Icon size={isActive ? 22 : 20} />
                  </div>
                  <span className={`text-[12px] mt-1 font-semibold tracking-wide transition-all duration-300
                    ${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>
                    {item.label}
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </nav>
    </header>
  )
}

export default Navbar