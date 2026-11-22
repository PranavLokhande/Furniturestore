// ============================================================
// WoodCraft India – Logo Component
// SVG wordmark with optional wood grain icon
// ============================================================
import React from 'react';
import { Link } from 'react-router-dom';

type LogoSize = 'sm' | 'md' | 'lg';

interface LogoProps {
  size?: LogoSize;
  className?: string;
}

const sizeConfig: Record<LogoSize, { icon: number; text: string; sub: string; gap: string }> = {
  sm: { icon: 28, text: 'text-lg',    sub: 'text-[8px]',  gap: 'gap-1.5' },
  md: { icon: 36, text: 'text-2xl',   sub: 'text-[9px]',  gap: 'gap-2'   },
  lg: { icon: 44, text: 'text-3xl',   sub: 'text-[11px]', gap: 'gap-2.5' },
};

const WoodGrainIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    {/* Outer shield shape */}
    <rect x="2" y="2" width="40" height="40" rx="6" fill="#252525" />
    {/* Wood grain lines */}
    <path d="M8 14 Q22 10 36 14" stroke="#F4C542" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M6 20 Q22 15 38 20" stroke="#F4C542" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M8 26 Q22 21 36 26" stroke="#F4C542" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M10 32 Q22 27 34 32" stroke="#F4C542" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* W letter */}
    <text x="10" y="37" fontFamily="Georgia, serif" fontWeight="700" fontSize="22" fill="#ffffff" letterSpacing="-1">W</text>
  </svg>
);

const Logo: React.FC<LogoProps> = ({ size = 'md', className = '' }) => {
  const cfg = sizeConfig[size];

  return (
    <Link
      to="/"
      className={`inline-flex items-center ${cfg.gap} select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow rounded-sm ${className}`}
      aria-label="WoodCraft India – Home"
    >
      <WoodGrainIcon size={cfg.icon} />

      <div className="flex flex-col leading-none">
        <span
          className={`${cfg.text} font-bold tracking-tight text-brand-dark font-display`}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
        >
          WoodCraft
        </span>
        <span
          className={`${cfg.sub} font-semibold tracking-[0.2em] text-brand-muted uppercase`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          INDIA
        </span>
      </div>
    </Link>
  );
};

export { Logo };
export default Logo;
