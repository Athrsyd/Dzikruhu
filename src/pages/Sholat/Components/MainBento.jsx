import React from 'react'

const MainBento = (children) => {
    return (
        <div className="SholatSekarang p-5 bg-linear-to-br from-emerald-500 to-teal-600 rounded-2xl w-1/2 shadow-xl shadow-emerald-200/50 text-white">
            <h2 className='text-[11px] font-medium mb-2 text-emerald-100'>Waktu sholat saat ini</h2>
            <h1 className='text-3xl font-extrabold'>{children.sholatSekarang}</h1>
            <div className='w-full h-px bg-white/20 my-3'></div>
            <p className='text-xs text-end font-medium text-emerald-100'>Waktu masuk {children.sholatSekarang}</p>
            <h1 className='text-2xl text-end font-bold'>{children.waktuMasukSholatSekarang}</h1>
        </div>
    )
}

export default MainBento