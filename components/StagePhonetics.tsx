
import React, { useState } from 'react';
import { PHONETICS_QUESTIONS } from '../data';

interface StagePhoneticsProps {
  onBack: () => void;
  onComplete: () => void;
  addXP: (xp: number) => void;
  notifyDragon: (msg: string, slang?: string) => void;
  playSound: (type: 'correct' | 'wrong') => void;
}

const StagePhonetics: React.FC<StagePhoneticsProps> = ({ onBack, onComplete, addXP, notifyDragon, playSound }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const question = PHONETICS_QUESTIONS[currentIdx];

  const handleSelect = (option: string) => {
    if (selected) return;
    setSelected(option);
    
    if (option === question.answer) {
      playSound('correct');
      addXP(15);
    } else {
      playSound('wrong');
      setIsWrong(true);
      notifyDragon("Toang rồi thám hiểm gia ơi! Chọn lại đi nào.", "Cố lên, xém đúng rồi!");
      setTimeout(() => {
        setIsWrong(false);
        setSelected(null);
      }, 1000);
    }
  };

  const handleNext = () => {
    if (currentIdx < PHONETICS_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  const triggerHint = () => {
    if (showHint) return;
    addXP(-5);
    setShowHint(true);
    notifyDragon("Đã dùng gợi ý! Trừ 5 XP nhé.", "Vẫn hời chán!");
  };

  return (
    <div className="p-8 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-emerald-700 font-bold hover:underline">← Quay lại bản đồ</button>
        <div className="flex items-center gap-4">
            <button 
                onClick={triggerHint}
                disabled={showHint || selected === question.answer}
                className={`text-sm font-bold px-3 py-1 rounded-full transition-all ${showHint ? 'bg-gray-200 text-gray-500' : 'bg-yellow-400 text-yellow-900 hover:scale-105 shadow-sm'}`}
            >
                💡 Gợi ý (-5 XP)
            </button>
            <div className="text-emerald-800 font-bold bg-emerald-100 px-4 py-1 rounded-full text-sm">
                Câu {currentIdx + 1} / {PHONETICS_QUESTIONS.length}
            </div>
        </div>
      </div>

      <div className="bg-sky-50 p-6 rounded-2xl border-2 border-sky-100 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">⚓</div>
        <h3 className="text-2xl font-bold text-sky-900 mb-2">Chặng 1: Vịnh Hạ Long</h3>
        <p className="text-sky-700 italic">"Muốn đi thuyền rồng phải phát âm đúng thanh điệu nhé!"</p>
      </div>

      <div className={`p-6 bg-white rounded-3xl border-2 shadow-sm transition-all ${isWrong ? 'shake border-orange-400' : 'border-emerald-100'}`}>
        <h4 className="text-xl font-bold text-emerald-900 mb-6">{question.text}</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options?.map((opt) => {
            const isCorrect = selected === opt && opt === question.answer;
            const isSelectedWrong = selected === opt && opt !== question.answer;

            return (
              <button
                key={opt}
                onClick={() => handleSelect(opt)}
                className={`
                  p-4 rounded-xl text-lg font-semibold transition-all border-2 pulse-soft
                  ${isCorrect ? 'bg-emerald-500 text-white border-emerald-600 scale-105' : ''}
                  ${isSelectedWrong ? 'bg-orange-100 border-orange-400 text-orange-900' : ''}
                  ${!selected ? 'hover:bg-emerald-50 border-emerald-100 text-emerald-800 hover:border-emerald-300' : 'cursor-default'}
                  ${selected && !isCorrect && !isSelectedWrong ? 'opacity-50 grayscale' : ''}
                `}
              >
                {opt} {isCorrect && '✨'}
              </button>
            );
          })}
        </div>
        
        {(showHint || (question.explanation && selected === question.answer)) && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl text-emerald-800 text-sm border border-yellow-200 animate-in fade-in slide-in-from-top-2">
                <strong>{showHint && !selected ? '💡 Gợi ý:' : '🎓 Giải thích:'}</strong> {selected === question.answer ? question.explanation || question.hint : question.hint}
            </div>
        )}
      </div>

      <div className="flex-1"></div>

      {selected === question.answer && (
        <button
          onClick={handleNext}
          className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl text-xl animate-bounce shadow-xl hover:bg-emerald-700 transition-colors"
        >
          Tiếp tục nào! ➔
        </button>
      )}
    </div>
  );
};

export default StagePhonetics;
