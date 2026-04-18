import type { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'large';
}

export default function GlassCard({ children, className = '', variant = 'default' }: GlassCardProps) {
  const variantClasses = {
    default: 'bg-[rgba(248,250,249,0.72)] backdrop-blur-[20px] saturate-[180%] border border-white/30 shadow-[0_8px_32px_rgba(20,83,45,0.08)] rounded-xl p-6',
    large: 'bg-[rgba(248,250,249,0.8)] backdrop-blur-[24px] saturate-[200%] border border-[rgba(200,164,93,0.15)] shadow-[0_12px_48px_rgba(20,83,45,0.06)] rounded-[20px] p-10 md:p-16',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  );
}
