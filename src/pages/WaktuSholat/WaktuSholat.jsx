import { useState, useEffect } from 'react'
import { fetchDataSholat } from '../../services/apiSholat';
import { useLocation } from '../../context/LocationContext';

const WaktuSholat = () => {
  const { provinsi, setProvinsi, kabkota, setKabkota, daftarProvinsi, daftarKabKota } = useLocation();
  
  const [data, setData] = useState(null);
  const [jadwalHariIni, setJadwalHariIni] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [waktuSekarang, setWaktuSekarang] = useState(new Date())

  const namaSholat = {
    'subuh': 'Subuh',
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

    const menitSekarang = new Date().getHours() * 60 + new Date().getMinutes();

    const sholat = [
      { name: 'subuh', time: jadwal.subuh },
      { name: 'dzuhur', time: jadwal.dzuhur },
      { name: 'ashar', time: jadwal.ashar },
      { name: 'maghrib', time: jadwal.maghrib },
      { name: 'isya', time: jadwal.isya }
    ];

    for (let i = 0; i < sholat.length; i++) {
      const [jam, menit] = sholat[i].time.split(':');
      const menitWaktuSholat = parseInt(jam) * 60 + parseInt(menit);

      if (menitSekarang < menitWaktuSholat) {
        const waktuTersisa = menitWaktuSholat - menitSekarang;
        const jam = Math.floor(waktuTersisa / 60)
        const menit = waktuTersisa % 60;
        return {
          name: sholat[i].name,
          waktu: sholat[i].time,
          tersisa: `${jam} jam ${menit} menit`
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

  return (
    <>
      <div>WaktuSholat</div>

      {/* Dropdown Provinsi */}
      <div>
        <label htmlFor="provinsi">Provinsi: </label>
        <select id="provinsi" value={provinsi} onChange={(e) => setProvinsi(e.target.value)}>
          {daftarProvinsi.map((prov, index) => (
            <option key={index} value={prov}>{prov}</option>
          ))}
        </select>
      </div>

      {/* Dropdown Kab/Kota */}
      <div>
        <label htmlFor="kabkota">Kabupaten/Kota: </label>
        <select id="kabkota" value={kabkota} onChange={(e) => setKabkota(e.target.value)}>
          {daftarKabKota.map((kab, index) => (
            <option key={index} value={kab}>{kab}</option>
          ))}
        </select>
      </div>

      {/* Info lokasi dan tanggal */}
      {jadwalHariIni && (
        <div>
          <p>Lokasi: {kabkota}, {provinsi}</p>
          <p>Tanggal: {jadwalHariIni.tanggal_lengkap} ({jadwalHariIni.hari})</p>
        </div>
      )}

      <div>
        <h1>Jam saat ini: {waktuSekarang.toLocaleTimeString('id-ID')}</h1>
      </div>

      {sholatSetelah && (<div>
        <h1>Waktu Sholat selanjutnya: {namaSholat[sholatSetelah.name]}</h1>
        <h2>{sholatSetelah.tersisa}</h2>
      </div>)}
      
      {loading && <p>Memuat data...</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      <table>
        <thead>
          <tr>
            <th>Sholat</th>
            <th>Waktu</th>
          </tr>
        </thead>
        <tbody>

          {jadwalHariIni && (
            Object.entries(namaSholat).map(([key, value]) => {
              const isCurrentPrayer = key === sholatSekarang;
              return (
                <tr key={key} style={{ 
                  background: isCurrentPrayer ? 'lightgreen' : '' 
                  }}>
                  <td>{value}</td>
                  <td>{jadwalHariIni[key]}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </>


  )
}

export default WaktuSholat