import { useState } from 'react'

const JadwalSholat = (children) => {
    const [checkedSholat, setCheckedSholat] = useState({}); // Tambah state baru ini
    const [checkSholat, setCheckSholat] = useState(0);


    const handleCheckboxChange = (id) => {
        setCheckedSholat(prev => {
            const newChecked = { ...prev, [id]: !prev[id] };
            // Hitung jumlah yang dicek
            const count = Object.values(newChecked).filter(Boolean).length;
            setCheckSholat(count);
            return newChecked;
        });
    };
    return (
        <section>
            <div className="Status sholat">
                <h2 className='text-center font-bold mt-7 mb-3'>Status sholat hari ini</h2>
                <div className="status-sholat flex flex-row justify-around">
                    <div className="sholat-wajib flex flex-row gap-3 items-center justify-center">
                        <div className="status-bar bg-gray-400 rounded-full h-2 w-40 flex flex-col justify-center items-start">
                            <div style={{ width: `${checkSholat / 5 * 100}%` }}
                                className={`bg-green-600 h-2 rounded-full `}></div>
                        </div> <span>{checkSholat / 5 * 100}%</span>
                    </div>
                </div>
            </div>

            <div className="waktu-sholat flex gap-2 flex-col mt-2 mb-25">
                {children.array.map((sholat) => (
                    <div key={sholat.id} className={`w-full ${sholat.id % 2 == 0 ? "" : 'bg-green-400'} mx-auto p-3 rounded-xl flex flex-row px-5 text-white font-bold`}>
                        <div className="kiri flex flex-row gap-10 w-1/2">
                            {sholat.fardhu ? (
                                <input
                                    type="checkbox"
                                    checked={checkedSholat[sholat.id] || false}
                                    onChange={() => handleCheckboxChange(sholat.id)}
                                    className='w-7 border-gray-500 border-2 appearance-none rounded-full h-7 checked:bg-green-600 checked:text-white checked:border-green-600 cursor-pointer'
                                />
                            ) : <></>}
                            <h1 className={`text-xl ${sholat.fardhu ? '' : 'pl-17'} ${sholat.id % 2 == 0 ? "text-green-400" : ""}`}>{sholat.name}</h1>
                        </div>
                        <div className="kanan w-1/2 text-end">
                            <h1 className={`text-xl ${sholat.id % 2 == 0 ? "text-green-400" : ""}`}>{sholat.time}</h1>
                        </div>
                    </div>

                ))}
            </div>
        </section>
    )
}

export default JadwalSholat