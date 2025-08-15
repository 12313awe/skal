"use client";

import { useState } from 'react';
import { Lightbulb, CheckCircle2, Circle } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useChatStore } from '@/lib/store';

export function ThinkButton() {
  const [open, setOpen] = useState(false);
  const { thinkModeEnabled, setThinkModeEnabled, isResponding } = useChatStore();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          disabled={isResponding}
          className={`h-9 w-9 sm:h-10 sm:w-10 rounded-xl shadow-sm flex items-center justify-center transition-all duration-200 ${
            thinkModeEnabled
              ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500 ring-2 ring-yellow-300/60 shadow-yellow-300/50'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label="Think Modu"
          title={thinkModeEnabled ? 'Think modu aktif' : 'Think modu kapalı'}
        >
          <Lightbulb className={`h-4 w-4 ${thinkModeEnabled ? 'drop-shadow-[0_0_6px_rgba(250,204,21,0.8)]' : ''}`} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg rounded-2xl">
        <DialogHeader>
          <div className="flex items-start gap-3">
            <div className={`mt-1 inline-flex h-8 w-8 items-center justify-center rounded-lg ${thinkModeEnabled ? 'bg-yellow-400 text-gray-900' : 'bg-muted text-foreground'}`}>
              <Lightbulb className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <DialogTitle className="leading-tight">Think Modu</DialogTitle>
              <DialogDescription>
                Zorlu sorularda ek iç düşünme yaparak daha isabetli sonuçlar üretir. Mesaj gönderilirken model dinamik düşünme bütçesi kullanır.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-2 space-y-4 text-sm">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <li className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Çok adımlı muhakeme
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Karmaşık görevlerde doğruluk
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Tutarlı uzun yanıtlar
            </li>
            <li className="flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Daha iyi kalite
            </li>
          </ul>

          <div className="mt-2 flex items-center justify-between rounded-xl border border-border p-3 bg-card/50">
            <div>
              <div className="text-sm font-medium">Mod Durumu</div>
              <div className="text-xs text-muted-foreground">{thinkModeEnabled ? 'Aktif (dinamik bütçe -1)' : 'Kapalı'}</div>
            </div>
            <Button
              type="button"
              aria-pressed={thinkModeEnabled}
              variant={thinkModeEnabled ? 'default' : 'secondary'}
              onClick={() => setThinkModeEnabled(!thinkModeEnabled)}
              className={thinkModeEnabled ? 'bg-yellow-400 text-gray-900 hover:bg-yellow-500' : ''}
            >
              {thinkModeEnabled ? 'Kapat' : 'Aktifleştir'}
            </Button>
          </div>

          <div className="rounded-md bg-muted/40 p-3 text-xs text-muted-foreground">
            Not: Düşünme bütçesi kullanıcı tarafından seçilemez; her zaman otomatik/dinamik (-1) olarak ayarlanır.
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Kapat</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
