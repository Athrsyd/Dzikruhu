import React from 'react'

const SecBento = ({ waktuSekarang, sholatSetelah, waktuTersisa }) => {
    return (
        <div className="SholatSekarang text-center p-5 bg-white/50 backdrop-blur-md rounded-2xl w-1/2 border border-white/60 shadow-lg shadow-emerald-100/30 flex flex-col justify-between">
            <div>
                <h2 className='text-[10px] font-medium mb-1 text-gray-400'>Waktu saat ini</h2>
                <h1 className='text-3xl font-extrabold text-emerald-600'>{waktuSekarang}</h1>
            </div>

            <div className="flex justify-center my-3">
                <div className="w-12 h-px bg-emerald-300"></div>
            </div>

            <div className="space-y-2">
                <div className="next-sholat p-2.5 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                    <h1 className='text-xs text-center font-semibold text-emerald-700'>{sholatSetelah}</h1>
                </div>
                <div className="next-sholat p-2.5 bg-emerald-50/80 backdrop-blur-sm rounded-xl border border-emerald-100">
                    <h1 className='text-xs text-center font-bold text-emerald-600'>{waktuTersisa}</h1>
                </div>
            </div>
        </div>
    )
}

export default SecBento