import React from 'react'

const Berita = (children) => {
    return (
        <div className="berita bg-white/70 backdrop-blur-md p-4 rounded-2xl min-h-80 shadow-lg shadow-emerald-100/30 min-w-65 flex flex-col h-fit hover:shadow-xl border border-white/60 transition-all duration-300">
            <div className="gambar w-full h-40 rounded-xl mb-3 overflow-hidden">
                <img className='w-full h-full object-cover hover:scale-105 transition-transform duration-300' src={children.thumbnail} alt="" />
            </div>
            <div className="deskripsi flex flex-col gap-3 flex-1">
                <div className="text-center flex-1">
                    <h1 className='font-bold text-sm line-clamp-3 text-gray-800'>{children.title}</h1>
                    <h3 className='font-medium text-xs text-gray-400 mt-2'>{children.date}</h3>
                </div>
                <a href={children.url} className='w-full' target='_blank'>
                    <button className='bg-linear-to-r from-emerald-500 to-teal-500 text-white p-2.5 px-4 font-semibold text-sm rounded-xl w-full hover:shadow-lg hover:shadow-emerald-300/40 transition-all duration-300 active:scale-[0.98]'>Baca Sekarang</button>
                </a>
            </div>
        </div>
    )
}

export default Berita