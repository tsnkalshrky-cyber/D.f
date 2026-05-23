"use client";

import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Cloud, Shield, Palette, Globe, Bell, ChevronLeft, LogOut, Image as ImageIcon, Type, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => { router.push('/'); };

  const sections = [
    { title: 'المحل', items: [{ icon: User, label: 'الاسم والتواصل' }, { icon: ImageIcon, label: 'الشعار (Logo)' }] },
    { title: 'الأمان', items: [{ icon: Shield, label: 'قفل التطبيق', toggle: true }, { icon: Cloud, label: 'نسخ احتياطي' }] }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <header className="p-4 bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full w-8 h-8">
            <ArrowRight className="h-5 w-5" />
          </Button>
          <h1 className="text-sm font-black">الإعدادات</h1>
        </div>
      </header>

      <main className="p-4 space-y-4">
        <div className="flex flex-col items-center py-2 space-y-2">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border-2 border-white shadow-md">
             <User className="h-8 w-8" />
          </div>
          <div className="text-center">
            <h2 className="text-sm font-bold">متجر التميز</h2>
            <p className="text-[9px] text-muted-foreground">alتميز-shop@gmail.com</p>
          </div>
        </div>

        {sections.map((section, idx) => (
          <div key={idx} className="space-y-2">
            <h3 className="text-[10px] font-bold text-muted-foreground px-1 uppercase">{section.title}</h3>
            <div className="bg-white rounded-xl shadow-soft border overflow-hidden">
              {section.items.map((item, iIdx) => (
                <div key={iIdx} className="flex items-center justify-between p-3 border-b last:border-none active:bg-slate-50">
                  <div className="flex items-center gap-2">
                    <item.icon className="h-4 w-4 text-slate-500" />
                    <span className="text-[11px] font-medium">{item.label}</span>
                  </div>
                  {item.toggle ? <Switch className="scale-75" /> : <ChevronLeft className="h-3 w-3 text-slate-300" />}
                </div>
              ))}
            </div>
          </div>
        ))}

        <Button variant="ghost" className="w-full h-10 rounded-xl text-destructive hover:bg-destructive/5 flex gap-2 font-bold text-xs" onClick={handleLogout}>
          <LogOut className="h-4 w-4" /> تسجيل الخروج
        </Button>
      </main>

      <BottomNav />
    </div>
  );
}