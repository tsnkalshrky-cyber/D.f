import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Wallet, ShieldCheck, Zap, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F5F8FB] overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-[35%] bg-primary rounded-b-[40px] -z-10 shadow-lg" />
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center space-y-6">
        <div className="space-y-3 pt-4">
          <div className="w-16 h-16 bg-white rounded-[24px] shadow-2xl mx-auto flex items-center justify-center relative group active:scale-95 transition-transform">
             <Wallet className="h-8 w-8 text-primary" />
             <div className="absolute -top-1 -right-1 bg-accent text-white p-1 rounded-lg shadow-lg border-2 border-white">
                <Sparkles className="h-3 w-3" />
             </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-black text-white font-headline tracking-tight">دفتر الحسابات</h1>
            <h2 className="text-base font-bold text-white/90">المحترف - Daftar Pro</h2>
          </div>
        </div>

        <div className="w-full max-w-[300px] bg-white/95 backdrop-blur-md p-5 rounded-[30px] shadow-2xl border border-white/50 space-y-5">
          <p className="text-slate-600 text-xs leading-relaxed font-medium">
            أدر حساباتك، ديونك، وعملائك بدقة احترافية مع دعم كامل للعملات والذكاء الاصطناعي.
          </p>
          
          <div className="grid grid-cols-2 gap-2">
             <div className="flex flex-col items-center gap-1 p-2 bg-primary/5 rounded-xl">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span className="text-[9px] font-bold text-slate-700">أمان عالي</span>
             </div>
             <div className="flex flex-col items-center gap-1 p-2 bg-accent/5 rounded-xl">
                <Zap className="h-4 w-4 text-accent" />
                <span className="text-[9px] font-bold text-slate-700">إدخال سريع</span>
             </div>
          </div>

          <div className="space-y-2 pt-1">
            <Button asChild className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg border-none transition-all active:scale-95 text-sm">
              <Link href="/dashboard">ابدأ الآن</Link>
            </Button>
            <Button variant="ghost" className="w-full h-9 text-slate-500 text-xs font-medium">إنشاء حساب جديد</Button>
          </div>
        </div>

        <div className="text-slate-400 text-[9px] font-medium pt-2">
          <p>© 2024 Daftar Pro. جميع الحقوق محفوظة</p>
        </div>
      </main>
    </div>
  );
}