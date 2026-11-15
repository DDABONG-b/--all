import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Eye,
  ImageOff,
  RotateCcw,
  SlidersHorizontal,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import {
  SPECIAL_WEAPONS,
  SUB_WEAPONS,
  buildChoiceOptions,
  type SpecialWeapon,
  type SubWeapon,
  type Weapon,
} from '../data/weapons';
import {
  playClickSound,
  playCompleteSound,
  playCorrectSound,
  playWrongSound,
} from '../utils/sound';
import { CategoryIcon } from './CategoryIcon';

interface QuizQuestion {
  weapon: Weapon;
  subOptions: SubWeapon[];
  specialOptions: SpecialWeapon[];
}

interface AnswerRecord {
  weapon: Weapon;
  selectedSub: SubWeapon | null;
  selectedSpecial: SpecialWeapon | null;
  subCorrect: boolean;
  specialCorrect: boolean;
  revealed: boolean;
}

interface QuizScreenProps {
  weapons: Weapon[];
  muted: boolean;
  onToggleMute: () => void;
  onBackToScope: () => void;
  onRestartAll: () => void;
  onRetryMissed: (missedWeapons: Weapon[]) => void;
}

function WeaponImage({
  weapon,
  sizeClass = 'w-44 h-44 sm:w-52 sm:h-52',
  compact = false,
}: {
  weapon: Weapon;
  sizeClass?: string;
  compact?: boolean;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [weapon.imageName]);

  const imagePath = `/images/weapons/${weapon.imageName}.png`;

  if (hasError) {
    return (
      <div
        className={`${sizeClass} rounded-2xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-3 text-center select-none`}
      >
        <div
          className={`${
            compact ? 'w-7 h-7 mb-1' : 'w-12 h-12 mb-2.5'
          } rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-500`}
        >
          {compact ? (
            <CategoryIcon category={weapon.category} className="w-4 h-4" />
          ) : (
            <ImageOff className="w-6 h-6 text-slate-400" aria-hidden="true" />
          )}
        </div>
        {!compact && (
          <>
            <p className="text-xs font-bold text-slate-600">이미지 없음</p>
            <p className="text-[11px] font-medium text-slate-400 mt-1 break-all leading-snug">
              {imagePath}
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={`${sizeClass} rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center p-2 overflow-hidden`}
    >
      <img
        src={imagePath}
        alt={weapon.name}
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
  onBackToScope,
  onRestartAll,
  onRetryMissed,
}: QuizScreenProps) {
  const questions: QuizQuestion[] = useMemo(
    () =>
      weapons.map((weapon) => ({
        weapon,
        subOptions: buildChoiceOptions(weapon.sub, SUB_WEAPONS, 4),
        specialOptions: buildChoiceOptions(weapon.special, SPECIAL_WEAPONS, 4),
      })),
    [weapons]
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedSub, setSelectedSub] = useState<SubWeapon | null>(null);
  const [selectedSpecial, setSelectedSpecial] = useState<SpecialWeapon | null>(
    null
  );
  const [revealed, setRevealed] = useState(false);
  const [records, setRecords] = useState<AnswerRecord[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [resultFilter, setResultFilter] = useState<'all' | 'missed'>('missed');
  const [startTime] = useState(() => Date.now());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Reset internal progress when a new weapon list is provided
  useEffect(() => {
    setCurrentIndex(0);
    setSelectedSub(null);
    setSelectedSpecial(null);
    setRevealed(false);
    setRecords([]);
    setIsFinished(false);
  }, [questions]);

  const currentQuestion = questions[currentIndex];
  const isSubAnswered = selectedSub !== null || revealed;
  const isSpecialAnswered = selectedSpecial !== null || revealed;
  const isQuestionComplete = isSubAnswered && isSpecialAnswered;

  const handleSelectSub = (option: SubWeapon) => {
    if (isSubAnswered || !currentQuestion) return;
    setSelectedSub(option);
    if (option === currentQuestion.weapon.sub) {
      playCorrectSound(muted);
    } else {
      playWrongSound(muted);
    }
  };

  const handleSelectSpecial = (option: SpecialWeapon) => {
    if (isSpecialAnswered || !currentQuestion) return;
    setSelectedSpecial(option);
    if (option === currentQuestion.weapon.special) {
      playCorrectSound(muted);
    } else {
      playWrongSound(muted);
    }
  };

  const handleRevealAnswers = () => {
    if (isQuestionComplete) return;
    playClickSound(muted);
    setRevealed(true);
  };

  const handleNext = () => {
    if (!isQuestionComplete || !currentQuestion) return;

    const record: AnswerRecord = {
      weapon: currentQuestion.weapon,
      selectedSub,
      selectedSpecial,
      subCorrect: selectedSub === currentQuestion.weapon.sub,
      specialCorrect: selectedSpecial === currentQuestion.weapon.special,
      revealed,
    };

    const nextRecords = [...records, record];
    setRecords(nextRecords);

    if (currentIndex + 1 >= questions.length) {
      setElapsedSeconds(Math.max(1, Math.round((Date.now() - startTime) / 1000)));
      const missedCount = nextRecords.filter(
        (r) => !(r.subCorrect && r.specialCorrect)
      ).length;
      setResultFilter(missedCount > 0 ? 'missed' : 'all');
      setIsFinished(true);
      playCompleteSound(muted);
    } else {
      playClickSound(muted);
      setCurrentIndex((prev) => prev + 1);
      setSelectedSub(null);
      setSelectedSpecial(null);
      setRevealed(false);
    }
  };

  useEffect(() => {
    if (isFinished) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && isQuestionComplete) {
        e.preventDefault();
        handleNext();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  if (isFinished) {
    const total = records.length;
    const bothCorrectCount = records.filter(
      (r) => r.subCorrect && r.specialCorrect
    ).length;
    const subCorrectCount = records.filter((r) => r.subCorrect).length;
    const specialCorrectCount = records.filter((r) => r.specialCorrect).length;
    const missedRecords = records.filter(
      (r) => !(r.subCorrect && r.specialCorrect)
    );
    const accuracy = total > 0 ? Math.round((bothCorrectCount / total) * 100) : 0;

    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    const formattedTime =
      minutes > 0 ? `${minutes}분 ${seconds}초` : `${seconds}초`;

    const visibleRecords =
      resultFilter === 'missed' ? missedRecords : records;

    return (
      <main className="min-h-screen flex flex-col items-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl space-y-6">
          {/* Summary Card */}
          <section className="card-arcade rounded-3xl p-6 sm:p-10 text-center">
            <p className="text-sm font-bold text-[#2541FF] mb-2">퀴즈 완료</p>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-[#141829] tracking-tight mb-6">
              결과 요약
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  완벽 정답 (서브+스페셜)
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#2541FF] tabular-nums">
                  {bothCorrectCount} / {total}
                </div>
                <div className="text-xs font-bold text-slate-500 mt-1 tabular-nums">
                  정답률 {accuracy}%
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  서브 웨폰 정답
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#141829] tabular-nums">
                  {subCorrectCount} / {total}
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="text-xs font-bold text-slate-500 mb-1">
                  스페셜 웨폰 정답
                </div>
                <div className="font-display font-black text-2xl sm:text-3xl text-[#141829] tabular-nums">
                  {specialCorrectCount} / {total}
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

              {missedRecords.length > 0 && (
                <button
                  type="button"
                  onClick={() =>
                    onRetryMissed(missedRecords.map((r) => r.weapon))
                  }
                  className="btn-arcade w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2541FF] hover:bg-[#1b34e0] text-white font-bold text-base px-6 py-3.5 rounded-xl min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#141829]"
                >
                  <RotateCcw className="w-5 h-5" aria-hidden="true" />
                  <span>틀린 문제만 다시 풀기 ({missedRecords.length})</span>
                </button>
              )}

              <button
                type="button"
                onClick={onBackToScope}
                className="btn-arcade w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#141829] font-bold text-base px-6 py-3.5 rounded-xl min-h-[48px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <SlidersHorizontal className="w-5 h-5" aria-hidden="true" />
                <span>출제범위 다시 선택</span>
              </button>
            </div>
          </section>

          {/* Review Breakdown */}
          <section className="card-arcade rounded-3xl p-5 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200">
              <h2 className="font-display font-black text-xl text-[#141829]">
                문제별 복습
              </h2>

              <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setResultFilter('missed')}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    resultFilter === 'missed'
                      ? 'bg-white text-[#141829] shadow-sm'
                      : 'text-slate-600 hover:text-[#141829]'
                  }`}
                >
                  틀린 문제만 ({missedRecords.length})
                </button>
                <button
                  type="button"
                  onClick={() => setResultFilter('all')}
                  className={`px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                    resultFilter === 'all'
                      ? 'bg-white text-[#141829] shadow-sm'
                      : 'text-slate-600 hover:text-[#141829]'
                  }`}
                >
                  전체 보기 ({total})
                </button>
              </div>
            </div>

            {visibleRecords.length === 0 ? (
              <div className="py-10 text-center text-slate-600 font-medium">
                모든 문제를 완벽하게 맞혔습니다!
              </div>
            ) : (
              <div className="divide-y divide-slate-200">
                {visibleRecords.map((rec) => {
                  const isPerfect = rec.subCorrect && rec.specialCorrect;
                  return (
                    <div
                      key={rec.weapon.imageName}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <WeaponImage
                          weapon={rec.weapon}
                          sizeClass="w-14 h-14 shrink-0"
                          compact
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                            <span>{rec.weapon.category}</span>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">
                              No. {rec.weapon.imageName}
                            </span>
                          </div>
                          <div className="font-bold text-base text-[#141829] truncate">
                            {rec.weapon.name}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-sm shrink-0">
                        <div className="flex items-center gap-2">
                          {rec.subCorrect ? (
                            <CheckCircle2
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="w-4 h-4 text-rose-600 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <div>
                            <span className="text-xs text-slate-500 mr-1.5">
                              서브:
                            </span>
                            <span className="font-bold text-[#141829]">
                              {rec.weapon.sub}
                            </span>
                            {!rec.subCorrect && rec.selectedSub && (
                              <span className="text-xs text-rose-600 ml-1.5">
                                (선택: {rec.selectedSub})
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {rec.specialCorrect ? (
                            <CheckCircle2
                              className="w-4 h-4 text-emerald-600 shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <XCircle
                              className="w-4 h-4 text-rose-600 shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <div>
                            <span className="text-xs text-slate-500 mr-1.5">
                              스페셜:
                            </span>
                            <span className="font-bold text-[#141829]">
                              {rec.weapon.special}
                            </span>
                            {!rec.specialCorrect && rec.selectedSpecial && (
                              <span className="text-xs text-rose-600 ml-1.5">
                                (선택: {rec.selectedSpecial})
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {!isPerfect && (
                        <span className="sr-only">오답 포함</span>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    );
  }

  if (!currentQuestion) return null;

  const { weapon, subOptions, specialOptions } = currentQuestion;
  const progressPercent = Math.round(
    ((currentIndex + (isQuestionComplete ? 1 : 0)) / questions.length) * 100
  );
  const perfectScoreSoFar = records.filter(
    (r) => r.subCorrect && r.specialCorrect
  ).length;

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-6 sm:py-10">
      <div className="w-full max-w-5xl space-y-5">
        {/* Top Progress & Return Bar */}
        <header className="card-arcade rounded-2xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4 min-w-0">
              <div className="font-display font-black text-xl sm:text-2xl text-[#141829] tabular-nums whitespace-nowrap">
                {currentIndex + 1} / {questions.length}
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-slate-600 tabular-nums whitespace-nowrap">
                <span>완벽 정답 {perfectScoreSoFar}</span>
              </div>
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
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#141829] bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-xl transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                <span>출제범위로 돌아가기</span>
              </button>
            </div>
          </div>

          <div
            className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-3"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-full bg-[#2541FF] transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </header>

        {/* Central Weapon Card & Quiz Options */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left: Central Weapon Showcase */}
          <section className="lg:col-span-5 card-arcade rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-slate-500 mb-4">
              <CategoryIcon category={weapon.category} className="w-4 h-4 text-[#2541FF]" />
              <span>{weapon.category}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">No. {weapon.imageName}</span>
            </div>

            <WeaponImage weapon={weapon} sizeClass="w-48 h-48 sm:w-56 sm:h-56 mb-5" />

            <h2
              className="font-display font-black text-2xl sm:text-3xl text-[#141829] tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {weapon.name}
            </h2>
          </section>

          {/* Right: Sub & Special Multiple-Choice Area */}
          <section className="lg:col-span-7 card-arcade rounded-3xl p-5 sm:p-7 flex flex-col justify-between gap-6">
            <div className="space-y-6">
              {/* Sub Weapon Section */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-display font-black text-lg text-[#141829]">
                    서브 웨폰
                  </h3>
                  {isSubAnswered && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold ${
                        selectedSub === weapon.sub
                          ? 'text-emerald-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {selectedSub === weapon.sub ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>정답!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          <span>정답: {weapon.sub}</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {subOptions.map((option) => {
                    const isCorrectOption = option === weapon.sub;
                    const isPicked = selectedSub === option;

                    let buttonStyle =
                      'bg-white border-[#141829] text-[#141829] hover:bg-blue-50 shadow-[0_3px_0_#141829]';

                    if (isSubAnswered) {
                      if (isCorrectOption) {
                        buttonStyle =
                          'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-none';
                      } else if (isPicked) {
                        buttonStyle =
                          'bg-rose-50 border-rose-600 text-rose-900 shadow-none';
                      } else {
                        buttonStyle =
                          'bg-slate-50 border-slate-200 text-slate-400 shadow-none';
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={isSubAnswered}
                        onClick={() => handleSelectSub(option)}
                        className={`flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 font-bold text-sm sm:text-base text-left transition-all duration-150 min-h-[52px] ${
                          isSubAnswered ? 'cursor-default' : 'cursor-pointer'
                        } ${buttonStyle} focus-visible:outline-2 focus-visible:outline-[#2541FF]`}
                      >
                        <span className="truncate">{option}</span>
                        {isSubAnswered && isCorrectOption && (
                          <CheckCircle2
                            className="w-5 h-5 text-emerald-600 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        {isSubAnswered && isPicked && !isCorrectOption && (
                          <XCircle
                            className="w-5 h-5 text-rose-600 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Special Weapon Section */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className="font-display font-black text-lg text-[#141829]">
                    스페셜 웨폰
                  </h3>
                  {isSpecialAnswered && (
                    <span
                      className={`inline-flex items-center gap-1 text-xs sm:text-sm font-bold ${
                        selectedSpecial === weapon.special
                          ? 'text-emerald-700'
                          : 'text-rose-700'
                      }`}
                    >
                      {selectedSpecial === weapon.special ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          <span>정답!</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4" aria-hidden="true" />
                          <span>정답: {weapon.special}</span>
                        </>
                      )}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {specialOptions.map((option) => {
                    const isCorrectOption = option === weapon.special;
                    const isPicked = selectedSpecial === option;

                    let buttonStyle =
                      'bg-white border-[#141829] text-[#141829] hover:bg-blue-50 shadow-[0_3px_0_#141829]';

                    if (isSpecialAnswered) {
                      if (isCorrectOption) {
                        buttonStyle =
                          'bg-emerald-50 border-emerald-600 text-emerald-900 shadow-none';
                      } else if (isPicked) {
                        buttonStyle =
                          'bg-rose-50 border-rose-600 text-rose-900 shadow-none';
                      } else {
                        buttonStyle =
                          'bg-slate-50 border-slate-200 text-slate-400 shadow-none';
                      }
                    }

                    return (
                      <button
                        key={option}
                        type="button"
                        disabled={isSpecialAnswered}
                        onClick={() => handleSelectSpecial(option)}
                        className={`flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 font-bold text-sm sm:text-base text-left transition-all duration-150 min-h-[52px] ${
                          isSpecialAnswered ? 'cursor-default' : 'cursor-pointer'
                        } ${buttonStyle} focus-visible:outline-2 focus-visible:outline-[#2541FF]`}
                      >
                        <span className="truncate">{option}</span>
                        {isSpecialAnswered && isCorrectOption && (
                          <CheckCircle2
                            className="w-5 h-5 text-emerald-600 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                        {isSpecialAnswered && isPicked && !isCorrectOption && (
                          <XCircle
                            className="w-5 h-5 text-rose-600 shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-3">
              {!isQuestionComplete ? (
                <>
                  <span className="text-xs sm:text-sm text-slate-500 font-medium">
                    서브와 스페셜을 각각 선택해 주세요
                  </span>
                  <button
                    type="button"
                    onClick={handleRevealAnswers}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#141829] px-3 py-2 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>정답 바로 보기</span>
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-arcade w-full inline-flex items-center justify-center gap-2 bg-[#C8F600] hover:bg-[#d2ff1a] text-[#141829] font-display font-black text-lg px-6 py-3.5 rounded-2xl min-h-[52px] whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
                >
                  <span>
                    {currentIndex + 1 >= questions.length
                      ? '결과 보기'
                      : '다음 문제'}
                  </span>
                  <ArrowRight className="w-5 h-5" aria-hidden="true" />
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
