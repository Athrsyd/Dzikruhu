import React from 'react'

const HeroHome = (children) => {
    return (
        <section className='mt-8'>
            <h1 className='text-3xl font-bold text-start'>Assalamu'alaikum, {children.username}</h1>
            <div className="container relative flex flex-col justify-between p-5 mt-5 rounded-2xl w-full min-h-55 bg-[url('/masjidBG.jpg')] bg-cover bg-center">
                <div className="absolute inset-0 rounded-2xl bg-black/30"></div>
                <div className="relative flex flex-row justify-between items-">
                    <p className='text-white text-sm w-1/3 font-semibold '>Waktunya Sholat {children.waktuSholatSekarang}</p>
                    <h2 className='text-white text-4xl font-bold'>{children.waktuSekarang}</h2>
                </div>

                <div className="relative">
                    <p className='text-white text-sm font-bold text-center'>Waktu Sholat berikutnya : <br />{children.sholatSetelah} - {children.waktuSholatSetelah}</p>
                </div>
            </div>
        </section>
    )
}

export default HeroHome