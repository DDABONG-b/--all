import { AlertCircle, Check, ArrowLeft, Zap } from 'lucide-react';
import {
  WEAPON_CATEGORIES,
  type WeaponCategory,
} from '../data/weapons';
import { CategoryIcon } from './CategoryIcon';

interface ScopeSelectScreenProps {
  selectedCategories: Set<WeaponCategory>;
  categoryCounts: Record<WeaponCategory, number>;
  onToggleCategory: (category: WeaponCategory) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onStartQuiz: () => void;
  onBackToTitle: () => void;
}

export function ScopeSelectScreen({
  selectedCategories,
  categoryCounts,
  onToggleCategory,
  onSelectAll,
  onDeselectAll,
  onStartQuiz,
  onBackToTitle,
}: ScopeSelectScreenProps) {
  const selectedCount = selectedCategories.size;
  const totalSelectedWeapons = WEAPON_CATEGORIES.reduce(
    (sum, cat) => (selectedCategories.has(cat) ? sum + categoryCounts[cat] : sum),
    0
  );
  const isZeroSelected = selectedCount === 0;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-4xl card-arcade rounded-3xl p-5 sm:p-8 lg:p-10">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            type="button"
            onClick={onBackToTitle}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 hover:text-[#141829] transition-colors py-2 px-3 rounded-lg hover:bg-slate-100 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>타이틀로</span>
          </button>

          <div className="text-xs sm:text-sm font-semibold text-slate-500 tabular-nums">
            <span>{selectedCount}개 종류 선택됨</span>
            <span className="mx-1.5" aria-hidden="true">·</span>
            <span>총 {totalSelectedWeapons}문제</span>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-8">
          <h1
            className="font-display font-black text-2xl sm:text-3xl lg:text-4xl text-[#141829] tracking-tight"
            style={{ textWrap: 'balance' }}
          >
            출제 범위를 선택하세요
          </h1>
        </div>

        {/* Select All / Deselect All Controls directly above category grid */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onSelectAll}
              className="btn-arcade bg-white hover:bg-slate-50 text-[#141829] font-bold text-sm px-4 py-2 rounded-xl min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
            >
              모두 선택
            </button>
            <button
              type="button"
              onClick={onDeselectAll}
              className="btn-arcade bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm px-4 py-2 rounded-xl min-h-[40px] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#2541FF]"
            >
              모두 해제
            </button>
          </div>

          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            원하는 무기군을 눌러 선택/해제하세요
          </span>
        </div>

        {/* 11 Weapon Categories in 3-4 Column Grid */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
          role="group"
          aria-label="무기 종류 선택"
        >
          {WEAPON_CATEGORIES.map((category) => {
            const isSelected = selectedCategories.has(category);
            const count = categoryCounts[category];

            return (
              <button
                key={category}
                type="button"
                aria-pressed={isSelected}
                onClick={() => onToggleCategory(category)}
                className={`relative flex items-center justify-between gap-3 px-4 py-3.5 sm:py-4 rounded-2xl border-2 text-left transition-all duration-150 min-h-[64px] cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[#2541FF] ${
                  isSelected
                    ? 'bg-[#2541FF] border-[#141829] text-white shadow-[0_4px_0_#141829] -translate-y-0.5'
                    : 'bg-slate-50 border-slate-300 text-slate-500 hover:border-slate-400 hover:bg-slate-100 shadow-none translate-y-0'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-[#C8F600]'
                        : 'bg-slate-200/80 text-slate-400'
                    }`}
                  >
                    <CategoryIcon category={category} className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <div
                      className={`font-bold text-base sm:text-lg leading-tight truncate ${
                        isSelected ? 'text-white' : 'text-slate-600'
                      }`}
                    >
                      {category}
                    </div>
                    <div
                      className={`text-xs font-medium tabular-nums mt-0.5 ${
                        isSelected ? 'text-blue-100' : 'text-slate-400'
                      }`}
                    >
                      {count}종
                    </div>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border-2 transition-colors ${
                    isSelected
                      ? 'bg-[#C8F600] border-[#141829] text-[#141829]'
                      : 'bg-white border-slate-300 text-transparent'
                  }`}
                  aria-hidden="true"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Ready? GO! CTA & Validation Message */}
        <div className="flex flex-col items-center gap-3 pt-2">
          {isZeroSelected && (
            <div
              role="alert"
              className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[#D9381E]"
            >
              <AlertCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
              <span>최소 1개 이상 선택해주세요</span>
            </div>
          )}

          <button
            type="button"
            disabled={isZeroSelected}
            onClick={onStartQuiz}
            className={`btn-arcade w-full sm:w-auto sm:min-w-[320px] inline-flex items-center justify-center gap-2.5 font-display font-black text-xl sm:text-2xl px-10 py-4 rounded-2xl min-h-[60px] whitespace-nowrap focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#2541FF] ${
              isZeroSelected
                ? 'bg-slate-200 border-slate-300 text-slate-400'
                : 'bg-[#C8F600] hover:bg-[#d2ff1a] text-[#141829] cursor-pointer'
            }`}
          >
            <Zap className="w-6 h-6 fill-current" aria-hidden="true" />
            <span>Ready? GO!</span>
          </button>
        </div>
      </div>
    </main>
  );
}
