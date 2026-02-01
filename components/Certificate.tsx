
import React from 'react';
import { UserProgress } from '../types';

interface CertificateProps {
  progress: UserProgress;
  onRestart: () => void;
}

const Certificate: React.FC<CertificateProps> = ({ progress, onRestart }) => {
  return (
    <div className="p-8 h-full flex flex-col items-center justify-center text-center space-y-8 animate-in zoom-in duration-1000">
      <div className="text-8xl">🏆</div>
      
      <div className="bg-white border-8 border-double border-emerald-600 p-8 rounded-lg shadow-2xl relative max-w-lg w-full">
        <div className="absolute top-2 left-2 text-2xl">🐉</div>
        <div className="absolute top-2 right-2 text-2xl">🎋</div>
        <div className="absolute bottom-2 left-2 text-2xl">🏮</div>
        <div className="absolute bottom-2 right-2 text-2xl">🌊</div>
        
        <h2 className="text-3xl font-black text-emerald-800 mb-2 uppercase">Chứng Chỉ Hoàn Thành</h2>
        <p className="text-emerald-600 font-bold mb-6">NHÀ THÁM HIỂM VĂN HOÁ VIỆT NAM</p>
        
        <div className="border-t border-emerald-100 pt-6 space-y-4">
            <p className="text-gray-500 text-sm italic">Chứng nhận cho</p>
            <p className="text-4xl font-extrabold text-emerald-900">{progress.username}</p>
            <p className="text-gray-600 px-4">Đã xuất sắc vượt qua 3 chặng hành trình di sản, tích luỹ được <strong>{progress.xp} XP</strong> và sở hữu <strong>{progress.badges.length} huy hiệu</strong> danh giá.</p>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2">
            {progress.badges.map((b, i) => (
                <div key={i} className="bg-emerald-50 p-2 rounded-lg text-[10px] font-bold text-emerald-800 border border-emerald-100">
                    🎖️ {b}
                </div>
            ))}
        </div>
      </div>

      <div className="flex gap-4">
        <button
            onClick={() => window.print()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all"
        >
            In chứng chỉ 🖨️
        </button>
        <button
            onClick={onRestart}
            className="bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-3 px-8 rounded-xl transition-all"
        >
            Chơi lại từ đầu 🔄
        </button>
      </div>
      
      <div className="text-emerald-700 font-bold animate-pulse">
        Ối zời ơi siêu đỉnh! Bạn đã thành Pro rồi đấy!
      </div>
    </div>
  );
};

export default Certificate;
