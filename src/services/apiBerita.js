import axios from "axios";

const API_BASE_URL = "/api-berita";

export const fetchBerita = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data
    } catch (error) {
        throw new Error('Gagal ambil data');
    }


}