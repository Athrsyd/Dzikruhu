import axios from "axios";

const API_BASE_URL = "https://equran.id/api/v2/shalat";

// Fetch daftar provinsi
export const fetchProvinsi = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/provinsi`);
        return response.data;
    } catch (error) {
        throw new Error('Gagal ambil data provinsi');
    }
};

// Fetch daftar kabupaten/kota berdasarkan provinsi
export const fetchKabKota = async (provinsi) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/kabkota`, {
            provinsi: provinsi
        });
        return response.data;   
    } catch (error) {
        throw new Error('Gagal ambil data kabupaten/kota');
    }
};

// Fetch jadwal sholat bulanan
export const fetchDataSholat = async (provinsi, kabkota, bulan = null, tahun = null) => {
    try {
        const body = {
            provinsi: provinsi,
            kabkota: kabkota
        };
        
        // Tambahkan bulan dan tahun jika disediakan
        if (bulan) body.bulan = bulan;
        if (tahun) body.tahun = tahun;
        
        const response = await axios.post(API_BASE_URL, body);
        return response.data;
    } catch (error) {
        throw new Error('Gagal ambil data jadwal sholat');
    }
};