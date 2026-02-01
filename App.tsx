
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameStage, UserProgress } from './types';
import Splash from './components/Splash';
import WorldMap from './components/WorldMap';
import StagePhonetics from './components/StagePhonetics';
import StageVocabulary from './components/StageVocabulary';
import StageGrammar from './components/StageGrammar';
import Certificate from './components/Certificate';
import DragonGuide from './components/DragonGuide';

const STORAGE_KEY = 'adventure_vn_progress';

const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.SPLASH);
  const [progress, setProgress] = useState<UserProgress>({
    username: '',
    xp: 0,
    unlockedStages: [1],
    completedStages: [],
    badges: []
  });
  const [showDragon, setShowDragon] = useState(false);
  const [dragonMsg, setDragonMsg] = useState('');
  const [dragonSlang, setDragonSlang] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  // Sync to localStorage whenever progress changes
  useEffect(() => {
    if (progress.username) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }
  }, [progress]);

  useEffect(() => {
    if (bgMusicRef.current) {
      if (soundEnabled && stage !== GameStage.SPLASH) {
        bgMusicRef.current.play().catch(() => {});
      } else {
        bgMusicRef.current.pause();
      }
    }
  }, [soundEnabled, stage]);

  const playSound = (type: 'correct' | 'wrong') => {
    if (!soundEnabled) return;
    const audio = new Audio(type === 'correct' ? 
        'https://actions.google.com/sounds/v1/cartoon/clink_glasses.ogg' : 
        'https://actions.google.com/sounds/v1/cartoon/boing.ogg');
    audio.play().catch(() => {});
  };

  const triggerConfetti = () => {
    // @ts-ignore
    if (window.confetti) {
        // @ts-ignore
        window.confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
  };

  const addXP = (amount: number) => {
    setProgress(prev => ({
      ...prev,
      xp: Math.max(0, prev.xp + amount)
    }));
  };

  const completeStage = (stageId: number, badgeName: string, xpReward: number) => {
    setProgress(prev => {
      const nextStageId = stageId + 1;
      const newUnlocked = [...new Set([...prev.unlockedStages, nextStageId])];
      const newCompleted = [...new Set([...prev.completedStages, stageId])];
      const newBadges = [...new Set([...prev.badges, badgeName])];
      
      return {
        ...prev,
        xp: prev.xp + xpReward,
        unlockedStages: newUnlocked,
        completedStages: newCompleted,
        badges: newBadges
      };
    });
    triggerConfetti();
  };

  const notifyDragon = (msg: string, slang: string = '') => {
    setDragonMsg(msg);
    setDragonSlang(slang);
    setShowDragon(true);
    setTimeout(() => setShowDragon(false), 4000);
  };

  const renderCurrentStage = () => {
    switch (stage) {
      case GameStage.SPLASH:
        return <Splash 
          onStart={(name) => {
            setProgress(prev => ({ ...prev, username: name }));
            setStage(GameStage.MAP);
            notifyDragon(`Chào mừng ${name}! Sẵn sàng phá đảo văn hoá Việt Nam chưa?`, "Quẩy thôi thám hiểm gia ơi!");
          }} 
        />;
      case GameStage.MAP:
        return <WorldMap 
          progress={progress} 
          onSelectStage={(s) => setStage(s)} 
        />;
      case GameStage.STAGE_1:
        return <StagePhonetics 
          onBack={() => setStage(GameStage.MAP)}
          onComplete={() => {
            completeStage(1, 'Thần Đồng Ngữ Âm', 100);
            notifyDragon("Đỉnh của chóp! Thanh điệu Hạ Long không làm khó được bạn.", "XP bay vèo vèo!");
            setStage(GameStage.MAP);
          }}
          addXP={addXP}
          notifyDragon={notifyDragon}
          playSound={playSound}
        />;
      case GameStage.STAGE_2:
        return <StageVocabulary 
          onBack={() => setStage(GameStage.MAP)}
          onComplete={() => {
            completeStage(2, 'Trùm Từ Vựng Phố Cổ', 150);
            notifyDragon("Hội An lung linh, từ vựng của bạn cũng xịn xò không kém!", "Vuýp quá đi!");
            setStage(GameStage.MAP);
          }}
          addXP={addXP}
          notifyDragon={notifyDragon}
          playSound={playSound}
        />;
      case GameStage.STAGE_3:
        return <StageGrammar 
          onBack={() => setStage(GameStage.MAP)}
          onComplete={() => {
            completeStage(3, 'Bậc Thầy Ngữ Pháp', 200);
            notifyDragon("Chúc mừng bạn đã chinh phục được chặng cuối cùng tại Phú Quốc!", "Siêu đỉnh!");
            setStage(GameStage.RESULT);
          }}
          addXP={addXP}
          notifyDragon={notifyDragon}
          playSound={playSound}
        />;
      case GameStage.RESULT:
        return <Certificate 
          progress={progress} 
          onRestart={() => {
            localStorage.removeItem(STORAGE_KEY);
            window.location.reload();
          }} 
        />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4 bg-emerald-50">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 text-6xl">🐉</div>
        <div className="absolute bottom-20 right-10 text-6xl">🏮</div>
        <div className="absolute top-1/2 left-20 text-6xl">🌊</div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 min-h-[600px] flex flex-col">
        {/* Header (XP & Name) */}
        {stage !== GameStage.SPLASH && (
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center px-8">
            <div className="font-bold text-lg">Adventure VN</div>
            <div className="flex items-center gap-4">
              <span className="bg-yellow-400 text-emerald-900 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
                ⭐ {progress.xp} XP
              </span>
              <span className="font-medium">{progress.username}</span>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="hover:scale-110 transition-transform bg-white/20 p-2 rounded-lg"
              >
                {soundEnabled ? '🔊' : '🔇'}
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {renderCurrentStage()}
        </div>
      </div>

      {/* Dragon Helper */}
      <DragonGuide show={showDragon} message={dragonMsg} slang={dragonSlang} />

      {/* Footer info */}
      <div className="mt-4 text-emerald-800 text-sm font-medium">
        © 2024 Chuyến Phiêu Lưu Văn Hoá Việt Nam | Học vui - Chơi chất
      </div>
    </div>
  );
};

export default App;
