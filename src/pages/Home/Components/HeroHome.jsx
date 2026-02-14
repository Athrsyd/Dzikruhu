import React from 'react'

const HeroHome = (children) => {
    return (
        <section className='mt-6'>
            <h1 className='text-2xl font-bold text-start text-gray-800'>Assalamu'alaikum, <span className='text-emerald-600'>{children.username}</span></h1>
            <div className="container relative flex flex-col justify-between p-6 mt-4 rounded-3xl w-full min-h-55 bg-[url('/masjidBG.jpg')] bg-cover bg-center overflow-hidden shadow-xl shadow-emerald-200/40">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-t from-emerald-900/70 via-black/30 to-transparent"></div>
                <div className="relative flex flex-row justify-between items-start">
                    <div className='rounded-xl px-3 py-2 rder-white/20'>
                        <p className='text-white text-xs font-medium'>Waktu Sholat</p>
                        <p className='text-white text-lg font-bold'>{children.waktuSholatSekarang}</p>
                    </div>
                    <div className=' rounded-xl px-4 py-2 der-white/20'>
                        <h2 className='text-white text-3xl font-bold'>{children.waktuSekarang}</h2>
                    </div>
                </div>

                <div className="relative mt-auto">
                    <div className='bg-white/15 backdrop-blur-md rounded-xl px-4 py-3 border border-white/20'>
                        <p className='text-emerald-100 text-xs mb-0.5'>Sholat berikutnya</p>
                        <p className='text-white text-sm font-bold'>{children.sholatSetelah} — {children.waktuSholatSetelah}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroHome