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
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4 pb-24">
            {/* === MENU KATEGORI === */}
            {view === 'menu' && (
                <>
                    {/* Header */}
                    <header className="mb-6">
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm mr-3">
                                <HandHeart className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Doa & Dzikir</h1>
                        </div>

                        {/* Search Bar */}
                        <div className="relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari kategori doa..."
                                className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm transition-all"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 h-12 w-12"></div>
                        </div>
                    )}

                    {/* Kategori List */}
                    <div className="space-y-2.5">
                        {filteredGrup.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => handleClickGrup(item.namaKategori)}
                                className="w-full flex items-center justify-between p-4 bg-white/50 backdrop-blur-md hover:bg-white/70 border border-white/60 rounded-2xl cursor-pointer transition-all duration-300 text-left group shadow-sm hover:shadow-md"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center justify-center w-9 h-9 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 text-white text-sm font-bold shrink-0 shadow-md shadow-emerald-200/40">
                                        {item.id}
                                    </div>
                                    <span className="font-medium text-sm text-gray-700">{item.namaKategori}</span>
                                </div>
                                <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                            </button>
                        ))}

                        {filteredGrup.length === 0 && !loading && (
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 flex items-center justify-center">
                                    <Search className="w-7 h-7 text-gray-300" />
                                </div>
                                <p className="text-gray-400 font-medium">Kategori tidak ditemukan</p>
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
                            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/60 backdrop-blur-md border border-white/40 shadow-sm hover:bg-emerald-50 transition-colors cursor-pointer"
                        >
                            <ChevronRight className="w-5 h-5 text-emerald-600 rotate-180" />
                        </button>
                        <div className="flex-1 min-w-0">
                            <h1 className="text-lg font-bold text-gray-800 truncate">{selectedGrup}</h1>
                            <p className="text-xs text-gray-400">
                                {dataDoa ? `${dataDoa.length} doa` : 'Memuat...'}
                            </p>
                        </div>
                    </header>

                    {/* Loading */}
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 h-12 w-12"></div>
                        </div>
                    )}

                    {/* Daftar Doa */}
                    {dataDoa && !loading && (
                        <div className="space-y-4">
                            {dataDoa.map((doaItem, index) => (
                                <div
                                    key={index}
                                    className="bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm"
                                >
                                    {/* Nama Doa & Nomor */}
                                    <div className="flex items-start gap-3 mb-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 text-white text-xs font-bold shrink-0 mt-0.5 shadow-md shadow-emerald-200/40">
                                            {index + 1}
                                        </span>
                                        <h2 className="font-bold text-base text-gray-800">{doaItem.nama}</h2>
                                    </div>

                                    {/* Teks Arab */}
                                    {doaItem.ar && (
                                        <div className="text-right mb-4 py-4 px-4 bg-emerald-50/50 backdrop-blur-sm rounded-xl border border-emerald-100/50">
                                            <p className="font-arabic text-2xl leading-loose text-gray-800">{doaItem.ar}</p>
                                        </div>
                                    )}

                                    {/* Latin */}
                                    {doaItem.tr && (
                                        <p className="text-sm text-emerald-700/70 italic mb-3 leading-relaxed">{doaItem.tr}</p>
                                    )}

                                    {/* Terjemahan */}
                                    {doaItem.idn && (
                                        <div className="border-l-3 border-emerald-400 pl-3">
                                            <p className="text-sm text-gray-600 leading-relaxed">{doaItem.idn}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {!dataDoa && !loading && (
                        <div className="text-center py-16">
                            <div className="w-16 h-16 mx-auto mb-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/60 flex items-center justify-center">
                                <BookOpen className="w-7 h-7 text-gray-300" />
                            </div>
                            <p className="text-gray-400 font-medium">Tidak ada data doa</p>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}

export default Doa
