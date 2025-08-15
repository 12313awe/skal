'use client';

import { Lightbulb } from 'lucide-react';
import React from 'react';

interface AnimatedThinkButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  isActive?: boolean;
}

export function AnimatedThinkButton({ 
  onClick, 
  disabled = false, 
  children = "Think",
  className = "",
  isActive = false
}: AnimatedThinkButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative cursor-pointer p-2 w-32 border rounded-full overflow-hidden text-center font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
        isActive 
          ? 'bg-yellow-400 text-black border-yellow-500' 
          : 'bg-white text-black border-gray-300'
      } ${className}`}
    >
      <span className='translate-y-0 group-hover:-translate-y-12 group-hover:opacity-0 transition-all duration-300 inline-block flex items-center justify-center gap-2'>
        <Lightbulb className="h-4 w-4" />
        {children}
      </span>
      <div className={`flex gap-2 text-white z-10 items-center absolute left-0 top-0 h-full w-full justify-center translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 rounded-full group-hover:rounded-none ${
        isActive ? 'bg-yellow-500' : 'bg-green-400'
      }`}>
        <Lightbulb className="h-4 w-4" />
        <span>{children}</span>
      </div>
    </button>
  );
}