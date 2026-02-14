import { useState, useEffect } from 'react'

const LoadingScreen = ({ onFinish }) => {
    const [progress, setProgress] = useState(0)
    const [fadeOut, setFadeOut] = useState(false)

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    return 100
                }
                // Simulasi loading yang natural — cepat di awal, melambat di akhir
                const increment = prev < 60 ? 4 : prev < 85 ? 2 : 1
                return Math.min(prev + increment, 100)
            })
        }, 50)

        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => setFadeOut(true), 400)
            const finish = setTimeout(() => onFinish?.(), 1000)
            return () => {
                clearTimeout(timeout)
                clearTimeout(finish)
            }
        }
    }, [progress, onFinish])

    return (
        <div
            className={`fixed inset-0 z-999 flex flex-col items-center justify-center bg-linear-to-br from-emerald-950 via-emerald-900 to-teal-950 transition-opacity duration-600 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[15%] w-32 h-32 rounded-full bg-emerald-500/5 animate-pulse" />
                <div
                    className="absolute top-[25%] right-[10%] w-24 h-24 rounded-full bg-teal-400/5 animate-pulse"
                    style={{ animationDelay: '0.5s' }}
                />
                <div
                    className="absolute bottom-[30%] left-[8%] w-20 h-20 rounded-full bg-emerald-400/8 animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
                <div
                    className="absolute bottom-[15%] right-[20%] w-28 h-28 rounded-full bg-teal-500/5 animate-pulse"
                    style={{ animationDelay: '1.5s' }}
                />

                <div className="absolute top-[5%] -right-10 w-48 h-48 rounded-full border border-white/5" />
                <div className="absolute bottom-[8%] -left-7.5 w-40 h-40 rounded-full border border-white/5" />
            </div>

            <div className="relative flex flex-col items-center">
                <div className="relative mb-8">
                    <div className="absolute -inset-3 rounded-full border-2 border-transparent border-t-emerald-400/50 border-r-emerald-400/20 animate-spin" />

                    <div className="absolute -inset-1.5 rounded-full border border-emerald-300/20 animate-pulse" />

                    <div className="">
                        <img src="/MuslimApp_Logo (1).png" alt="" className='w-20 h-20 mb-4' />
                    </div>
                </div>

                <h1 className="text-white text-3xl font-bold tracking-wider mb-1">
                    Dzikruhu
                </h1>
                <p className="text-emerald-300/50 text-sm tracking-widest mb-10">
                    Teman Ibadah Harianmu
                </p>

                <div className="w-52 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
                    <div
                        className="h-full bg-linear-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <p className="text-emerald-200/40 text-xs tracking-wider">
                    {progress < 100 ? 'Memuat...' : 'Selesai'}
                </p>
            </div>
            <div className="absolute top-10 flex flex-col items-center">
                <p className="text-emerald-200/20 text-sm">
                    بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                </p>
            </div>

        </div>
    )
}

export default LoadingScreen
