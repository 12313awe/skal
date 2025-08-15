'use client';

import { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { ThinkButton } from './think-button';

export function FloatingActionButton() {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="absolute top-[-50px] left-2 z-20">
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => setShowButtons(!showButtons)}
          className="p-2 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 shadow-xl transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-400 focus:outline-none active:scale-100 active:shadow-xl"
          title={showButtons ? "Butonları gizle" : "Butonları göster"}
        >
          {showButtons ? (
            <ChevronDown className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          ) : (
            <ChevronUp className="h-4 w-4 text-gray-700 dark:text-gray-300" />
          )}
        </button>

        {/* Animated Buttons - Right Side */}
        <div className={`flex items-center gap-2 ml-2 transition-all duration-300 ${showButtons ? 'opacity-100 visible translate-x-0' : 'opacity-0 invisible -translate-x-2'}`}>
          <ThinkButton />
        </div>
      </div>
    </div>
  );
}
