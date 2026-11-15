import { Play } from 'lucide-react';
import { InkEmblem } from './CategoryIcon';

interface TitleScreenProps {
  onStart: () => void;
  totalWeapons: number;
  totalCategories: number;
}

export function TitleScreen({
  onStart,
  totalWeapons,
  totalCategories,
}: TitleScreenProps) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-2xl card-arcade rounded-3xl px-6 py-12 sm:px-12 sm:py-16 text-center">
        <div className="flex justify-center mb-6">
          <InkEmblem className="w-20 h-20 sm:w-24 sm:h-24" />
        </div>

        <p className="text-sm sm:text-base font-bold text-[#2541FF] tracking-tight mb-3">
          스플래툰 3 무기 암기 트레이닝
        </p>

        <h1
          className="font-display font-black text-[#141829] tracking-tight leading-tight mb-5"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 3.75rem)',
            textWrap: 'balance',
          }}
        >
          무기 서브&amp;스페셜 퀴즈
        </h1>

        <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-slate-600 font-medium mb-10 tabular-nums">
          <span>{totalCategories}개 무기 종류</span>
          <span aria-hidden="true">·</span>
          <span>총 {totalWeapons}종 무기 수록</span>
        </div>

        <button
          type="button"
          onClick={onStart}
          className="btn-arcade inline-flex items-center justify-center gap-3 bg-[#C8F600] hover:bg-[#d2ff1a] text-[#141829] font-display font-black text-xl sm:text-2xl px-10 py-4 rounded-2xl min-h-[56px] whitespace-nowrap cursor-pointer focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[#2541FF]"
        >
          <Play className="w-6 h-6 fill-current" aria-hidden="true" />
          <span>시작하기</span>
        </button>
      </div>
    </main>
  );
}
