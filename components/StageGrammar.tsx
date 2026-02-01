
import React, { useState } from 'react';
import { GRAMMAR_QUESTIONS } from '../data';

interface StageGrammarProps {
  onBack: () => void;
  onComplete: () => void;
  addXP: (xp: number) => void;
  notifyDragon: (msg: string, slang?: string) => void;
  playSound: (type: 'correct' | 'wrong') => void;
}

const StageGrammar: React.FC<StageGrammarProps> = ({ onBack, onComplete, addXP, notifyDragon, playSound }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const question = GRAMMAR_QUESTIONS[currentIdx];

  const handleWordClick = (word: string) => {
    if (selectedWords.includes(word)) {
      setSelectedWords(selectedWords.filter(w => w !== word));
    } else {
      const newList = [...selectedWords, word];
      setSelectedWords(newList);
      if (newList.length === question.answer.length) {
        if (JSON.stringify(newList) === JSON.stringify(question.answer)) {
            playSound('correct');
            addXP(20);
        } else {
            playSound('wrong');
            notifyDragon("Chưa đúng trật tự rồi!", "Xếp lại đi thám hiểm gia.");
            setTimeout(() => setSelectedWords([]), 1000);
        }
      }
    }
  };

  const handleOptClick = (opt: string) => {
    setSelectedOpt(opt);
    if (opt === question.answer) {
        playSound('correct');
        addXP(20);
    } else {
        playSound('wrong');
        notifyDragon("Sai rồi bạn ơi! Xem lại ngữ pháp nhé.", "Bình tĩnh, sao phải xoắn!");
    }
  };

  const isCorrect = question.type === 'reorder' 
    ? JSON.stringify(selectedWords) === JSON.stringify(question.answer)
    : selectedOpt === question.answer;

  const handleNext = () => {
    if (currentIdx < GRAMMAR_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedWords([]);
      setSelectedOpt(null);
      setShowHint(false);
    } else {
      onComplete();
    }
  };

  const triggerHint = () => {
    if (showHint) return;
    addXP(-5);
    setShowHint(true);
    notifyDragon("Dùng gợi ý rồi nhé!", "Nghĩ kỹ trước khi chọn.");
  };

  return (
    <div className="p-8 h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="text-emerald-700 font-bold hover:underline">← Quay lại bản đồ</button>
        <div className="flex items-center gap-4">
            <button 
                onClick={triggerHint}
                disabled={showHint || isCorrect}
                className={`text-sm font-bold px-3 py-1 rounded-full transition-all ${showHint ? 'bg-gray-200 text-gray-500' : 'bg-yellow-400 text-yellow-900 shadow-sm'}`}
            >
                💡 Gợi ý (-5 XP)
            </button>
            <div className="text-emerald-800 font-bold bg-emerald-100 px-4 py-1 rounded-full text-sm">
                Câu {currentIdx + 1} / {GRAMMAR_QUESTIONS.length}
            </div>
        </div>
      </div>

      <div className="bg-emerald-100 p-6 rounded-2xl border-2 border-emerald-200 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-2 opacity-10 text-4xl">🏝️</div>
        <h3 className="text-2xl font-bold text-emerald-900 mb-2">Chặng 3: Đảo Ngọc Phú Quốc</h3>
        <p className="text-emerald-700 italic">"Chinh phục ngữ pháp để trở thành nhà thám hiểm thực thụ!"</p>
      </div>

      <div className="flex-1 bg-white p-6 rounded-3xl border-2 border-emerald-50 shadow-sm space-y-6">
        <h4 className="text-xl font-bold text-emerald-900">{question.text}</h4>
        
        {question.type === 'reorder' ? (
          <div className="space-y-8">
            <div className="min-h-[60px] p-4 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-200 flex flex-wrap gap-2 transition-all">
              {selectedWords.map((word, i) => (
                <button 
                  key={`sel-${i}`} 
                  onClick={() => handleWordClick(word)}
                  className="bg-emerald-600 text-white px-4 py-2 rounded-xl font-bold shadow-md hover:bg-emerald-700"
                >
                  {word}
                </button>
              ))}
              {selectedWords.length === 0 && <span className="text-emerald-300 italic text-sm py-2">Nhấn các từ bên dưới để xếp câu...</span>}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {question.options?.map((word, i) => (
                <button
                  key={`opt-${i}`}
                  disabled={selectedWords.includes(word)}
                  onClick={() => handleWordClick(word)}
                  className={`px-4 py-2 rounded-xl border-2 font-bold transition-all pulse-soft ${
                    selectedWords.includes(word) ? 'bg-gray-100 border-gray-200 opacity-30 cursor-default' : 'bg-white border-emerald-200 hover:border-emerald-500'
                  }`}
                >
                  {word}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {question.options?.map(opt => (
              <button
                key={opt}
                onClick={() => handleOptClick(opt)}
                className={`p-4 rounded-xl border-2 font-bold transition-all pulse-soft ${
                  selectedOpt === opt && opt === question.answer ? 'bg-emerald-500 text-white border-emerald-600 scale-105' :
                  selectedOpt === opt ? 'bg-red-100 border-red-200' : 'bg-white border-emerald-100 hover:border-emerald-500'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
        
        {showHint && !isCorrect && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-emerald-800 animate-in fade-in slide-in-from-top-2">
                <strong>💡 Gợi ý:</strong> {question.hint}
            </div>
        )}
      </div>

      {isCorrect && (
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

export default StageGrammar;
