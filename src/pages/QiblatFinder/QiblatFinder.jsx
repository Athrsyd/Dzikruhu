import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Compass, Crosshair } from 'lucide-react';

export default function QiblatFinder() {
  const [kiblatData, setKiblatData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [locationStatus, setLocationStatus] = useState('idle'); // idle, requesting, granted, denied

  // Koordinat Ka'bah di Makkah
  const KAABA_LAT = 21.4225;
  const KAABA_LNG = 39.8262;

  const toRadians = (degrees) => degrees * (Math.PI / 180);
  const toDegrees = (radians) => radians * (180 / Math.PI);

  const calculateKiblatDirection = (lat, lng) => {
    const φ1 = toRadians(lat);
    const φ2 = toRadians(KAABA_LAT);
    const Δλ = toRadians(KAABA_LNG - lng);

    const y = Math.sin(Δλ);
    const x = Math.cos(φ1) * Math.tan(φ2) - Math.sin(φ1) * Math.cos(Δλ);
    
    let bearing = toDegrees(Math.atan2(y, x));
    bearing = (bearing + 360) % 360;
    
    return bearing;
  };

  const getCardinalDirection = (degree) => {
    const directions = ['Utara', 'Timur Laut', 'Timur', 'Tenggara', 'Selatan', 'Barat Daya', 'Barat', 'Barat Laut'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
  };

  const getLocationName = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
        {
          headers: {
            'User-Agent': 'KiblatFinder/1.0'
          }
        }
      );
      
      if (!response.ok) {
        return 'Lokasi Anda';
      }
      
      const data = await response.json();
      return data.display_name || 'Lokasi Anda';
    } catch (err) {
      return 'Lokasi Anda';
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setError('Browser Anda tidak mendukung Geolocation');
      return;
    }

    setLoading(true);
    setError('');
    setLocationStatus('requesting');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        setLocationStatus('granted');
        
        const kiblatDirection = calculateKiblatDirection(lat, lng);
        const cardinalDirection = getCardinalDirection(kiblatDirection);
        const locationName = await getLocationName(lat, lng);

        setKiblatData({
          location: locationName,
          latitude: lat.toFixed(6),
          longitude: lng.toFixed(6),
          kiblatDegree: kiblatDirection.toFixed(2),
          cardinalDirection: cardinalDirection
        });
        
        setLoading(false);
      },
      (err) => {
        setLoading(false);
        setLocationStatus('denied');
        
        switch(err.code) {
          case err.PERMISSION_DENIED:
            setError('Anda menolak izin akses lokasi. Silakan izinkan akses lokasi di pengaturan browser Anda.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Informasi lokasi tidak tersedia.');
            break;
          case err.TIMEOUT:
            setError('Waktu permintaan lokasi habis. Silakan coba lagi.');
            break;
          default:
            setError('Terjadi kesalahan saat mengambil lokasi Anda.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  // Auto-request location on mount
  useEffect(() => {
    handleGetLocation();
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-emerald-100 p-4 rounded-full">
                <Compass className="w-12 h-12 text-emerald-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Pencari Arah Kiblat
            </h1>
            <p className="text-gray-600">
              Temukan arah kiblat dari lokasi Anda saat ini
            </p>
          </div>

          {/* Location Button */}
          {!kiblatData && !loading && (
            <div className="mb-6">
              <button
                onClick={handleGetLocation}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-4 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <Crosshair className="w-6 h-6" />
                <span>Gunakan Lokasi Saya</span>
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                Klik tombol di atas untuk mengizinkan akses lokasi
              </p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center space-x-3 bg-emerald-50 px-6 py-4 rounded-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-600"></div>
                <span className="text-emerald-700 font-medium">
                  {locationStatus === 'requesting' ? 'Meminta izin akses lokasi...' : 'Menghitung arah kiblat...'}
                </span>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <div className="shrink">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              </div>
              <button
                onClick={handleGetLocation}
                className="mt-3 text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {/* Results */}
          {kiblatData && (
            <div className="space-y-6">
              <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-emerald-600" />
                  Lokasi Anda
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div>
                    <p className="text-sm text-gray-600">Alamat:</p>
                    <p className="text-gray-800 font-medium">{kiblatData.location}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Latitude:</p>
                      <p className="text-gray-800 font-medium">{kiblatData.latitude}°</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Longitude:</p>
                      <p className="text-gray-800 font-medium">{kiblatData.longitude}°</p>
                    </div>
                  </div>
                </div>

                {/* Compass Visual */}
                <div className="bg-white rounded-xl p-6 text-center">
                  <div className="relative w-48 h-48 mx-auto mb-4">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full border-4 border-emerald-200 rounded-full"></div>
                    </div>
                    <div 
                      className="absolute inset-0 flex items-center justify-center transition-transform duration-500"
                      style={{ transform: `rotate(${kiblatData.kiblatDegree}deg)` }}
                    >
                      <div className="text-emerald-600">
                        <Navigation className="w-16 h-16" />
                      </div>
                    </div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">
                      U
                    </div>
                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-semibold text-gray-600">
                      S
                    </div>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
                      B
                    </div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-gray-600">
                      T
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Arah Kiblat:</p>
                    <p className="text-4xl font-bold text-emerald-600">
                      {kiblatData.kiblatDegree}°
                    </p>
                    <p className="text-xl font-semibold text-gray-700">
                      {kiblatData.cardinalDirection}
                    </p>
                  </div>
                </div>

                <div className="mt-4 text-center text-sm text-gray-600">
                  <p>Arah diukur dari Utara searah jarum jam</p>
                </div>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleGetLocation}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center space-x-2"
              >
                <Crosshair className="w-5 h-5" />
                <span>Perbarui Lokasi</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="text-center mt-6 text-gray-600 text-sm space-y-1">
          <p>Menggunakan Geolocation API untuk mendapatkan lokasi Anda</p>
          <p className="text-xs text-gray-500">Data lokasi tidak disimpan dan hanya digunakan untuk kalkulasi</p>
        </div>
      </div>
    </div>
  );
}