import React, { useState, useEffect,  } from 'react';
import { Book, Search, Bookmark, ChevronRight } from 'lucide-react';
import { useNavbar } from '../../context/NavbarContext.jsx';
import { fetchQuranList, fetchQuranDetail } from '../../services/apiQuran.js';
import { ScrollToTop } from '../../components/ScrollToTop/ScrollToTop.jsx';

export default function Quran() {



    const [tampilan, setTampilan] = useState('list');
    const { setIsOpen } = useNavbar();
    const [loading, setLoading] = useState(true);
    const [quranData, setQuranData] = useState([]);
    const [quranDataAsli, setQuranDataAsli] = useState([]);
    const [suratDetail, setSuratDetail] = useState(null);
    const [suratDipilih, setSuratDipilih] = useState();
    const [terakhirDibaca, setTerakhirDibaca] = useState(null);
    const [ search, setSearch ] = useState('');


    useEffect(() => {
        const saved = localStorage.getItem('terakhirDibaca');
        if (saved) {
            setTerakhirDibaca(JSON.parse(saved))
        }
    }, [])

    const tandaiDibaca = (surat, ayat) => {
        const data = {
            nomorSurah: surat.nomor,
            namaSurah: surat.namaLatin,
            nomorAyat: ayat.nomorAyat,
        }
        localStorage.setItem('terakhirDibaca', JSON.stringify(data));
        setTerakhirDibaca(data)
    };
    
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
    return (
        <>

            {tampilan === 'list' && quranData ?

                (<div className="p-4">
                    <header>
                        <div className="flex items-center mb-4">
                            <Book className="w-6 h-6 mr-2" />
                            <h1 className="text-2xl font-bold">Al-Qur'an</h1>
                        </div>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Cari Surah atau Ayat..."
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e)=>cariSurat(e.target.value)}
                                value={search}
                            />
                        </div>
                        <button onClick={test}>test</button>
                    </header>
                    {loading && (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-12 w-12"></div>
                        </div>
                    )}
                    <div
                        onClick={() => terakhirDibaca && toDetailSurah(terakhirDibaca.nomorSurah)}
                        className="last-read w-full h-30 p-4 mb-6 border bg-neutral-200 transition-all ease-in-out duration-300 border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-100">
                        <div className="font-bold mb-2 flex items-center">
                            <h1>Terakhir di baca</h1>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                {terakhirDibaca ? (
                                    <>
                                        <h2 className="font-semibold text-lg">{terakhirDibaca.namaSurah}</h2>
                                        <p className="text-gray-600">Ayat {terakhirDibaca.nomorAyat}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-600">Belum ada</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="surah-list w-19/20 mx-auto">
                        {quranData.map((surat) => (
                            <div
                                key={surat.nomor}
                                onClick={() => toDetailSurah(surat.nomor)}
                                className="surah-item flex justify-between items-center p-4 mb-4 border bg-neutral-200 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-all ease-in-out duration-300">
                                <div className=" flex justify-start items-center w-full ">

                                    <div className="no flex justify-center items-center mr-5">
                                        <div className="relative w-10 h-11 flex items-center justify-center">
                                            <svg className="absolute w-full h-full" viewBox="0 0 40 44">
                                                <polygon
                                                    points="20,2 38,12 38,32 20,42 2,32 2,12"
                                                    fill="none"
                                                    stroke="#9ca3af"
                                                    strokeWidth="1.5"
                                                />
                                            </svg>
                                            <span className="text-sm font-semibold">{surat.nomor}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <h2 className="font-bold text-md">{surat.namaLatin} </h2>
                                        <p className="text-sm text-gray-600">{surat.tempatTurun} | {surat.jumlahAyat} Ayat</p>
                                    </div>
                                </div>
                                <div className='text-arab w-25'>
                                    <h1 className="text-lg text-right font-arabic font-bold">{surat.nama}</h1>
                                </div>
                            </div>

                        ))}
                    </div>
                </div>) : tampilan === 'detail' && suratDetail ? (
                    <>
                        <header className='flex flex-row justify-between items-center py-7 px-5'>
                            <div onClick={backToList} className=" flex justify-center items-center cursor-pointer">
                                <ChevronRight className="w-6 h-6  rotate-180 cursor-pointer" />
                                <h1>kembali ke menu</h1>
                            </div>
                            <div className="">
                                <Search />
                            </div>
                        </header>
                        <hr />
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-12 w-12"></div>
                            </div>
                        ) : suratDetail && (
                            <div className="p-4">
                                <div className="surah-header text-center mb-6 flex flex-row justify-center items-center flex-wrap gap-4">
                                    <div className="bg-neutral-300 text-sm p-2 px-3 rounded-full font-semibold "><h3 className=''>{suratDetail.tempatTurun}</h3></div>
                                    <h2 className="bg-neutral-300 text-xl p-2 px-5 rounded-full font-bold ">{suratDetail.namaLatin}</h2>
                                    <div className="bg-neutral-300 text-sm p-2 px-3 rounded-full font-semibold "><h3>{suratDetail.jumlahAyat} ayat</h3></div>
                                </div>

                                {suratDipilih !== 1 && suratDipilih !== 9 &&
                                    (<div className="text-center mb-6 flex flex-row justify-center items-center flex-wrap gap-4">
                                        <div className="bg-neutral-300 text-2xl px-5 py-2 rounded-full font-bold font-arabic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
                                    </div>)}

                                <div className="ayat-list space-y-6 mt-15 flex flex-col ">
                                    {suratDetail.ayat.map((item) => (
                                        <div
                                            key={item.nomorAyat}
                                            className={`ayat-item ${item.nomorAyat % 2 == 0 ? "bg-neutral-200" : ''} rounded-2xl p-4`}>
                                            <div className="flex justify-between items-center mb-4 ">
                                                <div className="flex items-center">
                                                    <span className="ayat-no bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">{item.nomorAyat}</span>
                                                </div>
                                                <div className="font-arabic text-right">
                                                    <h1 className="text-2xl">{item.teksArab}</h1>
                                                </div>
                                            </div>
                                            <p className="text-gray-700">{item.teksIndonesia}</p>
                                            <div className="last-read">
                                                <button
                                                    onClick={() => tandaiDibaca(suratDetail, item)}
                                                    className={`p-1 rounded ${terakhirDibaca?.nomorSurah === suratDetail.nomor && terakhirDibaca?.nomorAyat === item.nomorAyat ? 'text-yellow-500' : 'text-gray-400'} flex flex-row items-center gap-2 mt-4`}
                                                    title="Tandai terakhir dibaca"
                                                >
                                                    <Bookmark className="w-5 h-5" fill={terakhirDibaca?.nomorSurah === suratDetail.nomor && terakhirDibaca?.nomorAyat === item.nomorAyat ? 'currentColor' : 'none'} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <footer>
                                    <div className="h-20 w-full flex justify-between items-center mt-10">
                                        {suratDipilih !== 1 && <button onClick={() => toDetailSurah(suratDipilih - 1)}> &lt; {quranData[suratDipilih - 2].namaLatin}</button>}
                                        {suratDipilih !== 114 && <button onClick={() => toDetailSurah(suratDipilih + 1)}> {quranData[suratDipilih].namaLatin} &gt;</button>}
                                    </div>
                                </footer>
                            </div>)}
                    </>
                ) : null}
            {/* <ScrollToTop /> */}
        </>
    );
}