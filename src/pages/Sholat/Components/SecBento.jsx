import React from 'react'

const SecBento = ({ waktuSekarang, sholatSetelah, waktuTersisa }) => {
    return (
        <div className="SholatSekarang text-center p-5 bg rounded-xl w-1/2">
            <h2 className='text-[10px] font-bold mb-1'>Waktu saat ini :</h2>
            <h1 className='text-4xl font-extrabold text-green-600 mb-4'>  {waktuSekarang}
            </h1>

            <div className="flex justify-center mb-4">
                <div className="garis w-1/2 h-px text-center bg-black flex justify-center mb-4"></div>
            </div>
            <div className="next-sholat p-2 bg-green-100 rounded-xl w-full shadow-md">
                <h1 className='text-sm text-center font-bold '>   {sholatSetelah }
                </h1>
            </div>

            <div className="next-sholat p-2 bg-green-100 rounded-xl w-full shadow-md mt-3">
                <h1 className='text-sm text-center font-bold  '>   {waktuTersisa }
                </h1>
            </div>
        </div>
    )
}

export default SecBento