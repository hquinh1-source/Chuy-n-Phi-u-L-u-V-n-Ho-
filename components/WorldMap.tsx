
import React from 'react';
import { GameStage, UserProgress } from '../types';

interface WorldMapProps {
  progress: UserProgress;
  onSelectStage: (stage: GameStage) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ progress, onSelectStage }) => {
  const stages = [
    { id: 1, name: 'Vịnh Hạ Long', type: 'Ngữ âm', stage: GameStage.STAGE_1, top: '15%', left: '70%', emoji: '🚢' },
    { id: 2, name: 'Hội An', type: 'Từ vựng', stage: GameStage.STAGE_2, top: '45%', left: '60%', emoji: '🏮' },
    { id: 3, name: 'Phú Quốc', type: 'Ngữ pháp', stage: GameStage.STAGE_3, top: '85%', left: '15%', emoji: '🏝️' },
  ];

  return (
    <div className="h-full relative p-8 bg-sky-50 overflow-hidden flex items-center justify-center">
      {/* S-shaped path simulation using SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 400 600" preserveAspectRatio="none">
        <path 
          d="M 280 100 Q 200 150 250 250 T 220 450 Q 150 500 100 550" 
          stroke="#059669" 
          strokeWidth="12" 
          fill="none" 
          strokeLinecap="round" 
          strokeDasharray="20 20"
        />
      </svg>

      <div className="relative w-full max-w-md h-[500px]">
        <h2 className="text-center text-2xl font-bold text-emerald-800 mb-8 absolute -top-12 left-0 right-0">Bản đồ thám hiểm</h2>
        
        {stages.map((s) => {
          const isUnlocked = progress.unlockedStages.includes(s.id);
          const isCompleted = progress.completedStages.includes(s.id);
          
          return (
            <div 
              key={s.id}
              style={{ top: s.top, left: s.left }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-20`}
            >
              <button
                disabled={!isUnlocked}
                onClick={() => onSelectStage(s.stage)}
                className={`
                  group relative flex flex-col items-center transition-all duration-300
                  ${isUnlocked ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed grayscale opacity-50'}
                `}
              >
                <div className={`
                  w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl border-4
                  ${isCompleted ? 'bg-emerald-500 border-white' : 'bg-white border-emerald-500 animate-pulse'}
                `}>
                  {isCompleted ? '✅' : s.emoji}
                </div>
                
                <div className="mt-2 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-lg shadow-md text-center">
                  <p className="text-sm font-bold text-emerald-900 leading-tight">{s.name}</p>
                  <p className="text-[10px] font-medium text-emerald-600 uppercase tracking-widest">{s.type}</p>
                </div>

                {!isUnlocked && (
                  <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs p-1 rounded-full shadow-lg">🔒</div>
                )}
              </button>
            </div>
          );
        })}
      </div>

      <div className="absolute bottom-4 left-4 right-4 bg-emerald-100/80 p-3 rounded-xl border border-emerald-200 text-sm italic text-emerald-800 text-center">
        💡 Hãy hoàn thành từng chặng để mở khoá vùng đất tiếp theo!
      </div>
    </div>
  );
};

export default WorldMap;
