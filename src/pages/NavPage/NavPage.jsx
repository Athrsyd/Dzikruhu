import { Link } from 'react-router-dom'
import { useNavbar } from '../../context/NavbarContext.jsx'
import { Clock, BookOpen, HandHeart, Settings, Sparkles } from 'lucide-react'
import { GiPrayerBeads } from 'react-icons/gi'

const NavPage = () => {
    const { setPathBefore, setPage } = useNavbar();

    const savePathBefore = () => {
        setPathBefore(window.location.pathname);
    }

    const changePage = (p) => {
        setPage(p);
    }

    const menuItems = [
        { to: '/sholat', label: 'Sholat', desc: 'Jadwal & pengingat sholat', icon: Clock, gradient: 'from-emerald-500 to-teal-500' },
        { to: '/quran', label: "Al-Qur'an", desc: 'Baca & dengarkan Al-Quran', icon: BookOpen, gradient: 'from-teal-500 to-cyan-500' },
        { to: '/tasbih', label: 'Tasbih Digital', desc: 'Dzikir & tasbih counter', icon: GiPrayerBeads, gradient: 'from-emerald-600 to-emerald-400' },
        { to: '/doa', label: 'Doa & Dzikir', desc: 'Kumpulan doa harian', icon: HandHeart, gradient: 'from-teal-600 to-emerald-500' },
        { to: '/settings', label: 'Pengaturan', desc: 'Atur preferensi aplikasi', icon: Settings, gradient: 'from-gray-500 to-gray-400', onClick: savePathBefore },
    ]

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 p-4 pb-28">
            <header className="mb-8 mt-4 text-center">
                <div className="inline-flex items-center justify-center p-3 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 shadow-sm mb-4">
                    <Sparkles className="w-6 h-6 text-emerald-600" />
                </div>
                <h1 className="text-2xl font-bold text-gray-800">Mari Tingkatkan Ibadah!</h1>
                <p className="text-sm text-gray-400 mt-1">Pilih menu untuk memulai</p>
            </header>
            <section className="flex flex-col gap-3">
                {menuItems.map((item) => (
                    <Link key={item.to} to={item.to} onClick={item.onClick}>
                        <div className="flex items-center gap-4 p-4 bg-white/50 backdrop-blur-md border border-white/60 rounded-2xl shadow-sm hover:shadow-md hover:bg-white/70 transition-all duration-300 group">
                            <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br ${item.gradient} text-white shadow-lg shadow-emerald-200/30 group-hover:scale-105 transition-transform`}>
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h2 className="font-bold text-gray-800">{item.label}</h2>
                                <p className="text-xs text-gray-400">{item.desc}</p>
                            </div>
                            <div className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default NavPage
