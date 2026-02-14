import React, { useState, useEffect, } from 'react';
import { Book, Search, Bookmark, ChevronRight } from 'lucide-react';
import { useNavbar } from '../../context/NavbarContext.jsx';
import { fetchQuranList, fetchQuranDetail } from '../../services/apiQuran.js';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop.jsx';
import { useLatin } from '../../context/LatinContext.jsx';
import { useFont } from '../../context/FontContext.jsx';
import { Link } from 'react-router-dom';
import { SettingsIcon, Heart } from 'lucide-react';
// import { useNavbar } from '../../context/NavbarContext.jsx';

export default function Quran() {

    const { setPathBefore } = useNavbar();
    const fontSize = useFont().fontSize;
    const { isLatin } = useLatin();
    const [tampilan, setTampilan] = useState('list');
    const { setIsOpen } = useNavbar();
    const [loading, setLoading] = useState(true);
    const [quranData, setQuranData] = useState([]);
    const [quranDataAsli, setQuranDataAsli] = useState([]);
    const [suratDetail, setSuratDetail] = useState(null);
    const [suratDipilih, setSuratDipilih] = useState();
    const [terakhirDibaca, setTerakhirDibaca] = useState(null);
    const [search, setSearch] = useState('');

    const [quranPage, setQuranPage] = useState('list');
    const [ayatDiSukai, setAyatDiSukai] = useState(() => {
        try {
            const saved = localStorage.getItem('ayatDisukai');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    });


    useEffect(() => {
        const saved = localStorage.getItem('terakhirDibaca');
        if (saved) {
            setTerakhirDibaca(JSON.parse(saved))
        }
    }, [])
    useEffect(() => {
        localStorage.setItem('ayatDisukai', JSON.stringify(ayatDiSukai));
    }, [ayatDiSukai])

    const tandaiDibaca = (surat, ayat) => {
        const data = {
            nomorSurah: surat.nomor,
            namaSurah: surat.namaLatin,
            nomorAyat: ayat.nomorAyat,
        }
        localStorage.setItem('terakhirDibaca', JSON.stringify(data));
        setTerakhirDibaca(data)
    };
    const toggleAyatDiSukai = (surat, ayat) => {
        const exists = ayatDiSukai.find(
            (item) => item.nomorSurah === surat.nomor && item.nomorAyat === ayat.nomorAyat
        );
        let updatedAyatDiSukai;
        if (exists) {
            updatedAyatDiSukai = ayatDiSukai.filter(
                (item) => !(item.nomorSurah === surat.nomor && item.nomorAyat === ayat.nomorAyat)
            );
        } else {
            updatedAyatDiSukai = [...ayatDiSukai, {
                nomorSurah: surat.nomor,
                namaSurah: surat.namaLatin,
                nomorAyat: ayat.nomorAyat,
            }];
        }
        setAyatDiSukai(updatedAyatDiSukai);
    }

    const getSurat = async (nomorSurat) => {
        try {
            setLoading(true);

            const data = await fetchQuranDetail(nomorSurat);
            setSuratDetail(data.data);
            console.log(data.data)
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    const getQuran = async () => {
        try {
            setLoading(true);

            const data = await fetchQuranList();
            setQuranData(data.data);
            setQuranDataAsli(data.data);
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getQuran()
    }, [])


    const savePathBefore = () => {
        setPathBefore(window.location.pathname);
    }


    const test = () => console.log(quranData);


    const toDetailSurah = (nomorSurat) => {
        setSuratDipilih(nomorSurat);
        setTampilan('detail')
        setIsOpen(false);
        getSurat(nomorSurat);
    }

    const cariSurat = (keyword) => {
        setSearch(keyword);

        if (keyword === '') {
            setQuranData(quranDataAsli);
            return;
        }
        const filtered = quranDataAsli.filter((surat) =>
            surat.namaLatin.toLowerCase().includes(keyword.toLowerCase()) ||
            surat.nama.toLowerCase().includes(keyword.toLowerCase()) ||
            surat.nomor.toString() === keyword
        );
        setQuranData(filtered);
    }

    const backToList = () => {
        setTampilan('list')
        setIsOpen(true);
    }

    useEffect(() => {
        console.log("surat yang di pilih surat ke", suratDipilih);
    }, [suratDipilih]);

    const settingsFontQuran =
        fontSize === 'Small' ? '1.5rem' :
            fontSize === 'Medium' ? '1.7rem' :
                fontSize === 'Large' ? '2rem' :
                    '2.25rem'
    return (
        <>

            {tampilan === 'list' && quranData ?

                (<div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4">
                    <header>
                        <div className="flex items-center mb-4">
                            <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm mr-3">
                                <Book className="w-5 h-5 text-emerald-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">Al-Qur'an</h1>
                        </div>
                        <div className="mb-4 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Cari Surah atau Ayat..."
                                className="w-full pl-10 pr-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm transition-all"
                                onChange={(e) => cariSurat(e.target.value)}
                                value={search}
                            />
                        </div>
                    </header>
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 h-12 w-12"></div>
                        </div>
                    )}
                    <div
                        onClick={() => terakhirDibaca && toDetailSurah(terakhirDibaca.nomorSurah)}
                        className="last-read w-full p-5 mb-6 bg-linear-to-r from-emerald-500 to-teal-500 rounded-2xl cursor-pointer shadow-lg shadow-emerald-200/50 text-white transition-all hover:shadow-xl">
                        <div className="font-medium mb-2 flex items-center text-emerald-100 text-xs">
                            <Bookmark className="w-4 h-4 mr-1.5" />
                            <h1>Terakhir dibaca</h1>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                {terakhirDibaca ? (
                                    <>
                                        <h2 className="font-bold text-lg">{terakhirDibaca.namaSurah}</h2>
                                        <p className="text-emerald-100 text-sm">Ayat {terakhirDibaca.nomorAyat}</p>
                                    </>
                                ) : (
                                    <p className="text-emerald-100">Belum ada</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="NavQuran w-full flex flex-row mb-4 gap-2">
                        <button
                            className={`w-1/2 p-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${quranPage === 'list'
                                ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40'
                                : 'bg-white/60 backdrop-blur-md text-gray-500 border border-white/60'
                                }`}
                            onClick={() => setQuranPage('list')}>
                            Daftar Surah
                        </button>
                        <button
                            className={`w-1/2 p-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${quranPage === 'favorites'
                                ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40'
                                : 'bg-white/60 backdrop-blur-md text-gray-500 border border-white/60'
                                }`}
                            onClick={() => setQuranPage('favorites')}>
                            Ayat Disukai
                        </button>
                    </div>
                    {quranPage === 'list' ? (
                        <div className="surah-list w-full mx-auto pb-24">
                            {quranData.map((surat) => (
                                <div
                                    key={surat.nomor}
                                    onClick={() => toDetailSurah(surat.nomor)}
                                    className="surah-item flex justify-between items-center p-4 mb-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl cursor-pointer hover:bg-white/70 hover:shadow-md shadow-sm transition-all ease-in-out duration-300">
                                    <div className="flex justify-start items-center w-full">

                                        <div className="no flex justify-center items-center mr-4">
                                            <div className="relative w-10 h-11 flex items-center justify-center">
                                                <svg className="absolute w-full h-full" viewBox="0 0 40 44">
                                                    <polygon
                                                        points="20,2 38,12 38,32 20,42 2,32 2,12"
                                                        fill="none"
                                                        stroke="#10b981"
                                                        strokeWidth="1.5"
                                                    />
                                                </svg>
                                                <span className="text-sm font-semibold text-emerald-700">{surat.nomor}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <h2 className="font-bold text-sm text-gray-800">{surat.namaLatin}</h2>
                                            <p className="text-xs text-gray-400">{surat.tempatTurun} | {surat.jumlahAyat} Ayat</p>
                                        </div>
                                    </div>
                                    <div className='text-arab w-25'>
                                        <h1 className="text-lg text-right font-arabic font-bold text-emerald-700">{surat.nama}</h1>
                                    </div>
                                </div>

                            ))}
                        </div>
                    ) : (
                        <div className="ayat-disukai-list w-full mx-auto pb-24">
                            {ayatDiSukai.length === 0 ? (
                                <p className="text-gray-400 text-center py-12">Belum ada ayat yang disukai.</p>
                            ) : (
                                ayatDiSukai.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => toDetailSurah(item.nomorSurah)}
                                        className="surah-item flex justify-between items-center p-4 mb-3 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl cursor-pointer hover:bg-white/70 hover:shadow-md shadow-sm transition-all ease-in-out duration-300">
                                        <div className="flex justify-start items-center w-full">
                                            <div className="no flex justify-center items-center mr-4">
                                                <div className="relative w-10 h-11 flex items-center justify-center">
                                                    <svg className="absolute w-full h-full" viewBox="0 0 40 44">
                                                        <polygon
                                                            points="20,2 38,12 38,32 20,42 2,32 2,12"
                                                            fill="none"
                                                            stroke="#10b981"
                                                            strokeWidth="1.5"
                                                        />
                                                    </svg>
                                                    <span className="text-sm font-semibold text-emerald-700">{item.nomorSurah}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <h2 className="font-bold text-sm text-gray-800">{item.namaSurah}</h2>
                                                <p className="text-xs text-gray-400">Ayat {item.nomorAyat}</p>
                                            </div>
                                        </div>
                                        <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
                                    </div>
                                ))
                            )}
                        </div>
                    )}
                </div>) : tampilan === 'detail' && suratDetail ? (
                    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50">
                        <header className="sticky top-0 z-10 flex flex-row justify-between items-center py-4 px-5 bg-white/70 backdrop-blur-xl border-b border-white/60">
                            <div onClick={backToList} className="flex items-center cursor-pointer group">
                                <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm mr-2 group-hover:bg-emerald-50 transition-colors">
                                    <ChevronRight className="w-5 h-5 text-emerald-600 rotate-180" />
                                </div>
                                <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600 transition-colors">Kembali</span>
                            </div>
                            <Link to="/settings" onClick={savePathBefore}>
                                <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm hover:bg-emerald-50 transition-colors">
                                    <SettingsIcon className="w-5 h-5 text-gray-500" />
                                </div>
                            </Link>
                        </header>

                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600 h-12 w-12"></div>
                            </div>
                        ) : suratDetail && (
                            <div className="p-4 pb-8">
                                <div className="surah-header text-center mb-6 flex flex-col items-center gap-3">
                                    <h2 className="text-2xl font-bold text-gray-800">{suratDetail.namaLatin}</h2>
                                    <div className="flex flex-row justify-center items-center flex-wrap gap-2">
                                        <span className="bg-emerald-100/80 backdrop-blur-md text-emerald-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-emerald-200/50">{suratDetail.tempatTurun}</span>
                                        <span className="bg-teal-100/80 backdrop-blur-md text-teal-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-teal-200/50">{suratDetail.jumlahAyat} Ayat</span>
                                    </div>
                                </div>

                                {suratDipilih !== 1 && suratDipilih !== 9 && (
                                    <div className="text-center mb-8">
                                        <div className="inline-block bg-white/60 backdrop-blur-md text-2xl px-8 py-3 rounded-2xl font-bold font-arabic text-emerald-800 border border-white/60 shadow-sm">
                                            Ø¨Ø³Ù… Ø§Ù„Ù„Ù‡ Ø§Ù„Ø±Ø­Ù…Ù† Ø§Ù„Ø±Ø­ÙŠÙ…
                                        </div>
                                    </div>
                                )}

                                <div className="ayat-list space-y-4 mt-6 flex flex-col">
                                    {suratDetail.ayat.map((item) => (
                                        <div
                                            key={item.nomorAyat}
                                            className="ayat-item bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center">
                                                    <span className="bg-linear-to-br from-emerald-500 to-teal-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-sm font-bold shadow-md shadow-emerald-200/40">{item.nomorAyat}</span>
                                                </div>
                                                <div className="font-arabic text-right flex-1 ml-4">
                                                    <span style={{ fontSize: settingsFontQuran }} className="block leading-loose text-gray-800">{item.teksArab}</span>
                                                </div>
                                            </div>
                                            {isLatin && <p className="text-emerald-700/80 text-sm mb-2 italic">{item.teksLatin}</p>}
                                            <p className="text-gray-500 text-sm leading-relaxed">{item.teksIndonesia}</p>
                                            <div className="flex flex-row gap-1 mt-3 pt-3 border-t border-gray-100">
                                                <button
                                                    onClick={() => tandaiDibaca(suratDetail, item)}
                                                    className={`p-2 rounded-xl ${terakhirDibaca?.nomorSurah === suratDetail.nomor && terakhirDibaca?.nomorAyat === item.nomorAyat ? 'text-amber-500 bg-amber-50' : 'text-gray-300 hover:bg-gray-50'} transition-all`}
                                                    title="Tandai terakhir dibaca"
                                                >
                                                    <Bookmark className="w-5 h-5" fill={terakhirDibaca?.nomorSurah === suratDetail.nomor && terakhirDibaca?.nomorAyat === item.nomorAyat ? 'currentColor' : 'none'} />
                                                </button>
                                                <button
                                                    onClick={() => toggleAyatDiSukai(suratDetail, item)}
                                                    className={`p-2 rounded-xl ${ayatDiSukai.some(a => a.nomorSurah === suratDetail.nomor && a.nomorAyat === item.nomorAyat) ? 'text-red-500 bg-red-50' : 'text-gray-300 hover:bg-gray-50'} transition-all`}
                                                    title="Tambahkan ke Ayat Disukai"
                                                >
                                                    <Heart className="w-5 h-5" fill={ayatDiSukai.some(a => a.nomorSurah === suratDetail.nomor && a.nomorAyat === item.nomorAyat) ? 'currentColor' : 'none'} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <footer className="mt-8 mb-4">
                                    <div className="flex justify-between items-center gap-3">
                                        {suratDipilih !== 1 ? (
                                            <button
                                                onClick={() => toDetailSurah(suratDipilih - 1)}
                                                className="flex items-center gap-2 px-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm">
                                                <ChevronRight className="w-4 h-4 rotate-180" />
                                                <span>{quranDataAsli[suratDipilih - 2].namaLatin}</span>
                                            </button>
                                        ) : <div />}
                                        {suratDipilih !== 114 ? (
                                            <button
                                                onClick={() => toDetailSurah(suratDipilih + 1)}
                                                className="flex items-center gap-2 px-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl text-sm font-medium text-gray-600 hover:bg-emerald-50 hover:text-emerald-700 transition-all shadow-sm">
                                                <span>{quranDataAsli[suratDipilih].namaLatin}</span>
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        ) : <div />}
                                    </div>
                                </footer>
                            </div>
                        )}
                    </div>
                ) : null}
            </>
        );
}