import React, { useEffect, useState } from 'react'
import { fetchDataDoa, fetchDoaByGrup } from '../../services/apiDoa'
import { Menu } from 'lucide-react';

const Doa = () => {
    const [dataDoa, setDataDoa] = useState();
    const [doaByGrup, setDoaByGrup] = useState();
    const [grupDoa, setGrupDoa] = useState({});
    const [view, setView] = useState('menu');


    const getDoa = async () => {
        try {
            const data = await fetchDataDoa();
            console.log(data.data);
            setDataDoa(data.data);

            // Ambil Grup
            const grupSet = {};
            data.data.forEach(doa => {
                if (!grupSet[doa.grup]) {
                    grupSet[doa.grup] = [];
                }
                grupSet[doa.grup].push(doa);
            });
            console.log(grupSet);
            setGrupDoa(grupSet);
        } catch (error) {
            console.log(error);

        }
    }

    const getDoaByGrup = async (grup) => {
        try {
            const data = await fetchDoaByGrup(grup)
            setDoaByGrup(data.data);
            console.log(data.data);
        } catch (error) {
            console.log(error)
            throw new Error('Gagal ambil data berdasarkan grup');
        }
    }

    const handleClickGrup = (grup) => {
        getDoaByGrup(grup);
        setView('doa');
        console.log(grup);
    };

    useEffect(() => {
        console.log(doaByGrup);
        if (doaByGrup) {
            setDataDoa(doaByGrup);
        }
    }, [doaByGrup]);

    useEffect(() => {
        getDoa();
    }, [])

    const namaNamaGrup = [
        {
            id: 1,
            namaKategori: "Bacaan Bila Kagum Terhadap Sesuatu",
            params: "Bacaan%20Bila%20Kagum%20Terhadap%20Sesuatu"
        },
        {
            id: 2,
            namaKategori: "Bacaan Terkait Adzan",
            params: "Bacaan%20Terkait%20Adzan"
        },
        {
            id: 3,
            namaKategori: "Beberapa Adab dan Keutamaan",
            params: "Beberapa%20Adab%20dan%20Keutamaan"
        },
        {
            id: 4,
            namaKategori: "Beberapa Doa Terkait Shalat",
            params: "Beberapa%20Doa%20Terkait%20Shalat"
        },
        {
            id: 5,
            namaKategori: "Doa Berlindung dari Empat Hal",
            params: "Doa%20Berlindung%20dari%20Empat%20Hal"
        },
        {
            id: 6, namaKategori:
                "Doa Berlindung dari Keburukan",
            params: "Doa%20Berlindung%20dari%20Keburukan"
        },
        {
            id: 7, namaKategori:
                "Doa Berlindung dari Kecelakaan dan Kematian yang Mengerikan",
            params: "Doa%20Berlindung%20dari%20Kecelakaan%20dan%20Kematian%20yang%20Mengerikan"
        },
        {
            id: 8, namaKategori:
                "Doa Berlindung dari Orang Zalim dan Orang Kafir",
            params: "Doa%20Berlindung%20dari%20Orang%20Zalim%20dan%20Orang%20Kafir"
        },
        {
            id: 9, namaKategori:
                "Doa Berlindung dari Syirik",
            params: "Doa%20Berlindung%20dari%20Syirik"
        },
        {
            id: 10, namaKategori:
                "Doa Berlindung dari Setan",
            params: "Doa%20Berlindung%20dari%20Setan"
        },
        {
            id: 11, namaKategori:
                "Doa Berpakaian",
            params: "Doa%20Berpakaian"
        },
        {
            id: 12, namaKategori:
                "Doa Bertemu Musuh dan Penguasa",
            params: "Doa%20Bertemu%20Musuh%20dan%20Penguasa"
        },
        {
            id: 13, namaKategori:
                "Doa Jenazah",
            params: "Doa%20Jenazah"
        },
        {
            id: 14, namaKategori:
                "Doa Keluar dan Masuk Rumah",
            params: "Doa%20Keluar%20dan%20Masuk%20Rumah"
        },
        {
            id: 15, namaKategori:
                "Doa Kepada Anak yang Baru Lahir",
            params: "Doa%20Kepada%20Anak%20yang%20Baru%20Lahir"
        },
        {
            id: 16, namaKategori:
                "Doa Memohon Ampun, Rahmat, dan Kebaikan",
            params: "Doa%20Memohon%20Ampun%2C%20Rahmat%2C%20dan%20Kebaikan"
        },
        {
            id: 17, namaKategori:
                "Doa Memohon Ilmu",
            params: "Doa%20Memohon%20Ilmu"
        },
        {
            id: 18, namaKategori:
                "Doa Memohon Kebaikan",
            params: "Doa%20Memohon%20Kebaikan"
        },
        {
            id: 19, namaKategori:
                "Doa Memohon Kebaikan dan Berlindung dari Keburukan",
            params: "Doa%20Memohon%20Kebaikan%20dan%20Berlindung%20dari%20Keburukan"
        },
        {
            id: 20, namaKategori:
                "Doa Memohon Keteguhan Hati",
            params: "Doa%20Memohon%20Keteguhan%20Hati"
        },
        {
            id: 21, namaKategori:
                "Doa Menghadapi Fenomena Alam",
            params: "Doa%20Menghadapi%20Fenomena%20Alam"
        },
        {
            id: 22, namaKategori:
                "Doa Menjelang Wafat",
            params: "Doa%20Menjelang%20Wafat"
        },
        {
            id: 23, namaKategori:
                "Doa Perjalanan",
            params: "Doa%20Perjalanan"
        },
        {
            id: 24, namaKategori:
                "Doa Perlindungan", params: "Doa%20Perlindungan"
        },
        {
            id: 25, namaKategori:
                "Doa Pernikahan", params: "Doa%20Pernikahan"
        },
        {
            id: 26, namaKategori:
                "Doa Saat Mendapat Kabar", params: "Doa%20Saat%20Mendapat%20Kabar"
        },
        {
            id: 27, namaKategori:
                "Doa Saat Sakit", params: "Doa%20Saat%20Sakit"
        },
        {
            id: 28, namaKategori:
                "Doa Saat Sedih dan Sulit", params: "Doa%20Saat%20Sedih%20dan%20Sulit"
        },
        {
            id: 29, namaKategori:
                "Doa Saat Wudhu", params: "Doa%20Saat%20Wudhu"
        },
        {
            id: 30, namaKategori:
                "Doa Sebelum dan Sesudah Tidur", params: "Doa%20Sebelum%20dan%20Sesudah%20Tidur"
        },
        {
            id: 31, namaKategori:
                "Doa Terkait Harta dan Hutang", params: "Doa%20Terkait%20Harta%20dan%20Hutang"
        },
        {
            id: 32, namaKategori:
                "Doa Terkait Istri dan Anak", params: "Doa%20Terkait%20Istri%20dan%20Anak"
        },
        {
            id: 33, namaKategori:
                "Doa Terkait Majelis", params: "Doa%20Terkait%20Majelis"
        },
        {
            id: 34, namaKategori:
                "Doa Terkait Makan", params: "Doa%20Terkait%20Makan"
        },
        {
            id: 35, namaKategori:
                "Doa Terkait Orang Tua", params: "Doa%20Terkait%20Orang%20Tua"
        },
        {
            id: 36, namaKategori:
                "Doa Terkait Puasa", params: "Doa%20Terkait%20Puasa"
        },
        {
            id: 37, namaKategori:
                "Doa Terkait Ramadhan", params: "Doa%20Terkait%20Ramadhan"
        },
        {
            id: 38, namaKategori:
                "Doa di Kamar Mandi", params: "Doa%20di%20Kamar%20Mandi"
        },
        {
            id: 39, namaKategori:
                "Doa Memohon Akhlak Mulia", params: "Doa%20Memohon%20Akhlak%20Mulia"
        },
        {
            id: 40, namaKategori:
                "Doa Memohon Surga dan Berlindung dari Neraka", params: "Doa%20Memohon%20Surga%20dan%20Berlindung%20dari%20Neraka"
        },
        {
            id: 41, namaKategori:
                "Doa untuk Orang Sakit", params: "Doa%20untuk%20Orang%20Sakit"
        },
        {
            id: 42, namaKategori:
                "Istighfar dan Taubat", params: "Istighfar%20dan%20Taubat"
        },
        {
            id: 43, namaKategori:
                "Lafal Dzikir dan Keutamaannya", params: "Lafal%20Dzikir%20dan%20Keutamaannya"
        },
        {
            id: 44, namaKategori:
                "Ucapan Terkait Hari Raya", params: "Ucapan%20Terkait%20Hari%20Raya"
        },
    ]


    return (
        <>{view === 'menu' && (
            <div className="kategori flex p-3 w-full flex-wrap text-white" >
                {namaNamaGrup.map((item) => (
                    // <MenuDoa key={item.id} namaGrup={item.namaKategori} onClick={() => handleClickGrup(item.namaKategori)} />
                    <button key={item.id} className='bg-green-500 p-4 rounded-lg m-3 w-min-20' onClick={() => handleClickGrup(item.namaKategori)} >{item.namaKategori}</button>
                ))}
            </div>
        )}

            <div className="doa-container">
                <h1>Daftar Doa</h1>
                {dataDoa ? (
                    <>
                        {view === 'doa' && (<button onClick={() => setView('menu')}><Menu /></button>)}
                        {dataDoa.map((doaItem, index) => (
                            <div key={index} className="doa-item">
                                <h2>{doaItem.nama}</h2>
                                <p><strong>Arab:</strong> {doaItem.ar}</p>
                                <p><strong>Latin:</strong> {doaItem.tr}</p>
                                <p><strong>Terjemahan:</strong> {doaItem.idn}</p>
                                <br />
                            </div>
                        ))}
                    </>
                ) : (
                    <p>Memuat data doa...</p>
                )}
            </div>
        </>
    )
}

export default Doa
