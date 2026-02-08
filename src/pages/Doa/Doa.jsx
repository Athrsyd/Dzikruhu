import React, { useEffect, useState } from 'react'
import { fetchDataDoa, fetchDoaByGrup } from '../../services/apiDoa'
import { ChevronRight, BookOpen, Search, HandHeart } from 'lucide-react';

const Doa = () => {
    const [dataDoa, setDataDoa] = useState();
    const [doaByGrup, setDoaByGrup] = useState();
    const [grupDoa, setGrupDoa] = useState({});
    const [view, setView] = useState('menu');
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [selectedGrup, setSelectedGrup] = useState('');

    const getDoa = async () => {
        try {
            setLoading(true);
            const data = await fetchDataDoa();
            setDataDoa(data.data);

            const grupSet = {};
            data.data.forEach(doa => {
                if (!grupSet[doa.grup]) {
                    grupSet[doa.grup] = [];
                }
                grupSet[doa.grup].push(doa);
            });
            setGrupDoa(grupSet);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getDoaByGrup = async (grup) => {
        try {
            setLoading(true);
            const data = await fetchDoaByGrup(grup)
            setDoaByGrup(data.data);
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const handleClickGrup = (grup) => {
        getDoaByGrup(grup);
        setSelectedGrup(grup);
        setView('doa');
    };

    useEffect(() => {
        if (doaByGrup) {
            setDataDoa(doaByGrup);
        }
    }, [doaByGrup]);

    useEffect(() => {
        getDoa();
    }, [])

    const namaNamaGrup = [
        { id: 1, namaKategori: "Bacaan Bila Kagum Terhadap Sesuatu" },
        { id: 2, namaKategori: "Bacaan Terkait Adzan" },
        { id: 3, namaKategori: "Beberapa Adab dan Keutamaan" },
        { id: 4, namaKategori: "Beberapa Doa Terkait Shalat" },
        { id: 5, namaKategori: "Doa Berlindung dari Empat Hal" },
        { id: 6, namaKategori: "Doa Berlindung dari Keburukan" },
        { id: 7, namaKategori: "Doa Berlindung dari Kecelakaan dan Kematian yang Mengerikan" },
        { id: 8, namaKategori: "Doa Berlindung dari Orang Zalim dan Orang Kafir" },
        { id: 9, namaKategori: "Doa Berlindung dari Syirik" },
        { id: 10, namaKategori: "Doa Berlindung dari Setan" },
        { id: 11, namaKategori: "Doa Berpakaian" },
        { id: 12, namaKategori: "Doa Bertemu Musuh dan Penguasa" },
        { id: 13, namaKategori: "Doa Jenazah" },
        { id: 14, namaKategori: "Doa Keluar dan Masuk Rumah" },
        { id: 15, namaKategori: "Doa Kepada Anak yang Baru Lahir" },
        { id: 16, namaKategori: "Doa Memohon Ampun, Rahmat, dan Kebaikan" },
        { id: 17, namaKategori: "Doa Memohon Ilmu" },
        { id: 18, namaKategori: "Doa Memohon Kebaikan" },
        { id: 19, namaKategori: "Doa Memohon Kebaikan dan Berlindung dari Keburukan" },
        { id: 20, namaKategori: "Doa Memohon Keteguhan Hati" },
        { id: 21, namaKategori: "Doa Menghadapi Fenomena Alam" },
        { id: 22, namaKategori: "Doa Menjelang Wafat" },
        { id: 23, namaKategori: "Doa Perjalanan" },
        { id: 24, namaKategori: "Doa Perlindungan" },
        { id: 25, namaKategori: "Doa Pernikahan" },
        { id: 26, namaKategori: "Doa Saat Mendapat Kabar" },
        { id: 27, namaKategori: "Doa Saat Sakit" },
        { id: 28, namaKategori: "Doa Saat Sedih dan Sulit" },
        { id: 29, namaKategori: "Doa Saat Wudhu" },
        { id: 30, namaKategori: "Doa Sebelum dan Sesudah Tidur" },
        { id: 31, namaKategori: "Doa Terkait Harta dan Hutang" },
        { id: 32, namaKategori: "Doa Terkait Istri dan Anak" },
        { id: 33, namaKategori: "Doa Terkait Majelis" },
        { id: 34, namaKategori: "Doa Terkait Makan" },
        { id: 35, namaKategori: "Doa Terkait Orang Tua" },
        { id: 36, namaKategori: "Doa Terkait Puasa" },
        { id: 37, namaKategori: "Doa Terkait Ramadhan" },
        { id: 38, namaKategori: "Doa di Kamar Mandi" },
        { id: 39, namaKategori: "Doa Memohon Akhlak Mulia" },
        { id: 40, namaKategori: "Doa Memohon Surga dan Berlindung dari Neraka" },
        { id: 41, namaKategori: "Doa untuk Orang Sakit" },
        { id: 42, namaKategori: "Istighfar dan Taubat" },
        { id: 43, namaKategori: "Lafal Dzikir dan Keutamaannya" },
        { id: 44, namaKategori: "Ucapan Terkait Hari Raya" },
    ]

    const filteredGrup = namaNamaGrup.filter((item) =>
        item.namaKategori.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="p-4 pb-24">
            {/* === MENU KATEGORI === */}
            {view === 'menu' && (
                <>
                    {/* Header */}
                    <header className="mb-6">
                        <div className="flex items-center mb-4">
                            <HandHeart className="w-6 h-6 mr-2 text-green-600" />
                            <h1 className="text-2xl font-bold">Doa & Dzikir</h1>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari kategori doa..."
                                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-green-600 h-12 w-12"></div>
                        </div>
                    )}

                    {/* Kategori List */}
                    <div className="space-y-2">
                        {filteredGrup.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleClickGrup(item.namaKategori)}
                                className="w-full flex items-center justify-between p-4 bg-neutral-200 hover:bg-neutral-300 border border-gray-300 rounded-xl cursor-pointer transition-all duration-200 text-left group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-100 text-green-700 text-sm font-bold shrink-0">
                                        {item.id}
                                    </div>
                                    <span className="font-medium text-sm">{item.namaKategori}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors shrink-0" />
                            </button>
                        ))}

                        {filteredGrup.length === 0 && !loading && (
                            <div className="text-center py-12 text-gray-400">
                                <p className="text-lg">Kategori tidak ditemukan</p>
                            </div>
                        )}
                    </div>
                </>
            )}

            {/* === DETAIL DOA === */}
            {view === 'doa' && (
                <>
                    {/* Header Detail */}
                    <header className="flex items-center gap-3 mb-6">
                        <button
                            onClick={() => { setView('menu'); setSearch(''); }}
                            className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-200 hover:bg-neutral-300 transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5 rotate-180" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold truncate">{selectedGrup}</h1>
                            <p className="text-xs text-gray-500">
                                {dataDoa ? `${dataDoa.length} doa` : 'Memuat...'}
                            </p>
                        </div>
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-green-600 h-12 w-12"></div>
                        </div>
                    )}

                    {/* Daftar Doa */}
                    {dataDoa && !loading && (
                        <div className="space-y-5">
                            {dataDoa.map((doaItem, index) => (
                                <div
                                    key={index}
                                    className={`rounded-2xl p-5 ${index % 2 === 0 ? 'bg-neutral-200' : 'bg-neutral-100'} border border-gray-200`}
                                >
                                    {/* Nama Doa & Nomor */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-green-600 text-white text-xs font-bold shrink-0 mt-0.5">
                                            {index + 1}
                                        </span>
                                        <h2 className="font-bold text-base">{doaItem.nama}</h2>
                                    </div>

                                    {/* Teks Arab */}
                                    {doaItem.ar && (
                                        <div className="text-right mb-4 py-4 px-3 bg-white/60 rounded-xl">
                                            <p className="font-arabic text-2xl leading-loose">{doaItem.ar}</p>
                                        </div>
                                    )}

                                    {/* Latin */}
                                    {doaItem.tr && (
                                        <p className="text-sm text-gray-600 italic mb-3 leading-relaxed">{doaItem.tr}</p>
                                    )}

                                    {/* Terjemahan */}
                                    {doaItem.idn && (
                                        <div className="border-l-4 border-green-500 pl-3">
                                            <p className="text-sm text-gray-700 leading-relaxed">{doaItem.idn}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {!dataDoa && !loading && (
                        <div className="text-center py-12 text-gray-400">
                            <p>Tidak ada data doa</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Doa
