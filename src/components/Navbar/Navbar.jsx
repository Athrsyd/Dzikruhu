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

  if (!isOpen) return null;
  return (
    <header className="p-5 w-full fixed bottom-0 left-0 right-0 z-50">
      <nav className="bg-green-600 p-2 text-white w-full rounded-xl">
        <div className="contaier flex flex-row items-start justify-between">
          <Link to="/" onClick={savePathBefore}>
            <div className={`home flex flex-col items-center p-2 rounded-lg ${activePage === 'home' ? 'bg-green-800' : ''}`}>
              <IoHomeSharp size={20} />
              <h3 className='font-bold'>Home</h3>
            </div>
          </Link>
          <Link to="/sholat" onClick={savePathBefore}>
            <div className={`pray flex flex-col items-center p-2 rounded-lg ${activePage === 'pray' ? 'bg-green-800' : ''}`}>
              <FaMosque size={20} />
              <h3 className='font-bold'>Sholat</h3>
            </div>
          </Link>
          <Link to="/quran" onClick={savePathBefore}>
            <div className={`quran flex flex-col items-center p-2 rounded-lg ${activePage === 'quran' ? 'bg-green-800' : ''}`}>
              <FaQuran size={20} />
              <h3 className='font-bold'>Quran</h3>
            </div>
          </Link>
          <Link to="/more" onClick={savePathBefore}>
            <div className={`tasbih flex flex-col items-center p-2 rounded-lg ${activePage === 'more' ? 'bg-green-800' : ''}`}>
              <MdOutlineMoreHoriz size={20} />
              <h3 className='font-bold'>lainnya</h3>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar