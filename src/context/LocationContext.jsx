import { createContext, useContext, useState, useEffect } from 'react';
import { fetchProvinsi, fetchKabKota } from '../services/apiSholat';

const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [provinsi, setProvinsi] = useState(()=> {
    return localStorage.getItem('provinsi') || 'DKI Jakarta'})
  const [kabkota, setKabkota] = useState(() => {
    return localStorage.getItem('kabkota') || 'Kota Jakarta'});
  const [daftarProvinsi, setDaftarProvinsi] = useState([]);
  const [daftarKabKota, setDaftarKabKota] = useState([]);

  // Ambil daftar provinsi saat pertama kali load
  useEffect(() => {
    const ambilProvinsi = async () => {
      try {
        const response = await fetchProvinsi();
        setDaftarProvinsi(response.data);
      } catch (err) {
        console.error('Gagal ambil provinsi:', err);
      }
    };
    ambilProvinsi();
  }, []);

  // Ambil daftar kab/kota saat provinsi berubah
  useEffect(() => {
    const ambilKabKota = async () => {
      try {
        const response = await fetchKabKota(provinsi);
        const kabkotaList = response.data || [];
        setDaftarKabKota(kabkotaList);

        if (kabkotaList.length > 0) {
          const isValid = kabkota && kabkotaList.includes(kabkota);
          if (!isValid) {
            setKabkota(kabkotaList[0]);
          }
        }
      } catch (err) {
        console.error('Gagal ambil kab/kota:', err);
      }
    };
    if (provinsi) ambilKabKota();
  }, [provinsi]);

  useEffect(() => {
    localStorage.setItem('provinsi', provinsi);
    localStorage.setItem('kabkota', kabkota);
  }, [provinsi,kabkota]);

  const value = {
    provinsi,
    setProvinsi,
    kabkota,
    setKabkota,
    daftarProvinsi,
    daftarKabKota,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook
export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation harus digunakan dalam LocationProvider');
  }
  return context;
};
