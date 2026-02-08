import React from 'react'

const JadwalSholat = (children) => {
    return (
        <div className={`${children.sholatSekarang === children.namaSholat.toLowerCase() ? 'bg-green-300' : ''} p-3 rounded-2xl text-center text-sm w-1/5 flex flex-col items-center`}>
            <h1 className='text-[12px] font-bold mb-2'>{children.namaSholat}</h1>
            {children.iconSholat}
            <p>{children.waktuSholat}</p>
        </div>
    )
}

export default JadwalSholat