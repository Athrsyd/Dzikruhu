import React from 'react'

const BarStatus = (children) => {
    return (
        <div className="Status sholat">
            <h2 className='text-center font-bold mt-7 mb-3'>Status sholat hari ini</h2>
            <div className="status-sholat flex flex-row justify-around">
                <div className="sholat-wajib flex flex-row gap-3 items-center justify-center">
                    <div className="status-bar bg-gray-400 rounded-full h-2 w-40 flex flex-col justify-center items-start">
                        <div style={{ width: `${children.state / 5 * 100}%` }}
                            className={`bg-green-600 h-2 rounded-full `}></div>
                    </div> <span>{children.state / 5 * 100}%</span>
                </div>
            </div>
        </div>
    )
}

export default BarStatus