import React from 'react'

const JadwalSholat = (children) => {
    const isActive = children.sholatSekarang === children.namaSholat.toLowerCase();
    return (
        <div className={`${isActive ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-300/50 scale-105' : 'text-gray-600'} p-3 rounded-2xl text-center text-sm w-1/5 flex flex-col items-center transition-all duration-300`}>
            <h1 className={`text-[11px] font-bold mb-1.5 ${isActive ? 'text-white' : ''}`}>{children.namaSholat}</h1>
            {children.iconSholat}
            <p className={`text-xs mt-1 font-semibold ${isActive ? 'text-white' : ''}`}>{children.waktuSholat}</p>
        </div>
    )
}

export default JadwalSholat