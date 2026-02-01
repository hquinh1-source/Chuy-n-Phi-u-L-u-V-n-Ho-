
import React, { useState } from 'react';

interface SplashProps {
  onStart: (name: string) => void;
}

const Splash: React.FC<SplashProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStart(name || 'Bạn học nhỏ');
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center space-y-8 animate-in fade-in duration-700">
      <div className="relative">
        <div className="text-8xl mb-4 floating">🐉</div>
        <div className="absolute -top-4 -right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold rotate-12">NEW!</div>
      </div>
      
      <div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-2">Chuyến Phiêu Lưu Văn Hoá Việt Nam</h1>
        <p className="text-lg text-emerald-600 font-medium">Hành trình học tiếng Việt qua 3 miền di sản</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        <input
          type="text"
          placeholder="Nhập tên của bạn nhé..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-6 py-4 rounded-2xl border-2 border-emerald-200 focus:border-emerald-500 outline-none text-xl text-center shadow-lg transition-all"
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-2xl text-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:translate-y-0"
        >
          Bắt đầu hành trình! ➔
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4 opacity-50 text-xs font-bold text-emerald-800">
        <div>📍 Hạ Long</div>
        <div>📍 Hội An</div>
        <div>📍 Phú Quốc</div>
      </div>
    </div>
  );
};

export default Splash;
