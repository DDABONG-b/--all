import { useMemo, useState } from 'react';
import {
  WEAPONS,
  WEAPON_CATEGORIES,
  getCategoryCounts,
  shuffleArray,
  type Weapon,
  type WeaponCategory,
} from './data/weapons';
import { TitleScreen } from './components/TitleScreen';
import { ScopeSelectScreen } from './components/ScopeSelectScreen';
import { QuizScreen } from './components/QuizScreen';
import { playClickSound } from './utils/sound';

type AppStage = 'TITLE' | 'SCOPE_SELECT' | 'QUIZ';

export default function App() {
  const [stage, setStage] = useState<AppStage>('TITLE');
  const [selectedCategories, setSelectedCategories] = useState<
    Set<WeaponCategory>
  >(() => new Set(WEAPON_CATEGORIES));
  const [quizWeapons, setQuizWeapons] = useState<Weapon[]>([]);
  const [sessionId, setSessionId] = useState(0);
  const [muted, setMuted] = useState(false);

  const categoryCounts = useMemo(() => getCategoryCounts(), []);

  const handleGoToScope = () => {
    playClickSound(muted);
    setStage('SCOPE_SELECT');
  };

  const handleBackToTitle = () => {
    playClickSound(muted);
    setStage('TITLE');
  };

  const handleToggleCategory = (category: WeaponCategory) => {
    playClickSound(muted);
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    playClickSound(muted);
    setSelectedCategories(new Set(WEAPON_CATEGORIES));
  };

  const handleDeselectAll = () => {
    playClickSound(muted);
    setSelectedCategories(new Set());
  };

  const startFilteredQuiz = () => {
    const filtered = WEAPONS.filter((w) => selectedCategories.has(w.category));
    if (filtered.length === 0) return;
    playClickSound(muted);
    setQuizWeapons(shuffleArray(filtered));
    setSessionId((prev) => prev + 1);
    setStage('QUIZ');
  };

  const handleRetryMissed = (missedWeapons: Weapon[]) => {
    if (missedWeapons.length === 0) return;
    playClickSound(muted);
    setQuizWeapons(shuffleArray(missedWeapons));
    setSessionId((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-turf-grid text-[#141829]">
      {stage === 'TITLE' && (
        <TitleScreen
          onStart={handleGoToScope}
          totalWeapons={WEAPONS.length}
          totalCategories={WEAPON_CATEGORIES.length}
        />
      )}

      {stage === 'SCOPE_SELECT' && (
        <ScopeSelectScreen
          selectedCategories={selectedCategories}
          categoryCounts={categoryCounts}
          onToggleCategory={handleToggleCategory}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
          onStartQuiz={startFilteredQuiz}
          onBackToTitle={handleBackToTitle}
        />
      )}

      {stage === 'QUIZ' && (
        <QuizScreen
          key={sessionId}
          weapons={quizWeapons}
          muted={muted}
          onToggleMute={() => setMuted((prev) => !prev)}
          onBackToScope={handleGoToScope}
          onRestartAll={startFilteredQuiz}
          onRetryMissed={handleRetryMissed}
        />
      )}
    </div>
  );
}
