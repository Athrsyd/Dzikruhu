import React from 'react'

const Berita = (children) => {
    return (
        <div key={children.key} className="berita bg-white p-4 rounded-lg min-h-80 shadow-md min-w-70 flex flex-col h-fit hover:shadow-lg transition-shadow">
            <div className="gambar w-full h-40 bg-green-500 rounded-lg mb-3">
                <img className='w-full h-full object-cover rounded-lg' src={children.thumbnail} alt="" />
            </div>
            <div className="deskripsi flex flex-col gap-3 flex-1">
                <div className="text-center flex-1">
                    <h1 className='font-bold text-sm line-clamp-3'>{children.title}</h1>
                    <h3 className='font-semibold text-xs text-gray-600 mt-2'>-{children.date}</h3>
                </div>
                <a href={children.url} className='w-full' target='_blank'>
                    <button className='bg-amber-300 p-2 px-3 font-bold rounded-full w-full hover:bg-amber-400 transition-colors'>Baca Sekarang</button>
                </a>
            </div>
        </div>
    )
}

export default Berita