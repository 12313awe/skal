'use client';

import { useState, useRef, useEffect } from 'react';

import { Send } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { FloatingActionButton } from './floating-action-button';

export function ChatInput({ className }: any) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const { sendMessage, sendThinkMessage, isResponding, language, thinkModeEnabled } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const texts = {
    tr: {
      placeholder: 'Herhangi bir şey sor...',
      disclaimer: 'SkalGPT hata yapabilir. Önemli bilgileri doğrulamayı unutmayın.',
      searchComingSoon: 'Web arama özelliği yakında eklenecek!',
      imageComingSoon: 'Görüntü oluşturma özelliği yakında eklenecek!'
    },
    en: {
      placeholder: 'Ask anything...',
      disclaimer: 'SkalGPT can make mistakes. Remember to verify important information.',
      searchComingSoon: 'Web search feature coming soon!',
      imageComingSoon: 'Image generation feature coming soon!'
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isResponding) return;


    const messageText = message.trim();
    if (thinkModeEnabled) {
      await sendThinkMessage(messageText, router);
    } else {
      await sendMessage(messageText, router);
    }
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleComingSoon = (message: string) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  return (
    <div className="flex-shrink-0">
      <div className="p-3 sm:p-6">
        <div className="max-w-4xl mx-auto relative">
          <div className="p-3 sm:p-4 bg-card border border-border rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textareaRef}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={texts[language].placeholder}
                  className="min-h-[40px] sm:min-h-[48px] max-h-32 resize-none bg-background border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 text-sm sm:text-base cursor-text dark:bg-background dark:border-border dark:text-foreground dark:placeholder:text-muted-foreground"
                  disabled={isResponding}
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!message.trim() || isResponding}
                className='group relative cursor-pointer p-2 w-20 h-9 sm:w-24 sm:h-10 border bg-white dark:bg-gray-800 rounded-full overflow-hidden text-black dark:text-white text-center font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed'
                title="Mesajı gönder"
              >
                <span className='translate-x-1 group-hover:translate-x-8 group-hover:opacity-0 transition-all duration-300 inline-block flex items-center justify-center h-full'>
                  <Send className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 dark:text-gray-300" />
                </span>
                <div className='flex gap-1 text-white z-10 items-center absolute top-0 h-full w-full justify-center translate-x-8 opacity-0 group-hover:-translate-x-1 group-hover:opacity-100 transition-all duration-300'>
                  <span className="text-xs">Gönder</span>
                  <Send className="h-2 w-2 sm:h-3 sm:w-3" />
                </div>
                <div className='absolute top-[40%] left-[20%] h-1.5 w-1.5 group-hover:h-full group-hover:w-full rounded-lg bg-black scale-[1] dark:group-hover:bg-[#e7cb6e] group-hover:bg-[#263381] group-hover:scale-[1.8] transition-all duration-300 group-hover:top-[0%] group-hover:left-[0%]'></div>
              </button>
            </form>
          </div>

          {/* Floating Action Button */}
          <FloatingActionButton />

          {/* Notification */}
          {showNotification && (
            <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg text-sm animate-in slide-in-from-bottom-2 duration-300">
              {notificationMessage}
            </div>
          )}

          {/* Disclaimer */}
          <div className="text-center mt-2 sm:mt-3">
            <p className="text-xs text-muted-foreground px-4 sm:px-0">
              {texts[language].disclaimer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

