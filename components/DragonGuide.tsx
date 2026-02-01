
import React from 'react';

interface DragonGuideProps {
  show: boolean;
  message: string;
  slang: string;
}

const DragonGuide: React.FC<DragonGuideProps> = ({ show, message, slang }) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-10 right-10 flex flex-col items-end z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
      <div className="bg-white p-4 rounded-3xl shadow-2xl border-2 border-emerald-500 max-w-xs relative mb-2">
        <p className="text-emerald-900 font-bold mb-1">{message}</p>
        {slang && <p className="text-emerald-500 font-black text-sm uppercase tracking-tighter italic">"{slang}"</p>}
        {/* Triangle pointer */}
        <div className="absolute -bottom-2 right-10 w-4 h-4 bg-white border-r-2 border-b-2 border-emerald-500 rotate-45"></div>
      </div>
      <div className="text-6xl floating filter drop-shadow-lg">🐉</div>
    </div>
  );
};

export default DragonGuide;
