import { useEffect, useState } from 'react';
import {
  Check,
  Eye,
  Home,
  ImageOff,
  RotateCcw,
  SlidersHorizontal,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { shuffleArray, type Weapon } from '../data/weapons';
import {
  playClickSound,
  playCompleteSound,
  playCorrectSound,
  playWrongSound,
} from '../utils/sound';
import { CategoryIcon } from './CategoryIcon';

interface QuizScreenProps {
  weapons: Weapon[];
  muted: boolean;
  onToggleMute: () => void;
  onBackToHome: () => void;
  onBackToScope: () => void;
  onRestartAll: () => void;
}

function WeaponImage({
  weapon,
  sizeClass = 'w-56 h-56 sm:w-64 sm:h-64',
  compact = false,
  hideNameHint = false,
}: {
  weapon: Weapon;
  sizeClass?: string;
  compact?: boolean;
  hideNameHint?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [weapon.imageName]);

  const imagePath = `/images/weapons/${weapon.imageName}.png`;

  if (hasError) {
    return (
      <div
        className={`${sizeClass} rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4 text-center select-none`}
      >
        <div
          className={`${
            compact ? 'w-7 h-7 mb-1' : 'w-14 h-14 mb-3'
          } rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500`}
        >
          {compact ? (
            <CategoryIcon category={weapon.category} className="w-4 h-4" />
          ) : (
            <ImageOff className="w-7 h-7 text-slate-400" aria-hidden="true" />
          )}
        </div>
        {!compact && (
          <>
            <p className="text-sm font-bold text-slate-600">
              {hideNameHint ? `무기 이미지 #${weapon.imageName}` : '이미지 없음'}
            </p>
            <p className="text-xs font-medium text-slate-400 mt-1 break-all leading-snug">
              {imagePath}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-3 overflow-hidden`}
    >
      <img
        src={imagePath}
        alt={hideNameHint ? `무기 #${weapon.imageName}` : weapon.name}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export function QuizScreen({
  weapons,
  muted,
  onToggleMute,
  onBackToHome,
  onBackToScope,
  onRestartAll,
}: QuizScreenProps) {
  const [round, setRound] = useState(1);
  const [roundWeapons, setRoundWeapons] = useState<Weapon[]>(() => weapons);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [retryWeapons, setRetryWeapons] = useState<Weapon[]>([]);
  const [passedCount, setPassedCount] = useState(0);
  const [missedWeaponsMap, setMissedWeaponsMap] = useState<Map<string, Weapon>>(
    () => new Map()
  );
  const [isCompleted, setIsCompleted] = useState(false);
  const [startTime] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Reset state whenever a new quiz weapon set is injected
  useEffect(() => {
    setRound(1);
    setRoundWeapons(weapons);
    setCurrentIndex(0);
    setIsRevealed(false);
    setRetryWeapons([]);
    setPassedCount(0);
    setMissedWeaponsMap(new Map());
    setIsCompleted(false);
  }, [weapons]);

  const currentWeapon = roundWeapons[currentIndex];
  const isReviewRound = round > 1;
  const remainingInRound = Math.max(0, roundWeapons.length - currentIndex);

  const handleReveal = () => {
    if (isRevealed || !currentWeapon) return;
    playClickSound(muted);
    setIsRevealed(true);
  };

  const advanceOrFinishRound = (
    nextRetryList: Weapon[],
    nextPassedCount: number
  ) => {
    if (currentIndex + 1 < roundWeapons.length) {
      setRetryWeapons(nextRetryList);
      setPassedCount(nextPassedCount);
      setCurrentIndex((prev) => prev + 1);
      setIsRevealed(false);
      return;
    }

    // Current cycle finished
    if (nextRetryList.length > 0) {
      // Automatically start next review cycle with shuffled missed weapons
      setRound((prev) => prev + 1);
      setRoundWeapons(shuffleArray(nextRetryList));
      setRetryWeapons([]);
      setPassedCount(nextPassedCount);
      setCurrentIndex(0);
      setIsRevealed(false);
      return;
    }

    // Every single weapon has been marked as 맞음!
    setPassedCount(nextPassedCount);
    setElapsedSeconds(Math.max(1, Math.round((Date.now() - startTime) / 1000)));
    setIsCompleted(true);
    playCompleteSound(muted);
  };

  const handleMarkCorrect = () => {
    if (!isRevealed || !currentWeapon) return;
    playCorrectSound(muted);
    advanceOrFinishRound(retryWeapons, passedCount + 1);
  };

  const handleMarkRetry = () => {
    if (!isRevealed || !currentWeapon) return;
    playWrongSound(muted);
    setMissedWeaponsMap((prev) => {
      const next = new Map(prev);
      next.set(currentWeapon.imageName, currentWeapon);
      return next;
    });
    const nextRetryList = [...retryWeapons, currentWeapon];
    advanceOrFinishRound(nextRetryList, passedCount);
  };

  // Keyboard convenience: Space to reveal, 1 for 맞음, 2 for 다시 암기하기
  useEffect(() => {
    if (isCompleted) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isRevealed && (e.key === ' ' || e.key === 'Enter')) {
        e.preventDefault();
        handleReveal();
      } else if (isRevealed && e.key === '1') {
        e.preventDefault();
        handleMarkCorrect();
      } else if (isRevealed && e.key === '2') {
        e.preventDefault();
        handleMarkRetry();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  // Final Celebration Screen
  if (isCompleted) {
    const totalCount = weapons.length;
    const firstTryCount = Math.max(0, totalCount - missedWeaponsMap.size);
    const missedList = Array.from(missedWeaponsMap.values());
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const formattedTime =
      minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;

    return (
      <main className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-6">
          {/* Top Navigation Bar */}
          <header className="card-arcade rounded-2xl px-4 py-3 sm:px-6 flex items-center justify-between gap-3">
            <span className="font-display font-black text-base sm:text-lg text-[#141829]">
              암기 사이클 완료
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onToggleMute}
                aria-label={muted ? '효과음 켜기' : '효과음 끄기'}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                )}
              </button>
              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#141829] bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>홈으로 돌아가기</span>
              </button>
            </div>
          </header>

          {/* Celebration Summary Card */}
          <section className="card-arcade rounded-3xl p-6 sm:p-10 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#C8F600] border-2 border-[#141829] flex items-center justify-center shadow-[0_3px_0_#141829]">
              <Trophy className="w-8 h-8 text-[#141829]" aria-hidden="true" />
            </div>

            <p className="text-sm font-bold text-emerald-700 mb-2">
              선택한 범위의 모든 무기를 통과했습니다
            </p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#141829] tracking-tight mb-6">
              전체 암기 완료!
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  암기 완료 무기
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-emerald-600 tabular-nums">
                  {totalCount} / {totalCount}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  총 진행 라운드
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#2541FF] tabular-nums">
                  {round}라운드
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  첫 라운드 통과
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#141829] tabular-nums">
                  {firstTryCount}개
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  소요 시간
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#141829] tabular-nums">
                  {formattedTime}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={onRestartAll}
                className="btn-arcade w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C8F600] hover:bg-[#d2ff1a] text-[#141829] font-bold text-base px-6 py-3.5 rounded-xl min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <RotateCcw className="w-5 h-5" aria-hidden="true" />
                <span>다시 풀기</span>
              </button>

              <button
                type="button"
                onClick={onBackToScope}
                className="btn-arcade w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2541FF] hover:bg-[#1b34e0] text-white font-bold text-base px-6 py-3.5 rounded-xl min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#141829]"
              >
                <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
                <span>출제범위 다시 선택</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="btn-arcade w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#141829] font-bold text-base px-6 py-3.5 rounded-xl min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                <span>홈으로 돌아가기</span>
              </button>
            </div>
          </section>

          {/* Optional Review List for weapons that required retry */}
          {missedList.length > 0 && (
            <section className="card-arcade rounded-3xl p-5 sm:p-8">
              <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
                <h2 className="font-display font-black text-lg sm:text-xl text-[#141829]">
                  다시 암기했던 무기 ({missedList.length}종)
                </h2>
              </div>

              <div className="divide-y divide-slate-200">
                {missedList.map((weapon) => (
                  <div
                    key={weapon.imageName}
                    className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <WeaponImage
                        weapon={weapon}
                        sizeClass="w-12 h-12 shrink-0"
                        compact
                      />
                      <div className="min-w-0">
                        <div className="text-xs text-slate-500 font-medium">
                          {weapon.category} · No. {weapon.imageName}
                        </div>
                        <div className="font-bold text-base text-[#141829] truncate">
                          {weapon.name}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm shrink-0">
                      <div>
                        <span className="text-xs text-slate-500 mr-1.5">
                          서브:
                        </span>
                        <span className="font-bold text-[#141829]">
                          {weapon.sub}
                        </span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-500 mr-1.5">
                          스페셜:
                        </span>
                        <span className="font-bold text-[#141829]">
                          {weapon.special}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    );
  }

  if (!currentWeapon) return null;

  const overallMasteryPercent = Math.round(
    (passedCount / Math.max(1, weapons.length)) * 100
  );

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-3xl space-y-5">
        {/* Top HUD Bar */}
        <header className="card-arcade rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 min-w-0">
              <div className="font-display font-black text-xl sm:text-2xl text-[#141829] tabular-nums whitespace-nowrap">
                {currentIndex + 1} / {roundWeapons.length}
              </div>

              {isReviewRound ? (
                <div className="inline-flex items-center gap-1.5 text-sm sm:text-base font-black text-[#D9480F] tabular-nums whitespace-nowrap">
                  <RotateCcw className="w-4 h-4 shrink-0" aria-hidden="true" />
                  <span>오답 복습 중 - 남은 무기 {remainingInRound}개</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-600 tabular-nums whitespace-nowrap">
                  <span>맞음 {passedCount}</span>
                  <span aria-hidden="true">·</span>
                  <span>다시 암기 {retryWeapons.length}</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onToggleMute}
                aria-label={muted ? '효과음 켜기' : '효과음 끄기'}
                title={muted ? '효과음 켜기' : '효과음 끄기'}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                {muted ? (
                  <VolumeX className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <Volume2 className="w-4 h-4" aria-hidden="true" />
                )}
              </button>

              <button
                type="button"
                onClick={onBackToScope}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <SlidersHorizontal className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">출제범위</span>
              </button>

              <button
                type="button"
                onClick={onBackToHome}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#141829] bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <Home className="w-4 h-4" aria-hidden="true" />
                <span>홈으로 돌아가기</span>
              </button>
            </div>
          </div>

          <div
            className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-3"
            role="progressbar"
            aria-valuenow={overallMasteryPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="전체 암기 진행률"
          >
            <div
              className={`h-full transition-all duration-200 ${
                isReviewRound ? 'bg-[#FF5A26]' : 'bg-[#2541FF]'
              }`}
              style={{ width: `${overallMasteryPercent}%` }}
            />
          </div>
        </header>

        {/* Central Flashcard */}
        <section className="card-arcade rounded-3xl p-6 sm:p-10 flex flex-col items-center text-center">
          <WeaponImage
            weapon={currentWeapon}
            sizeClass="w-52 h-52 sm:w-64 sm:h-64 mb-6"
            hideNameHint={!isRevealed}
          />

          {!isRevealed ? (
            <div className="py-2">
              <p className="text-sm sm:text-base font-bold text-slate-500">
                이 무기의 이름과 서브 · 스페셜 웨폰을 떠올려 보세요
              </p>
            </div>
          ) : (
            <div className="w-full max-w-xl space-y-5 pt-2 border-t border-slate-200">
              <div>
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-1.5">
                  <CategoryIcon
                    category={currentWeapon.category}
                    className="w-4 h-4 text-[#2541FF]"
                  />
                  <span>{currentWeapon.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    No. {currentWeapon.imageName}
                  </span>
                </div>
                <h2
                  className="font-display font-black text-2xl sm:text-4xl text-[#141829] tracking-tight"
                  style={{ textWrap: 'balance' }}
                >
                  {currentWeapon.name}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                <div className="bg-slate-50 border-2 border-[#141829] rounded-2xl p-4">
                  <div className="text-xs font-bold text-[#2541FF] mb-1">
                    서브 웨폰
                  </div>
                  <div className="font-display font-black text-lg sm:text-xl text-[#141829]">
                    {currentWeapon.sub}
                  </div>
                </div>

                <div className="bg-slate-50 border-2 border-[#141829] rounded-2xl p-4">
                  <div className="text-xs font-bold text-[#D9480F] mb-1">
                    스페셜 웨폰
                  </div>
                  <div className="font-display font-black text-lg sm:text-xl text-[#141829]">
                    {currentWeapon.special}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Bottom Action Buttons */}
        {!isRevealed ? (
          <button
            type="button"
            onClick={handleReveal}
            className="btn-arcade w-full inline-flex items-center justify-center gap-2.5 bg-[#C8F600] hover:bg-[#d2ff1a] text-[#141829] font-display font-black text-xl sm:text-2xl px-8 py-4 rounded-2xl min-h-[60px] whitespace-nowrap cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2541FF]"
          >
            <Eye className="w-6 h-6" aria-hidden="true" />
            <span>정답 보기</span>
          </button>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={handleMarkCorrect}
              className="btn-arcade inline-flex items-center justify-center gap-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-black text-xl px-6 py-4 rounded-2xl min-h-[60px] whitespace-nowrap cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#141829]"
            >
              <Check className="w-6 h-6 stroke-[3]" aria-hidden="true" />
              <span>맞음</span>
            </button>

            <button
              type="button"
              onClick={handleMarkRetry}
              className="btn-arcade inline-flex items-center justify-center gap-2.5 bg-[#FF5A26] hover:bg-[#e84b18] text-white font-display font-black text-xl px-6 py-4 rounded-2xl min-h-[60px] whitespace-nowrap cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#141829]"
            >
              <RotateCcw className="w-6 h-6 stroke-[2.5]" aria-hidden="true" />
              <span>다시 암기하기</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
