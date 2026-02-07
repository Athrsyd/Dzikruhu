import axios from "axios";

const API_BASE_URL = "https://equran.id/api/doa";

export const fetchDataDoa = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error('Gagal ambil data');

    }
}

export const fetchDoaByGrup = async (grup) => {
    try {
        const response = await axios.get(`${API_BASE_URL}?grup=${grup}`);
        return response.data;   
    } catch (error) {
        console.log(error)
        throw new Error('Gagal ambil data berdasarkan grup');
    }
};