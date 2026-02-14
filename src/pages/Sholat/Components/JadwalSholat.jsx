import { useState } from 'react'

const JadwalSholat = (children) => {
    const [checkedSholat, setCheckedSholat] = useState({});
    const [checkSholat, setCheckSholat] = useState(0);


    const handleCheckboxChange = (id) => {
        setCheckedSholat(prev => {
            const newChecked = { ...prev, [id]: !prev[id] };
            const count = Object.values(newChecked).filter(Boolean).length;
            setCheckSholat(count);
            return newChecked;
        });
    };
    return (
        <section>
            <div className="mt-7">
                <h2 className='text-center font-bold mb-3 text-gray-700'>Status sholat hari ini</h2>
                <div className="flex flex-row gap-3 items-center justify-center">
                    <div className="bg-gray-200 rounded-full h-2.5 w-44 overflow-hidden">
                        <div style={{ width: `${checkSholat / 5 * 100}%` }}
                            className='bg-linear-to-r from-emerald-400 to-teal-500 h-full rounded-full transition-all duration-500'></div>
                    </div>
                    <span className='text-sm font-bold text-emerald-600'>{checkSholat / 5 * 100}%</span>
                </div>
            </div>

            <div className="waktu-sholat flex gap-2.5 flex-col mt-5 mb-30">
                {children.array.map((sholat) => (
                    <div key={sholat.id} className={`w-full ${sholat.id % 2 === 0
                        ? 'bg-white/50 backdrop-blur-md border border-white/60 text-gray-700'
                        : 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40'
                        } mx-auto p-3.5 rounded-2xl flex flex-row px-5 font-bold items-center transition-all duration-300`}>
                        <div className="kiri flex flex-row gap-5 w-1/2 items-center">
                            {sholat.fardhu ? (
                                <div className="relative">
                                    <input
                                        type="checkbox"
                                        checked={checkedSholat[sholat.id] || false}
                                        onChange={() => handleCheckboxChange(sholat.id)}
                                        className={`w-6 h-6 appearance-none rounded-full border-2 cursor-pointer transition-all duration-300 ${sholat.id % 2 === 0
                                            ? 'border-emerald-400 checked:bg-emerald-500 checked:border-emerald-500'
                                            : 'border-white/60 checked:bg-white checked:border-white'
                                            }`}
                                    />
                                    {checkedSholat[sholat.id] && (
                                        <svg className={`absolute top-1 left-1 w-4 h-4 pointer-events-none ${sholat.id % 2 === 0 ? 'text-white' : 'text-emerald-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                            ) : <div className="w-6"></div>}
                            <h1 className='text-lg'>{sholat.name}</h1>
                        </div>
                        <div className="kanan w-1/2 text-end">
                            <h1 className='text-lg'>{sholat.time}</h1>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default JadwalSholat