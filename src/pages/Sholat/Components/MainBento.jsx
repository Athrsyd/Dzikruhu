import React from 'react'

const MainBento = (children) => {
    return (
        <div className="SholatSekarang p-5 bg-green-100 rounded-xl w-1/2 shadow-md">
            <h2 className='text-[12px] font-bold mb-2'>Waktu sholat saat ini :</h2>
            <h1 className='text-3xl font-extrabold text-green-600'>{children.sholatSekarang}</h1>
            <p className='text-sm text-end font-semibold mt-5'> Waktu masuk {children.sholatSekarang} :</p>
            <h1 className='text-2xl text-end font-bold '> {children.waktuMasukSholatSekarang}</h1>
        </div>
    )
}

export default MainBento