'use client';

import { useState, useRef, useEffect } from 'react';

import { Send, Brain, X, Info } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { motion, AnimatePresence } from 'framer-motion';

export function ChatInput({ className }: any) {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [showThinkTooltip, setShowThinkTooltip] = useState(false);
  const { sendMessage, isResponding, language } = useChatStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const texts = {
    tr: {
      placeholder: 'Herhangi bir şey sor...',
      disclaimer: 'SkalGPT hata yapabilir. Önemli bilgileri doğrulamayı unutmayın.',
      thinkMode: 'Düşünme Modu',
      thinkTooltipTitle: 'Düşünme Modu Avantajları',
      thinkAdvantages: [
        'Daha iyi çok adımlı muhakeme',
        'Karmaşık problemlerde yüksek doğruluk',
        'Uzun vadeli tutarlılık',
        'Yanıt kalitesinde artış'
      ]
    },
    en: {
      placeholder: 'Ask anything...',
      disclaimer: 'SkalGPT can make mistakes. Remember to verify important information.',
      thinkMode: 'Think Mode',
      thinkTooltipTitle: 'Think Mode Advantages',
      thinkAdvantages: [
        'Better multi-step reasoning',
        'Higher accuracy in complex problems',
        'Long-term consistency',
        'Improved response quality'
      ]
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isResponding) return;


    const messageText = message.trim();
    console.groupCollapsed('[UI] Normal Gönderim');
    console.log('timestamp', new Date().toISOString());
    console.log('payload', { messageLength: messageText.length, isResponding, thinkMode: false });
    console.groupEnd();
    await sendMessage(messageText, router);
    setMessage('');
    setShowThinkTooltip(false);
  };

  const handleThinkSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isResponding) return;

    const messageText = message.trim();
    console.groupCollapsed('[UI] Düşünme Modu Gönderimi');
    console.log('timestamp', new Date().toISOString());
    console.log('payload', { messageLength: messageText.length, isResponding, thinkMode: true });
    console.groupEnd();
    await sendMessage(messageText, router, true); // true indicates think mode
    setMessage('');
    setShowThinkTooltip(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
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
        <div className="max-w-4xl mx-auto">
          <div className="p-3 sm:p-4 bg-card border border-border rounded-2xl shadow-sm">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3 relative">
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

              {/* Think Mode Button */}
              <div className="relative">
                <Button
                  type="button"
                  onClick={() => {
                    const next = !showThinkTooltip;
                    console.groupCollapsed('[UI] Düşünme Modu Paneli Toggle');
                    console.log('timestamp', new Date().toISOString());
                    console.log('action', next ? 'open' : 'close');
                    console.log('messagePresent', !!message.trim());
                    console.groupEnd();
                    setShowThinkTooltip(next);
                  }}
                  disabled={!message.trim() || isResponding}
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white border-0 flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-sm"
                  size="icon"
                >
                  <Brain className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
              
              {/* Send Button */}
              <div>
                <Button
                  type="submit"
                  disabled={!message.trim() || isResponding}
                  className="bg-gradient-to-r from-[#F3904F] to-[#3B4371] hover:from-[#3B4371] hover:to-[#F3904F] text-primary-foreground border-0 flex-shrink-0 h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-sm"
                  size="icon"
                >
                  <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </div>
            </form>
            {/* Think Mode Collapsible Panel */}
            <AnimatePresence>
              {showThinkTooltip && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 w-full bg-card border border-border rounded-xl shadow-inner p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                      <Brain className="h-4 w-4 text-purple-500" />
                      {texts[language].thinkTooltipTitle}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowThinkTooltip(false)}
                      className="h-6 w-6 rounded-full"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {texts[language].thinkAdvantages.map((advantage, index) => (
                      <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0" />
                        {advantage}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={handleThinkSubmit}
                    disabled={!message.trim() || isResponding}
                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white text-xs"
                    size="sm"
                  >
                    <Brain className="h-3 w-3 mr-2" />
                    {texts[language].thinkMode}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
