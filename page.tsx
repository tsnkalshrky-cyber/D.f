
"use client";

import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Search, Archive, Calendar, Filter, History, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function ArchivePage() {
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <header className="p-6 bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
              <ArrowRight className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold font-headline">الأرشيف</h1>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full"><History className="h-5 w-5" /></Button>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="البحث في العمليات المؤرشفة..." 
            className="pr-10 bg-slate-50 border-none rounded-xl h-11 focus-visible:ring-primary"
          />
        </div>
      </header>

      <main className="p-6 space-y-6">
        <div className="bg-primary/5 p-4 rounded-2xl flex items-center gap-3 border border-primary/10">
          <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <Archive className="h-5 w-5" />
          </div>
          <p className="text-xs leading-relaxed text-slate-600">هنا تظهر العمليات التي تمت تسويتها وأرشفتها للحفاظ على سجلاتك الحالية نظيفة ومنظمة.</p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <h2 className="text-sm font-bold text-muted-foreground">مارس ٢٠٢٤</h2>
             <Button variant="ghost" size="sm" className="h-7 text-[10px]"><Filter className="h-3 w-3 ml-1" /> تصفية</Button>
          </div>

          <div className="space-y-3">
            {MOCK_TRANSACTIONS.map((t, i) => (
              <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-border/50 flex justify-between items-center opacity-70">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center font-bold text-slate-400">
                    {t.note[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{t.note}</p>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {t.date}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn("font-bold text-sm", t.type === 'leh' ? "text-leh" : "text-alaih")}>
                    {t.amount.toLocaleString()}
                  </p>
                  <p className="text-[10px] text-muted-foreground uppercase">{t.currency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
