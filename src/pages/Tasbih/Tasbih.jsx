import React, { useState } from 'react';

export default function TasbihDigital() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(33);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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
          className={`absolute rounded-full transition-all duration-300 ${
            isActive 
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
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
        
        {/* Header */}
        <h1 className="text-3xl font-bold text-emerald-800 text-center mb-2">
          Tasbih Digital
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Geser ke kiri untuk tambah dzikir
        </p>

        {/* Counter */}
        <div className="text-center mb-8">
          <div className="text-7xl font-bold text-emerald-600 mb-2">
            {count}
          </div>
          <div className="text-gray-500">dari {target}</div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-emerald-600 h-full rounded-full transition-all"
              style={{ width: `${(count / target) * 100}%` }}
            />
          </div>
        </div>

        {/* Area Biji Tasbih Melingkar - Bisa di slide */}
        <div 
          className="relative mx-auto mb-8 cursor-pointer select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={increment}
          style={{
            width: '300px',
            height: '300px',
            transform: `rotate(${currentX * 0.5}deg)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Titik tengah */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center border-4 border-emerald-600">
            <span className="text-2xl font-bold text-emerald-700">{count}</span>
          </div>
          
          {/* Biji-biji tasbih */}
          <div className="absolute top-1/2 left-1/2">
            {renderBeads()}
          </div>

          {/* Penanda atas (sebagai patokan) */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-2 h-8 bg-emerald-700 rounded-full"></div>
          </div>
        </div>

        {/* Input Target */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Target Dzikir:</label>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value) || 1)}
            className="w-full px-4 py-2 border-2 border-emerald-300 rounded-lg focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Preset Target */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[33, 99, 100].map((preset) => (
            <button
              key={preset}
              onClick={() => setTarget(preset)}
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200"
            >
              {preset}x
            </button>
          ))}
        </div>

        {/* Tombol Reset */}
        <button
          onClick={reset}
          className="w-full px-4 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-semibold"
        >
          🔄 Reset
        </button>

        {/* Notif Selesai */}
        {count >= target && (
          <div className="mt-6 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-lg text-center">
            <p className="text-emerald-800 font-semibold">
              ✨ Alhamdulillah, target tercapai! ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
}