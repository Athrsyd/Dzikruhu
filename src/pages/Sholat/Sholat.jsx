// import React, {  } from 'react'
import { SettingsIcon, MapPin } from 'lucide-react'
import { useState, useEffect } from 'react'
import { fetchDataSholat } from '../../services/apiSholat';
import { useLocation } from '../../context/LocationContext';
import { Link } from 'react-router-dom';
import MainBento from './Components/MainBento';
import SecBento from './Components/SecBento';
import BarStatus from './Components/BarStatus';
import JadwalSholat from './Components/JadwalSholat';
import { useNavbar } from '../../context/NavbarContext.jsx';

const Sholat = () => {
  const { provinsi, setProvinsi, kabkota, setKabkota, daftarProvinsi, daftarKabKota } = useLocation();
  const { setPathBefore } = useNavbar();
  const [data, setData] = useState(null);
  const [jadwalHariIni, setJadwalHariIni] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [checkSholat, setCheckSholat] = useState(0);
  const [checkedSholat, setCheckedSholat] = useState({}); // Tambah state baru ini
  const [lokasi, setLokasi] = useState('');
  const [waktuSekarang, setWaktuSekarang] = useState(new Date())

  const namaSholat = {
    'subuh': 'Subuh',
    'terbit': 'Terbit',
    'dhuha': 'Dhuha',
    'dzuhur': 'Dzuhur',
    'ashar': 'Ashar',
    'maghrib': 'Maghrib',
    'isya': 'Isya'
  };

  const ambilData = async (prov, kab) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchDataSholat(prov, kab);
      setData(response.data);

      // Cari jadwal hari ini
      const today = new Date().getDate();
      const jadwal = response.data.jadwal.find(j => j.tanggal === today);
      setJadwalHariIni(jadwal);

      setLoading(false);
      console.log("fetch berhasil", response.data)
    } catch (err) {
      setError('Gagal mengambil data. Cek kembali provinsi dan kota yang dipilih')
      console.error(err);
      setLoading(false);
    }
  }

  const getCurrentPrayer = (jadwal) => {
    if (!jadwal) return null;

    const menitSekarang = new Date().getHours() * 60 + new Date().getMinutes();

    const sholat = [
      { name: 'subuh', time: jadwal.subuh },
      { name: 'terbit', time: jadwal.terbit },
      { name: 'dhuha', time: jadwal.dhuha },
      { name: 'dzuhur', time: jadwal.dzuhur },
      { name: 'ashar', time: jadwal.ashar },
      { name: 'maghrib', time: jadwal.maghrib },
      { name: 'isya', time: jadwal.isya }
    ];

    for (let i = 0; i < sholat.length; i++) {
      const [jam, menit] = sholat[i].time.split(':');
      const menitWaktuSholat = parseInt(jam) * 60 + parseInt(menit);

      if (menitSekarang < menitWaktuSholat) {
        return i > 0 ? sholat[i - 1].name : 'isya';
      };
    }
    return sholat[sholat.length - 1].name
  };

  const getNextPrayer = (jadwal) => {
    if (!jadwal) return null;

    const detikSekarang = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();

    const sholat = [
      { name: 'subuh', time: jadwal.subuh },
      { name: 'terbit', time: jadwal.terbit },
      { name: 'dhuha', time: jadwal.dhuha },
      { name: 'dzuhur', time: jadwal.dzuhur },
      { name: 'ashar', time: jadwal.ashar },
      { name: 'maghrib', time: jadwal.maghrib },
      { name: 'isya', time: jadwal.isya }
    ];

    for (let i = 0; i < sholat.length; i++) {
      const [jam, menit] = sholat[i].time.split(':');
      const detikWaktuSholat = parseInt(jam) * 3600 + parseInt(menit) * 60;

      if (detikSekarang < detikWaktuSholat) {
        const waktuTersisa = detikWaktuSholat - detikSekarang;
        const jam = Math.floor(waktuTersisa / 3600)
        const menit = Math.floor((waktuTersisa % 3600) / 60);
        const detik = waktuTersisa % 60;
        return {
          name: sholat[i].name,
          waktu: sholat[i].time,
          tersisa: `- ${jam} : ${menit.toString().padStart(2, '0')} : ${detik.toString().padStart(2, '0')}`
        }
      };
    }
    return {
      name: sholat[0].name,
      waktu: sholat[0].time,
      tersisa: `Besok`
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setWaktuSekarang(new Date())
    }, 1000);

    return () => clearInterval(timer);
  }, [])

  // Ambil data sholat saat provinsi atau kabkota berubah
  useEffect(() => {
    if (provinsi && kabkota) {
      ambilData(provinsi, kabkota);

      const interval = setInterval(() => {
        ambilData(provinsi, kabkota);
      }, 60000);

      return () => clearInterval(interval)
    }
  }, [provinsi, kabkota]);

  const sholatSekarang = jadwalHariIni ? getCurrentPrayer(jadwalHariIni) : null;
  const sholatSetelah = jadwalHariIni ? getNextPrayer(jadwalHariIni) : null;

  const jadwalSholatMap = [
    { id: 1, name: 'Imsak', fardhu: false, time: jadwalHariIni ? jadwalHariIni.imsak : '--:--' },
    { id: 2, name: 'Subuh', fardhu: true, time: jadwalHariIni ? jadwalHariIni.subuh : '--:--' },
    { id: 3, name: 'Terbit', fardhu: false, time: jadwalHariIni ? jadwalHariIni.terbit : '--:--' },
    { id: 4, name: 'Dhuha', fardhu: false, time: jadwalHariIni ? jadwalHariIni.dhuha : '--:--' },
    { id: 5, name: 'Dzuhur', fardhu: true, time: jadwalHariIni ? jadwalHariIni.dzuhur : '--:--' },
    { id: 6, name: 'Ashar', fardhu: true, time: jadwalHariIni ? jadwalHariIni.ashar : '--:--' },
    { id: 7, name: 'Magrib', fardhu: true, time: jadwalHariIni ? jadwalHariIni.maghrib : '--:--' },
    { id: 8, name: 'Isya', fardhu: true, time: jadwalHariIni ? jadwalHariIni.isya : '--:--' },
  ]

  // Handler untuk checkbox
  const handleCheckboxChange = (id) => {
    setCheckedSholat(prev => {
      const newChecked = { ...prev, [id]: !prev[id] };
      // Hitung jumlah yang dicek
      const count = Object.values(newChecked).filter(Boolean).length;
      setCheckSholat(count);
      return newChecked;
    });
  };


  const savePathBefore = () => {
    setPathBefore(window.location.pathname);
  }

  return (
    <div className='m-5'>
      <header className='flex flex-row justify-between items-center'>
        <div className="lokasi flex flex-row items-center">
          <MapPin size={36} />
          <span className='font-semibold text-sm ml-2'>{kabkota},<br />{provinsi}</span>
        </div>
        <Link to="/settings">
          <div className="setting" onClick={savePathBefore}>
            <SettingsIcon size={28} />
          </div>
        </Link>
      </header>

      <section className='mt-7 flex flex-row justify-between gap-5 items-center w-full'>
        <MainBento
          sholatSekarang={sholatSekarang ? namaSholat[sholatSekarang] : 'Loading...'}
          waktuMasukSholatSekarang={sholatSekarang && jadwalHariIni ? jadwalHariIni[sholatSekarang] : 'Loading...'} />

        <SecBento
          waktuSekarang={waktuSekarang.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
          sholatSetelah={sholatSetelah ? `${namaSholat[sholatSetelah.name]} dalam :` : 'Loading...'}
          waktuTersisa={sholatSetelah ? sholatSetelah.tersisa : '--:--'} />
      </section>

      {/* <BarStatus state={checkSholat} /> */}

      <section>
        <JadwalSholat array={jadwalSholatMap} />
      </section>

    </div>
  )
}

export default Sholat