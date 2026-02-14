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
    // { id: 'tema', label: 'Ganti Tema', type: 'select', options: ['light', 'dark'] }
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
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={isLatin ? true : settings[item.id]}
                onChange={(e) => handleSettingChange(item.id, e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
            </div>
            <span className="text-sm text-gray-600">{settings[item.id] ? 'Aktif' : 'Nonaktif'}</span>
          </label>
        );

      case 'location':
        return (
          <div className="flex flex-col gap-3">
            <select
              value={provinsi || ''}
              onChange={(e) => handleSettingChange('provinsi', e.target.value)}
              className="p-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl w-full outline-none focus:ring-2 focus:ring-emerald-400 text-sm transition-all"
            >
              {daftarProvinsi.length === 0 && <option value="">Pilih Provinsi</option>}
              {daftarProvinsi.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            <select
              value={kabkota || ''}
              onChange={(e) => handleSettingChange('kabkota', e.target.value)}
              className="p-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl w-full outline-none focus:ring-2 focus:ring-emerald-400 text-sm transition-all"
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
            className="p-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl w-full outline-none focus:ring-2 focus:ring-emerald-400 text-sm transition-all"
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
            className="p-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl w-full outline-none focus:ring-2 focus:ring-emerald-400 text-sm transition-all"
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
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center py-4 px-5 bg-white/70 backdrop-blur-xl border-b border-white/60">
          <Link to={pathBefore} onClick={handleBack} className="flex items-center gap-2 group">
            <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm group-hover:bg-emerald-50 transition-colors">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </div>
            <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600 transition-colors">Kembali</span>
          </Link>
        </header>

        <div className="p-5">
          <div className="flex items-center mb-6">
            <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm mr-3">
              <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Pengaturan</h1>
          </div>

          <div className="flex flex-col gap-3">
            {settingsMenu.map(item => (
              <div key={item.id} className="w-full">
                <button
                  className="w-full bg-white/50 backdrop-blur-md border border-white/60 p-4 rounded-2xl flex justify-between items-center font-semibold text-sm text-gray-700 cursor-pointer hover:bg-white/70 hover:shadow-md shadow-sm transition-all duration-300"
                  onClick={() => setOpenSetting(openSetting === item.id ? '' : item.id)}
                >
                  <span>{item.label}</span>
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${openSetting === item.id ? 'bg-emerald-100 text-emerald-600' : 'text-gray-300'} transition-all`}>
                    <svg className={`w-4 h-4 transition-transform duration-300 ${openSetting === item.id ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </div>
                </button>
                {openSetting === item.id && (
                  <div className="bg-white/30 backdrop-blur-md border border-white/40 rounded-xl mt-2 p-4 transition-all duration-300">
                    {renderSettingForm(item)}
                  </div>
                )}
              </div>
            ))}

            {/* Info Pembuat */}
            <a href="https://www.instagram.com/athrsyd__">
            <button className="w-full bg-white/50 backdrop-blur-md border border-white/60 p-4 rounded-2xl flex justify-between items-center font-semibold text-sm text-gray-700 cursor-pointer hover:bg-white/70 hover:shadow-md shadow-sm transition-all duration-300">
              <span>Informasi Pembuat</span>
              <svg className="w-4 h-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
            </a>

            {/* Hapus Semua Data */}
            <button
              onClick={() => hapusSemuaData()}
              className="mt-4 mx-auto w-2/3 bg-red-50/80 backdrop-blur-md border border-red-200/50 p-4 rounded-2xl flex justify-between items-center font-semibold text-sm text-red-600 cursor-pointer hover:bg-red-100/80 hover:shadow-md shadow-sm transition-all duration-300"
            >
              <span>Hapus Semua Data</span>
              <div className="p-2 bg-red-100/80 rounded-xl">
                <Trash2 className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Setting