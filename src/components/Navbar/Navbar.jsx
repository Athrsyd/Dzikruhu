import { useEffect, useState } from 'react'
import { useNavbar } from '../../context/NavbarContext.jsx';
import { Link } from 'react-router-dom';
import { IoHomeSharp } from "react-icons/io5";
import { FaMosque, FaQuran } from "react-icons/fa";
import { MdOutlineMoreHoriz } from "react-icons/md";



const Navbar = () => {
  const { isOpen } = useNavbar();
  const [page, setPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'home';
  });

  const changePage = (page) => {
    setPage(page);
  }
  useEffect(() => {
    localStorage.setItem('currentPage', page);
  }, [page]);

  if (!isOpen) return null;
  return (
    <header className="p-5 w-full fixed bottom-0 left-0 right-0 z-50">

      <nav className="bg-green-600 p-2 text-white w-full rounded-xl">
        {/* <h1 className="text-xl font-bold">Muslim App</h1> */}
        <div className="contaier flex flex-row items-start justify-between  ">

          <Link to="/" onClick={() => changePage('home')}>
            <div className={`home flex flex-col items-center  p-2 rounded-lg ${page === 'home' ? 'bg-green-800' : ''}`}>
              <IoHomeSharp size={20} onClick={() => setPage('home')} />
              <h3 className='font-bold'>Home</h3>
            </div>
          </Link>
          <Link to="/sholat" onClick={() => changePage('pray')}>
            <div className={`pray flex flex-col items-center  p-2 rounded-lg ${page === 'pray' ? 'bg-green-800' : ''}`}>
              <FaMosque size={20} />
              <h3 className='font-bold'>Sholat</h3>
            </div>
          </Link>
          <Link to="/quran" onClick={() => changePage('quran')}>
            <div className={`quran flex flex-col items-center  p-2 rounded-lg ${page === 'quran' ? 'bg-green-800' : ''}`}>
              <FaQuran size={20} />
              <h3 className='font-bold'>Quran</h3>
            </div>
          </Link>
          {/* <Link to="/doa" onClick={()=>changePage('quran')}>
        <div className={`quran flex flex-col items-center  p-2 rounded-lg ${page === 'quran' ? 'bg-green-800' : ''}`}>
          <FaQuran  size={20} />
            <h3 className='font-bold'>Doa</h3>
            </div>
            </Link> */}
          <Link to="/more" onClick={() => changePage('tasbih')}>
            <div className={`tasbih flex flex-col items-center  p-2 rounded-lg ${page === 'tasbih' ? 'bg-green-800' : ''}`}>
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