"use client";

import { MOCK_CURRENCY_BALANCES } from '@/lib/mock-data';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Wallet, PlusCircle, UserPlus, Sparkles, ArrowUpRight, ArrowDownLeft, ChevronLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BottomNav } from '@/components/layout/BottomNav';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';

export default function DashboardPage() {
  const [isAddingAccount, setIsAddingAccount] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16 overflow-x-hidden">
      <header className="p-4 gradient-primary text-primary-foreground shadow-md rounded-b-[24px] relative">
        <div className="flex justify-between items-center mb-4 relative z-10">
          <div className="space-y-0.5">
            <h1 className="text-base font-black tracking-tight">دفتر برو</h1>
            <p className="text-white/70 text-[8px] font-medium">إدارة مالية ذكية</p>
          </div>
          <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg flex items-center justify-center">
            <Wallet className="h-4 w-4" />
          </div>
        </div>
        
        <div className="relative z-10 space-y-2">
          <p className="text-[9px] font-bold opacity-80 flex items-center gap-1">
             <Sparkles className="h-2.5 w-2.5 text-accent" />
             إجمالي الأرصدة الحالية
          </p>
          <div className="grid grid-cols-3 gap-1.5">
            {MOCK_CURRENCY_BALANCES.map((bal) => (
              <div key={bal.currency} className="bg-white/10 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
                <div className="flex justify-between items-start mb-0.5">
                   <p className="text-[7px] font-black bg-white/20 px-1 py-0.5 rounded-sm">{bal.currency}</p>
                   {bal.net >= 0 ? <ArrowUpRight className="h-2 w-2 text-green-300" /> : <ArrowDownLeft className="h-2 w-2 text-red-300" />}
                </div>
                <p className={cn("text-xs font-black leading-none", bal.net >= 0 ? "text-green-300" : "text-red-300")}>
                  {Math.abs(bal.net).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="p-3 space-y-3">
        <section className="grid grid-cols-2 gap-2">
          <Button onClick={() => setIsAddingAccount(true)} className="h-14 gradient-accent rounded-xl flex flex-col gap-0.5 shadow-sm border-none">
            <UserPlus className="h-3.5 w-3.5" />
            <span className="font-bold text-[9px]">حساب جديد</span>
          </Button>
          <Button asChild className="h-14 gradient-primary rounded-xl flex flex-col gap-0.5 shadow-sm border-none">
            <Link href="/accounts">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="font-bold text-[9px]">إضافة حركة</span>
            </Link>
          </Button>
        </section>

        <section className="space-y-2">
          <div className="flex justify-between items-center px-1">
            <h2 className="text-xs font-black text-slate-800">الملخص المالي</h2>
            <Link href="/reports" className="text-primary text-[9px] font-black flex items-center gap-0.5">التقارير <ChevronLeft className="h-2 w-2" /></Link>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Card className="border-none shadow-soft rounded-xl bg-white p-2.5 flex flex-col gap-1">
              <TrendingUp className="h-3.5 w-3.5 text-leh" />
              <p className="text-[8px] font-bold text-slate-400">إجمالي (لك)</p>
              <p className="text-sm font-black text-leh">165,000</p>
            </Card>
            <Card className="border-none shadow-soft rounded-xl bg-white p-2.5 flex flex-col gap-1">
              <TrendingDown className="h-3.5 w-3.5 text-alaih" />
              <p className="text-[8px] font-bold text-slate-400">إجمالي (عليك)</p>
              <p className="text-sm font-black text-alaih">121,250</p>
            </Card>
          </div>
        </section>
      </main>

      <Button 
        onClick={() => setIsAddingAccount(true)}
        className="fixed bottom-20 left-4 w-12 h-12 rounded-full gradient-primary text-white shadow-lg flex items-center justify-center active:scale-90 transition-all z-40"
      >
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
        <DialogContent className="max-w-[92%] rounded-[20px] p-4">
          <DialogHeader>
            <DialogTitle className="text-right text-sm font-black">إضافة حساب جديد</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1">
              <Label className="text-slate-500 font-bold text-[9px]">الاسم الكامل</Label>
              <Input placeholder="أحمد محمد" className="h-9 rounded-lg text-xs bg-slate-50 border-none" />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-500 font-bold text-[9px]">رقم الجوال</Label>
              <Input placeholder="777XXXXXX" className="h-9 rounded-lg text-xs bg-slate-50 border-none" />
            </div>
            <div className="space-y-1">
              <Label className="text-primary font-bold text-[9px]">العملة الأساسية (تحدد مرة واحدة)</Label>
              <Select defaultValue="YER">
                <SelectTrigger className="h-9 rounded-lg bg-primary/5 font-bold text-xs">
                  <SelectValue placeholder="اختر العملة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YER">ريال يمني (YER)</SelectItem>
                  <SelectItem value="SAR">ريال سعودي (SAR)</SelectItem>
                  <SelectItem value="USD">دولار أمريكي (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button className="w-full h-10 rounded-lg gradient-primary font-black text-xs" onClick={() => {
              setIsAddingAccount(false);
              toast({ title: "تم الحفظ", description: "تمت إضافة الحساب بنجاح" });
            }}>حفظ الحساب</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}