import React, { useState, useEffect } from 'react';
import { useNavbar } from '../../context/NavbarContext';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function TasbihDigital() {
    const { setIsOpen } = useNavbar();
    const [count, setCount] = useState(0);
    const [target, setTarget] = useState(33);
    const [startX, setStartX] = useState(0);
    const [currentX, setCurrentX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);


    useEffect(() => {
        setIsOpen(false);
        return () => setIsOpen(true);
    }, []);


    const backButton = () => {
        setIsOpen(true);
    }

    // Tambah dzikir
    const increment = () => {
        if (count < target) {
            setCount(count + 1);
        }
    };

    // Kurangi dzikir
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    // Reset
    const reset = () => setCount(0);

    // Handle slide dengan animasi
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setCurrentX(0);
        setIsDragging(true);
    };

    const handleTouchMove = (e) => {
        if (isDragging) {
            const diff = e.touches[0].clientX - startX;
            setCurrentX(diff);
        }
    };

    const handleTouchEnd = (e) => {
        const diff = currentX;

        // Jika geser ke kiri (lebih dari 50px) = tambah
        if (diff < -50) {
            increment();
        }
        // Jika geser ke kanan (lebih dari 50px) = kurang
        else if (diff > 50) {
            decrement();
        }

        // Reset posisi
        setCurrentX(0);
        setIsDragging(false);
    };

    // Render biji tasbih dalam bentuk lingkaran
    const renderBeads = () => {
        const beads = [];
        const totalBeads = 33;
        const radius = 120; // Radius lingkaran

        for (let i = 0; i < totalBeads; i++) {
            // Hitung sudut untuk setiap biji (360 derajat / jumlah biji)
            const angle = (i * 360 / totalBeads) - 90; // -90 untuk mulai dari atas

            // Rotasi berdasarkan count
            const rotatedAngle = angle + (count * 360 / totalBeads);

            // Konversi ke radian
            const radian = (rotatedAngle * Math.PI) / 180;

            // Hitung posisi x dan y
            const x = radius * Math.cos(radian);
            const y = radius * Math.sin(radian);

            // Biji di posisi atas (sekitar 270-290 derajat setelah rotasi) adalah yang aktif
            const normalizedAngle = ((rotatedAngle % 360) + 360) % 360;
            const isActive = normalizedAngle > 260 && normalizedAngle < 280;

            beads.push(
                <div
                    key={i}
                    className={`absolute rounded-full transition-all duration-300 ${isActive
                        ? 'w-5 h-5 bg-emerald-600 shadow-lg scale-125'
                        : 'w-4 h-4 bg-emerald-400'
                        }`}
                    style={{
                        left: `${x}px`,
                        top: `${y}px`,
                        transform: `translate(-50%, -50%) ${isActive ? 'scale(1.5)' : 'scale(1)'}`
                    }}
                />
            );
        }
        return beads;
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/40 backdrop-blur-xl rounded-3xl shadow-xl border border-white/60 p-8">

                {/* Header */}
                <Link to='/'>
                    <div onClick={backButton()} className="mb-5 flex items-center cursor-pointer group">
                        <div className="p-2 bg-white/60 backdrop-blur-md rounded-xl border border-white/40 shadow-sm mr-2 group-hover:bg-emerald-50 transition-colors">
                            <ChevronRight className="w-5 h-5 text-emerald-600 rotate-180" />
                        </div>
                        <span className="text-sm font-medium text-gray-600 group-hover:text-emerald-600 transition-colors">Kembali</span>
                    </div>
                </Link>
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
                    Tasbih Digital
                </h1>
                <p className="text-gray-400 text-sm text-center mb-2">
                    Geser ke kiri untuk tambah dzikir
                </p>

                {/* Counter */}
                <div className="text-center mb-2">
                    <div className="text-5xl font-bold bg-linear-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent mb-2">
                        {count}
                    </div>
                    <div className="text-gray-400 text-sm">dari {target}</div>
                </div>

                {/* Progress Bar */}
                <div className="mb-24">
                    <div className="w-full bg-white/60 backdrop-blur-md rounded-full h-3 border border-white/60">
                        <div
                            className="bg-linear-to-r from-emerald-500 to-teal-500 h-full rounded-full transition-all shadow-sm"
                            style={{ width: `${(count / target) * 100}%` }}
                        />
                    </div>
                </div>

                {/* Area Biji Tasbih Melingkar - Bisa di slide */}
                <div
                    className="relative mx-auto cursor-pointer select-none"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onClick={increment}
                    style={{
                        width: '225px',
                        height: '225px',
                        transform: `rotate(${currentX * 0.5}deg)`,
                        transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                    }}
                >
                    {/* Titik tengah */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white/60 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-emerald-400 shadow-lg shadow-emerald-200/30">
                        <span className="text-2xl font-bold bg-linear-to-br from-emerald-600 to-teal-500 bg-clip-text text-transparent">{count}</span>
                    </div>

                    {/* Biji-biji tasbih */}
                    <div className="absolute top-1/2 left-1/2">
                        {renderBeads()}
                    </div>

                    {/* Penanda atas (sebagai patokan) */}
                    <div className="absolute -top-8 left-28 transform -translate-x-1/2 -translate-y-2">
                        <div className="w-2 h-8 bg-linear-to-b from-emerald-600 to-emerald-400 rounded-full shadow-md"></div>
                    </div>
                </div>

                {/* Input Target */}
                <div className="my-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Target Dzikir:</label>
                    <input
                        type="number"
                        value={target}
                        onChange={(e) => setTarget(Number(e.target.value) || 1)}
                        className="w-full px-4 py-3 bg-white/60 backdrop-blur-md border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent shadow-sm transition-all"
                    />
                </div>

                {/* Preset Target */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                    {[33, 99, 100].map((preset) => (
                        <button
                            key={preset}
                            onClick={() => setTarget(preset)}
                            className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${target === preset
                                ? 'bg-linear-to-r from-emerald-500 to-teal-500 text-white shadow-md shadow-emerald-200/40'
                                : 'bg-white/60 backdrop-blur-md text-gray-500 border border-white/60 hover:bg-white/80'
                                }`}
                        >
                            {preset}x
                        </button>
                    ))}
                </div>

                {/* Tombol Reset */}
                <button
                    onClick={reset}
                    className="w-full px-4 py-3.5 bg-linear-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-200/50 font-semibold transition-all duration-300 shadow-md"
                >
                    Reset
                </button>

                {/* Notif Selesai */}
                {count >= target && (
                    <div className="mt-6 p-4 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/50 rounded-2xl text-center">
                        <p className="text-emerald-700 font-semibold">
                            Alhamdulillah, target tercapai!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}