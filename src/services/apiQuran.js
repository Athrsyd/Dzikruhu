import axios from "axios";

const API_BASE_URL = "https://equran.id/api/v2/surat";

export const fetchQuranList = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data
    } catch (error) {
        throw new Error('Gagal ambil data');
    }
}

export const fetchQuranDetail = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${id}`)
        return response.data
    } catch (error) {
        throw new Error('Gagal ambil data');
    }
}