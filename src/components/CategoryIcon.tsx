import type { WeaponCategory } from '../data/weapons';

interface CategoryIconProps {
  category: WeaponCategory;
  className?: string;
}

export function CategoryIcon({ category, className = 'w-6 h-6' }: CategoryIconProps) {
  switch (category) {
    case '슈터':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M3 10h13l3-2v5l-3-2H3z" />
          <path d="M7 11v6l-2 2" />
          <path d="M11 11v3" />
          <circle cx="8" cy="6.5" r="1.5" />
        </svg>
      );
    case '롤러':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="4" y="4" width="16" height="5" rx="2" />
          <path d="M20 6.5h1a1 1 0 0 1 1 1V11a2 2 0 0 1-2 2h-8v7" />
        </svg>
      );
    case '차저':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M2 12h18" />
          <path d="M20 10v4" />
          <path d="M7 9h6v3H7z" />
          <path d="M5 12v5l-2 2" />
        </svg>
      );
    case '버킷':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M5 8h14l-2 11H7L5 8z" />
          <path d="M4 8c0-2.5 3.6-4 8-4s8 1.5 8 4" />
          <path d="M9 12c1.5 1 4.5 1 6 0" />
        </svg>
      );
    case '스피너':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M3 9h10v6H3z" />
          <path d="M13 10h8" />
          <path d="M13 12h9" />
          <path d="M13 14h8" />
          <path d="M6 15v4" />
        </svg>
      );
    case '머누버':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M3 8h8l2 2H3z" />
          <path d="M5 10v4" />
          <path d="M11 14h8l2 2h-10z" />
          <path d="M13 16v4" />
        </svg>
      );
    case '셸터':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M12 4a8 8 0 0 1 8 8H4a8 8 0 0 1 8-8z" />
          <path d="M12 12v7a2 2 0 0 1-4 0" />
        </svg>
      );
    case '블래스터':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M3 10h11l4-2v8l-4-2H3z" />
          <path d="M7 14v5" />
          <circle cx="20.5" cy="12" r="1.5" />
        </svg>
      );
    case '활':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M7 4c6 2 9 5.5 9 8s-3 6-9 8" />
          <path d="M7 4v16" />
          <path d="M5 12h15" />
          <path d="M17 9l3 3-3 3" />
        </svg>
      );
    case '붓':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M18 3l3 3-9 9-3-3 9-9z" />
          <path d="M9 12c-2 0-4 1.5-4 4 0 1.5-1.5 2.5-2 3 2.5.5 6-.5 7.5-2.5.5-.8.8-1.8.5-2.5" />
        </svg>
      );
    case '와이퍼':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M5 19l14-14" />
          <path d="M13 5l6 0 0 6" />
          <path d="M3 17l4 4" />
        </svg>
      );
  }
}

export function InkEmblem({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} aria-hidden="true">
      <path
        d="M42 6c5.5 0 8.5 6 13.5 7.5 4.8 1.4 11-2 14.5 2 3.4 3.8-.8 9.8.8 14.6 1.5 4.7 8.2 6.8 8.2 12.4 0 5.4-6.4 8-8.2 12.6-1.8 4.6 1.6 11-2.5 14.4-4 3.4-10.2-.4-14.8 1.5-4.5 1.9-6.6 8-12.5 8-5.8 0-8.4-5.9-13.2-7.5-4.8-1.6-11 2-14.4-2-3.4-4 .7-10-.8-14.8C11 50 4.5 47.6 4.5 42c0-5.5 6.4-7.8 8.2-12.6 1.8-4.7-1.6-11 2.5-14.5 4.1-3.5 10.3.6 14.8-1.4C34.5 11.5 36.6 6 42 6z"
        fill="#C8F600"
        stroke="#141829"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="36" r="4.5" fill="#141829" />
      <circle cx="49" cy="36" r="4.5" fill="#141829" />
      <path
        d="M32 48c2.2 3.2 13.8 3.2 16 0"
        stroke="#141829"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="67" cy="13" r="4" fill="#2541FF" stroke="#141829" strokeWidth="2.5" />
      <circle cx="13" cy="65" r="3.5" fill="#FF4D2E" stroke="#141829" strokeWidth="2.5" />
    </svg>
  );
}
