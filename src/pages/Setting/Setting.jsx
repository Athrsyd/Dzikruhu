import { useEffect, useState } from 'react'
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop.jsx';
import { useNavbar } from '../../context/NavbarContext.jsx';
import { Link } from 'react-router-dom';
import { useLatin } from '../../context/LatinContext.jsx';
import { useFont } from '../../context/FontContext.jsx';
import { useUsername } from '../../context/UsernameContext.jsx';
import { useLocation } from '../../context/LocationContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import {Trash2} from 'lucide-react'

const Setting = () => {
  const { provinsi, setProvinsi, kabkota, setKabkota, daftarProvinsi, daftarKabKota, } = useLocation();
  const { username, setUsername } = useUsername();
  const { fontSize, setFontSize } = useFont();
  const { isLatin, setIsLatin } = useLatin();
  const { theme, setTheme } = useTheme();
  const { setIsOpen, pathBefore, setPathBefore } = useNavbar();
  const [openSetting, setOpenSetting] = useState('');
  const [settings, setSettings] = useState({
    latin: isLatin,
    fontQuran: fontSize,
    username: username,
    lokasiProvinsi: 'Indonesia',
    lokasiKabupaten: 'Indonesia',
    tema: theme
  });

  // Sinkronkan state lokal dengan context
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      latin: isLatin,
      fontQuran: fontSize,
      tema: theme
    }));
  }, [isLatin, fontSize, theme]);

  const settingsMenu = [
    { id: 'latin', label: 'Aktifkan latin pada Al-Qur\'an', type: 'toggle' },
    { id: 'fontQuran', label: 'Ganti Ukuran Font Alquran', type: 'select', options: ['Small', 'Medium', 'Large', 'Extra Large'] },
    { id: 'username', label: 'Ganti Nama Pengguna', type: 'text' },
    { id: 'lokasi', label: 'Ganti Lokasi', type: 'location' },
    { id: 'tema', label: 'Ganti Tema', type: 'select', options: ['light', 'dark'] }
  ];

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const handleBack = () => {
    setIsOpen(true);
  }

  const handleSettingChange = (id, value) => {
    setSettings(prev => ({ ...prev, [id]: value }));

    if (id === 'latin') setIsLatin(value);
    if (id === 'fontQuran') setFontSize(value);
    if (id === 'username') setUsername(value);
    if (id === 'tema') setTheme(value);

    if (id === 'provinsi') {
      setProvinsi(value);
      const firstKabKota = daftarKabKota.length > 0 ? daftarKabKota[0] : '';
      setKabkota(firstKabKota);
    }

    if (id === 'kabkota') {
      setKabkota(value);
    }
  }

  const renderSettingForm = (item) => {
    switch (item.type) {
      case 'toggle':
        return (
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isLatin ? true : settings[item.id]}
              onChange={(e) => handleSettingChange(item.id, e.target.checked)}
              className="w-5 h-5 cursor-pointer"
            />
            <span>{settings[item.id] ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        );

      case 'location':
        return (
          <div className="flex flex-col gap-3">
            <select
              value={provinsi || ''}
              onChange={(e) => handleSettingChange('provinsi', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              {daftarProvinsi.length === 0 && <option value="">Pilih Provinsi</option>}
              {daftarProvinsi.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select
              value={kabkota || ''}
              onChange={(e) => handleSettingChange('kabkota', e.target.value)}
              className="p-2 border border-gray-300 rounded-lg w-full"
            >
              {daftarKabKota.length === 0 && <option value="">Pilih Kabupaten/Kota</option>}
              {daftarKabKota.map((k) => (
                <option key={k} value={k}>{k}</option>
              ))}
            </select>
          </div>
        );

      case 'select':
        return (
          <select
            value={settings[item.id]}
            onChange={(e) => handleSettingChange(item.id, e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full"
          >
            {item.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        );

      case 'text':
        return (
          <input
            type="text"
            value={settings[item.id]}
            onChange={(e) => handleSettingChange(item.id, e.target.value)}
            className="p-2 border border-gray-300 rounded-lg w-full outline-none"
          />
        );

      default:
        return null;
    }
  }
  const hapusSemuaData = () => {
    localStorage.clear();
    setUsername('');
  }
  return (
    <>
      <ScrollToTop />
      <div>
        <div className="flex items-center p-4 border-b border-gray-300">
          <Link to={pathBefore} onClick={handleBack} className="mr-4 text-blue-500 hover:text-blue-700">
            &#8592; Back
          </Link>
        </div>
        <div className="p-5">
          <h1 className="text-3xl font-bold mb-10">Settings</h1>
          {/* <div className='search-setting'>
            <input
              type="text"
              placeholder="Search settings..."
              className="w-full p-2 border border-gray-300 rounded-2xl outline-none mt-4"
            />
          </div> */}
          <div className="mt-6">
            <ul className="flex flex-col justify-center items-center gap-4">
              {settingsMenu.map(item => (
                <div key={item.id} className='w-full '>
                  <li
                    className='bg-green-200 p-3 rounded-2xl flex justify-between flex-row font-semibold cursor-pointer hover:bg-green-300 transition-all duration-500 ease-in-out'
                    onClick={() => setOpenSetting(openSetting === item.id ? '' : item.id)}
                  >
                    {item.label}
                    <span className={openSetting === item.id ? 'rotate-90' : ''}>&gt;</span>
                  </li>
                  {openSetting === item.id && (
                    <div className={`bg-green-50 rounded-lg mt-2 overflow-hidden transition-all duration-300 ease-in-out ${openSetting === item.id ? 'max-h-96 p-4' : 'max-h-0 p-0'}`}>
                      {renderSettingForm(item)}
                    </div>
                  )}
                </div>
              ))}
              <li className='bg-green-200 w-full p-3 rounded-2xl flex justify-between flex-row font-semibold cursor-pointer hover:bg-green-300 transition'>Infomasi Pembuat <span>&gt;</span></li>
              <li 
              onClick={()=> hapusSemuaData()}
              className='items-center bg-red-200 p-3 w-2/3 rounded-2xl flex justify-between flex-row font-semibold cursor-pointer hover:bg-red-300 transition'>Hapus Semua Data <span className='bg-red-300 p-2 rounded-2xl '><Trash2/></span></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting