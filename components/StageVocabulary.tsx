
import React, { useState } from 'react';
import { VOCABULARY_QUESTIONS } from '../data';

interface StageVocabularyProps {
  onBack: () => void;
  onComplete: () => void;
  addXP: (xp: number) => void;
  notifyDragon: (msg: string, slang?: string) => void;
  playSound: (type: 'correct' | 'wrong') => void;
}

const StageVocabulary: React.FC<StageVocabularyProps> = ({ onBack, onComplete, addXP, notifyDragon, playSound }) => {
  const [phase, setPhase] = useState<'matching' | 'slang' | 'quiz'>('matching');
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [quizSelected, setQuizSelected] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const currentMatching = phase === 'matching' ? VOCABULARY_QUESTIONS.matching : VOCABULARY_QUESTIONS.slang;

  const handleMatch = (id: string, side: 'left' | 'right') => {
    if (side === 'left') {
      setSelectedLeft(id);
    } else {
      if (selectedLeft === id) {
        playSound('correct');
        setMatchedIds([...matchedIds, id]);
        setSelectedLeft(null);
        addXP(20);
        if (matchedIds.length + 1 === currentMatching.length) {
            notifyDragon("Chuẩn không cần chỉnh! +20 XP", "Xịn vãi chưởng!");
        }
      } else {
        playSound('wrong');
        notifyDragon("Hỏng rồi, ghép sai rồi!", "Toang rồi thám hiểm gia ơi");
        setSelectedLeft(null);
      }
    }
  };

  const nextPhase = () => {
    if (phase === 'matching') {
        setPhase('slang');
        setMatchedIds([]);
        setShowHint(false);
    } else if (phase === 'slang') {
        setPhase('quiz');
        setShowHint(false);
    } else {
        onComplete();
    }
  };

  const triggerHint = () => {
    if (showHint) return;
    addXP(-5);
    setShowHint(true);
    notifyDragon("Gợi ý nhẹ: Xem kỹ ý nghĩa nhé!", "Mất 5 XP rồi nha.");
  };

  const isPhaseComplete = phase === 'quiz' ? quizSelected === VOCABULARY_QUESTIONS.genZ.answer : matchedIds.length === currentMatching.length;

  return (
    <div className="p-8 h-full flex flex-col space-y-6 bg-orange-50/30">
      <div className="flex justify-between items-center">
        <button onClick={onBack} className="text-orange-700 font-bold hover:underline">← Quay lại bản đồ</button>
        <div className="flex items-center gap-4">
            {phase === 'quiz' && (
                <button 
                    onClick={triggerHint}
                    disabled={showHint || quizSelected === VOCABULARY_QUESTIONS.genZ.answer}
                    className={`text-sm font-bold px-3 py-1 rounded-full transition-all ${showHint ? 'bg-gray-200 text-gray-500' : 'bg-yellow-400 text-yellow-900 shadow-sm'}`}
                >
                    💡 Gợi ý (-5 XP)
                </button>
            )}
            <div className="text-orange-800 font-bold bg-orange-100 px-4 py-1 rounded-full uppercase text-xs tracking-widest">
                {phase}
            </div>
        </div>
      </div>

      <div className="bg-orange-100 p-6 rounded-2xl border-2 border-orange-200 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 p-2 opacity-10 text-4xl">🏮</div>
        <h3 className="text-2xl font-bold text-orange-900 mb-2">Chặng 2: Hội An</h3>
        <p className="text-orange-700 italic">"Đèn lồng Hội An lung linh quá! Khám phá từ vựng nào!"</p>
      </div>

      <div className="flex-1">
        {phase !== 'quiz' ? (
          <div className="space-y-4">
            <p className="text-center text-orange-800 font-medium mb-4">Ghép đôi các mảnh ghép di sản:</p>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                {currentMatching.map((item) => (
                    <button
                        key={`l-${item.id}`}
                        disabled={matchedIds.includes(item.id)}
                        onClick={() => handleMatch(item.id, 'left')}
                        className={`w-full p-4 rounded-xl border-2 transition-all font-bold pulse-soft ${
                            matchedIds.includes(item.id) ? 'bg-orange-200 border-orange-300 opacity-30 cursor-default' : 
                            selectedLeft === item.id ? 'bg-orange-500 text-white border-orange-600 scale-105' : 'bg-white border-orange-200 hover:border-orange-400 text-orange-900'
                        }`}
                    >
                        {item.left}
                    </button>
                ))}
              </div>
              <div className="space-y-4">
                {/* Randomish order for right side based on length */}
                {[...currentMatching].sort((a,b) => a.right.length - b.right.length).map((item) => (
                    <button
                        key={`r-${item.id}`}
                        disabled={matchedIds.includes(item.id)}
                        onClick={() => handleMatch(item.id, 'right')}
                        className={`w-full p-4 rounded-xl border-2 transition-all font-bold pulse-soft ${
                            matchedIds.includes(item.id) ? 'bg-green-100 border-green-300 opacity-30 cursor-default' : 'bg-white border-orange-200 hover:border-orange-400 text-orange-900'
                        }`}
                    >
                        {item.right}
                    </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-white rounded-3xl border-2 border-orange-100 shadow-sm space-y-6">
            <h4 className="text-xl font-bold text-orange-900">{VOCABULARY_QUESTIONS.genZ.text}</h4>
            <div className="grid grid-cols-1 gap-4">
              {VOCABULARY_QUESTIONS.genZ.options.map(opt => (
                <button
                    key={opt}
                    onClick={() => {
                        setQuizSelected(opt);
                        if (opt === VOCABULARY_QUESTIONS.genZ.answer) {
                            playSound('correct');
                            addXP(50);
                        } else {
                            playSound('wrong');
                            notifyDragon("Sai rồi! Gen Z nói khác cơ.", "Toang rồi thám hiểm gia!");
                        }
                    }}
                    className={`p-4 rounded-xl border-2 font-bold text-lg transition-all pulse-soft ${
                        quizSelected === opt && opt === VOCABULARY_QUESTIONS.genZ.answer ? 'bg-orange-500 text-white border-orange-600' :
                        quizSelected === opt ? 'bg-red-100 border-red-300' : 'bg-white border-orange-100 hover:border-orange-300'
                    }`}
                >
                    {opt}
                </button>
              ))}
            </div>
            {showHint && quizSelected !== VOCABULARY_QUESTIONS.genZ.answer && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-sm text-orange-800 animate-in fade-in">
                    <strong>💡 Gợi ý:</strong> {VOCABULARY_QUESTIONS.genZ.hint}
                </div>
            )}
          </div>
        )}
      </div>

      {isPhaseComplete && (
        <button
          onClick={nextPhase}
          className="w-full bg-orange-600 text-white font-bold py-4 rounded-2xl text-xl animate-bounce shadow-xl hover:bg-orange-700 transition-colors"
        >
          Tiếp tục hành trình! ➔
        </button>
      )}
    </div>
  );
};

export default StageVocabulary;
