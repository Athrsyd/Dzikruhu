import { useState, useEffect } from 'react'
import { SettingsIcon, MapPin, Sunrise, Sun, SunDim, Sunset, Moon, Quote } from 'lucide-react'
import { useLocation } from '../../context/LocationContext';
import { fetchBerita } from '../../services/apiBerita';
import { fetchDataSholat } from '../../services/apiSholat';
import { Link } from 'react-router-dom';
import HeroHome from './Components/HeroHome';
import JadwalSholat from './Components/JadwalSholat';
import QuotesHome from './Components/QuotesHome';
import Berita from './Components/Berita';
import { useUsername } from '../../context/UsernameContext'
import { useNavbar } from '../../context/NavbarContext.jsx';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const dataUsername = localStorage.getItem('username')
    const dataKabupaten = localStorage.getItem('kabkota')
    const dataProvinsi = localStorage.getItem('provinsi')
    const navigate = useNavigate()

    
    useEffect(() => {
        if (!dataUsername || !dataKabupaten || !dataProvinsi) {
            navigate('/login')
        }
    }, [])

    const { setPathBefore,setIsOpen } = useNavbar();
    const { username } = useUsername();
    const { provinsi, kabkota, } = useLocation();
    const [dataBerita, setDataBerita] = useState();
    const [data, setData] = useState(null);
    const [jadwalHariIni, setJadwalHariIni] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const [waktuSekarang, setWaktuSekarang] = useState(new Date())

    const namaSholat = {
        'subuh': 'Subuh',
        'terbit': 'Terbit',
        'dhuha': 'Dhuha',
        'dzuhur': 'Dzuhur',
        'ashar': 'Ashar',
        'maghrib': 'Maghrib',
        'isya': 'Isya'
    };

    const ambilData = async (prov, kab) => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetchDataSholat(prov, kab);
            setData(response.data);

            // Cari jadwal hari ini
            const today = new Date().getDate();
            const jadwal = response.data.jadwal.find(j => j.tanggal === today);
            setJadwalHariIni(jadwal);

            setLoading(false);
            console.log("fetch berhasil", response.data)
        } catch (err) {
            setError('Gagal mengambil data. Cek kembali provinsi dan kota yang dipilih')
            console.error(err);
            setLoading(false);
        }
    }

    const getCurrentPrayer = (jadwal) => {
        if (!jadwal) return null;

        const menitSekarang = new Date().getHours() * 60 + new Date().getMinutes();

        const sholat = [
            { name: 'subuh', time: jadwal.subuh },
            { name: 'terbit', time: jadwal.terbit },
            { name: 'dhuha', time: jadwal.dhuha },
            { name: 'dzuhur', time: jadwal.dzuhur },
            { name: 'ashar', time: jadwal.ashar },
            { name: 'maghrib', time: jadwal.maghrib },
            { name: 'isya', time: jadwal.isya }
        ];

        for (let i = 0; i < sholat.length; i++) {
            const [jam, menit] = sholat[i].time.split(':');
            const menitWaktuSholat = parseInt(jam) * 60 + parseInt(menit);

            if (menitSekarang < menitWaktuSholat) {
                return i > 0 ? sholat[i - 1].name : 'isya';
                // return sholat[i].name
            };
        }
        return sholat[sholat.length - 1].name
    };

    const getNextPrayer = (jadwal) => {
        if (!jadwal) return null;

        const detikSekarang = new Date().getHours() * 3600 + new Date().getMinutes() * 60 + new Date().getSeconds();

        const sholat = [
            { name: 'subuh', time: jadwal.subuh },
            { name: 'dzuhur', time: jadwal.dzuhur },
            { name: 'ashar', time: jadwal.ashar },
            { name: 'maghrib', time: jadwal.maghrib },
            { name: 'isya', time: jadwal.isya }
        ];

        for (let i = 0; i < sholat.length; i++) {
            const [jam, menit] = sholat[i].time.split(':');
            const detikWaktuSholat = parseInt(jam) * 3600 + parseInt(menit) * 60;
            // console.log("detik sekarang", detikSekarang);
            // console.log("detik waktu sholat", detikWaktuSholat);
            if (detikSekarang < detikWaktuSholat) {
                const waktuTersisa = detikWaktuSholat - detikSekarang;
                const jam = Math.floor(waktuTersisa / 3600)
                const menit = Math.floor((waktuTersisa % 3600) / 60);
                const detik = waktuTersisa % 60;
                return {
                    name: sholat[i].name,
                    waktu: sholat[i].time,
                    tersisa: ` ${jam} : ${menit} : ${detik} `
                }
            };
        }
        return {
            name: sholat[0].name,
            waktu: sholat[0].time,
            tersisa: `Besok`
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setWaktuSekarang(new Date())
        }, 1000);

        return () => clearInterval(timer);
        setIsOpen(true);
    }, [])

    // Ambil data sholat saat provinsi atau kabkota berubah
    useEffect(() => {
        if (provinsi && kabkota) {
            ambilData(provinsi, kabkota);

            const interval = setInterval(() => {
                ambilData(provinsi, kabkota);
            }, 60000);

            return () => clearInterval(interval)
        }
    }, [provinsi, kabkota]);


    const savePathBefore = () => {
        setPathBefore(window.location.pathname);
    }


    // Logic Berita
    const tanggalSekarang = new Date().getDate();
    const ambilDataBerita = async () => {
        try {
            const data = await fetchBerita();
            console.log("data berita", data.data.data);
            setDataBerita(data.data.data);
        } catch (error) {
            // setError('Gagal mengambil data. Cek kembali provinsi dan kota yang dipilih')
            console.error(error);
        }
    }
    useEffect(() => {
        ambilDataBerita();
    }, []);
    // Logic Berita End

    const islamicQuotes = [
        { id: 1, quotes: "Sesungguhnya Allah tidak akan mengubah keadaan suatu kaum sampai mereka mengubah keadaan diri mereka sendiri.", sumber: "QS. Ar-Raâ€™d: 11" },
        { id: 2, quotes: "Ingatlah, hanya dengan mengingat Allah hati menjadi tenteram.", sumber: "QS. Ar-Raâ€™d: 28" },
        { id: 3, quotes: "Sesungguhnya bersama kesulitan ada kemudahan.", sumber: "QS. Al-Insyirah: 6" },
        { id: 4, quotes: "Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.", sumber: "QS. Al-Baqarah: 286" },
        { id: 5, quotes: "Dan barang siapa bertawakal kepada Allah, niscaya Allah akan mencukupinya.", sumber: "QS. At-Talaq: 3" },
        { id: 6, quotes: "Amal yang paling dicintai Allah adalah yang dikerjakan terus-menerus walaupun sedikit.", sumber: "HR. Bukhari & Muslim" },
        { id: 7, quotes: "Dunia adalah penjara bagi orang beriman dan surga bagi orang kafir.", sumber: "HR. Muslim" },
        { id: 8, quotes: "Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lain.", sumber: "HR. Ahmad" },
        { id: 9, quotes: "Sesungguhnya setiap amal tergantung niatnya.", sumber: "HR. Bukhari & Muslim" },
        { id: 10, quotes: "Barang siapa menempuh jalan untuk mencari ilmu, Allah mudahkan baginya jalan ke surga.", sumber: "HR. Muslim" },
        { id: 11, quotes: "Ilmu itu bukan yang dihafal, tetapi yang memberi manfaat.", sumber: "Imam Syafiâ€™i" },
        { id: 12, quotes: "Jika kamu tidak tahan lelahnya belajar, maka kamu harus tahan dengan pahitnya kebodohan.", sumber: "Imam Syafiâ€™i" },
        { id: 13, quotes: "Kesabaran itu ada dua: sabar atas sesuatu yang tidak kamu inginkan dan sabar menahan diri dari sesuatu yang kamu inginkan.", sumber: "Ali bin Abi Thalib" },
        { id: 14, quotes: "Orang yang paling kuat adalah yang mampu mengendalikan dirinya saat marah.", sumber: "Ali bin Abi Thalib" },
        { id: 15, quotes: "Hati akan rusak jika terlalu banyak bergaul tanpa dzikir kepada Allah.", sumber: "Hasan Al-Bashri" },
        { id: 16, quotes: "Barang siapa memperbaiki hubungannya dengan Allah, Allah akan memperbaiki hubungannya dengan manusia.", sumber: "Umar bin Khattab" },
        { id: 17, quotes: "Bukanlah kekayaan itu banyaknya harta, tetapi kekayaan adalah hati yang merasa cukup.", sumber: "HR. Bukhari & Muslim" },
        { id: 18, quotes: "Dunia ini hanyalah kesenangan yang menipu.", sumber: "QS. Al-Hadid: 20" },
        { id: 19, quotes: "Dan bersabarlah, sesungguhnya Allah bersama orang-orang yang sabar.", sumber: "QS. Al-Anfal: 46" },
        { id: 20, quotes: "Tidaklah seorang Muslim tertimpa kelelahan atau kesedihan kecuali Allah menghapus dosa-dosanya.", sumber: "HR. Bukhari" },
        { id: 21, quotes: "Sungguh menakjubkan urusan orang beriman, semuanya baik baginya.", sumber: "HR. Muslim" },
        { id: 22, quotes: "Jangan bersedih, sesungguhnya Allah bersama kita.", sumber: "QS. At-Taubah: 40" },
        { id: 23, quotes: "Orang berakal adalah yang menyiapkan dirinya untuk kehidupan setelah mati.", sumber: "HR. Tirmidzi" },
        { id: 24, quotes: "Waktu adalah pedang, jika tidak kamu gunakan maka ia akan menebasmu.", sumber: "Imam Syafiâ€™i" },
        { id: 25, quotes: "Bertakwalah kepada Allah di mana pun kamu berada.", sumber: "HR. Tirmidzi" },
        { id: 26, quotes: "Dan janganlah kamu berputus asa dari rahmat Allah.", sumber: "QS. Az-Zumar: 53" },
        { id: 27, quotes: "Cukuplah kematian sebagai nasihat.", sumber: "Umar bin Khattab" },
        { id: 28, quotes: "Senyummu kepada saudaramu adalah sedekah.", sumber: "HR. Tirmidzi" },
        { id: 29, quotes: "Barang siapa bersyukur, maka sesungguhnya dia bersyukur untuk dirinya sendiri.", sumber: "QS. Luqman: 12" },
        { id: 30, quotes: "Orang yang paling aku cintai adalah yang paling baik akhlaknya.", sumber: "HR. Bukhari" },
        { id: 31, quotes: "Sesungguhnya akhirat itu lebih baik dan lebih kekal.", sumber: "QS. Al-Aâ€™la: 17" }
    ];
    const jadwalSholatMap = [
        { id: 1, nama: 'Subuh', waktu: jadwalHariIni ? jadwalHariIni.subuh : '--:--', icon: <Sunrise size={20} className='text-orange-400' /> },
        { id: 2, nama: 'Dzuhur', waktu: jadwalHariIni ? jadwalHariIni.dzuhur : '--:--', icon: <Sun size={20} className='text-yellow-500' /> },
        { id: 3, nama: 'Ashar', waktu: jadwalHariIni ? jadwalHariIni.ashar : '--:--', icon: <SunDim size={20} className='text-orange-500' /> },
        { id: 4, nama: 'Maghrib', waktu: jadwalHariIni ? jadwalHariIni.maghrib : '--:--', icon: <Sunset size={20} className='text-red-400' /> },
        { id: 5, nama: 'Isya', waktu: jadwalHariIni ? jadwalHariIni.isya : '--:--', icon: <Moon size={20} className='text-indigo-500' /> },
    ]

    const sholatSekarang = jadwalHariIni ? getCurrentPrayer(jadwalHariIni) : null;
    const sholatSetelah = jadwalHariIni ? getNextPrayer(jadwalHariIni) : null;
    const waktuSekarangStr = `${waktuSekarang.getHours().toString().padStart(2, '0')}:${waktuSekarang.getMinutes().toString().padStart(2, '0')}:${waktuSekarang.getSeconds().toString().padStart(2, '0')}`;

    return (
        <div className='min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-5'>
            <header className='flex flex-row justify-between items-center'>
                <div className="lokasi flex flex-row items-center">
                    <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm">
                        <MapPin size={22} className="text-emerald-600" />
                    </div>
                    <span className=' text-xs ml-3 text-gray-400'>{kabkota},<br /><span className='text-gray-700 font-semibold text-sm'>{provinsi}</span></span>
                </div>
                <Link to="/settings">
                    <div className="setting p-2.5 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm hover:shadow-md transition-all" onClick={savePathBefore}>
                        <SettingsIcon size={22} className="text-gray-600" />
                    </div>
                </Link>
            </header>

            {/* Sambutan */}
            {sholatSekarang && sholatSetelah && (
                <Link to='/sholat'>
                    <HeroHome
                        username={username}
                        waktuSholatSekarang={sholatSekarang ? namaSholat[sholatSekarang] : 'Loading...'}
                        waktuSekarang={waktuSekarangStr}
                        sholatSetelah={sholatSetelah ? namaSholat[sholatSetelah.name] : 'Loading...'}
                        waktuSholatSetelah={sholatSetelah ? sholatSetelah.tersisa : '--:--'} />
                </Link>
            )}

            {/* Sambutan End */}

            {/* Jadwal sholat */}

            {jadwalHariIni && (
                <Link to='/sholat'>
                    <section>
                        <div className="mt-8 bg-white/50 backdrop-blur-md rounded-2xl w-full mb-5 border border-white/60 shadow-lg shadow-emerald-100/50 p-1">
                            <div className="text-neutral-600 flex flex-row justify-between items-center">
                                {jadwalSholatMap.map((sholat) => (
                                    <JadwalSholat
                                        key={sholat.id}
                                        sholatSekarang={sholatSekarang}
                                        namaSholat={sholat.nama}
                                        iconSholat={sholat.icon}
                                        waktuSholat={sholat.waktu} />
                                ))}
                            </div>
                        </div>
                    </section>
                </Link>
            )}
            {/* Jadwal sholat end */}

            {/* Quotes of the day */}
            <QuotesHome
                quotes={(islamicQuotes[tanggalSekarang - 1].quotes)}
                sumber={(islamicQuotes[tanggalSekarang - 1].sumber)} />
            {/* Quotes of the day end */}

            {/* Artikel Pilihan */}
            <section>
                <div className="p-5 bg-white/50 backdrop-blur-md rounded-2xl w-full mb-24 border border-white/60 shadow-lg shadow-emerald-100/50">
                    <div>
                        <h1 className='text-lg font-bold mb-2 text-gray-800'>Artikel Pilihan</h1>
                        <p className='text-justify text-sm text-gray-500'>Di sini kami menyediakan berita-berita pilihan yang dapat kamu baca untuk menambah pengetahuan terbaru dunia islam</p>
                    </div>
                    <div className="berita flex flex-row mt-5 gap-4 overflow-x-auto pb-2">
                        {
                            dataBerita ? dataBerita.map((berita, i) => (
                                <Berita
                                    key={i}
                                    thumbnail={berita.thumbnail}
                                    title={berita.title}
                                    date={berita.date}
                                    url={berita.url}
                                />
                            )) : <p className='text-gray-400'>Loading...</p>
                        }
                    </div>

                </div>
            </section>
            {/* Artikel Pilihan End */}
        </div>
    )
}

export default Home