"use client";

import { use, useState } from 'react';
import { MOCK_ACCOUNTS, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Send, History, MoreHorizontal, Calendar as CalendarIcon, ArrowRight, Share2, Calculator, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { generateSmartReminder } from '@/ai/flows/smart-reminder-generator';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function AccountDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const account = MOCK_ACCOUNTS.find(a => a.id === id);
  const [transactions, setTransactions] = useState(MOCK_TRANSACTIONS.filter(t => t.accountId === id));
  
  const [reminderLoading, setReminderLoading] = useState(false);
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<any>(null);
  
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState<'leh' | 'alaih'>('leh');
  const [newNote, setNewNote] = useState('');
  const [newDate, setNewDate] = useState<Date>(new Date());

  if (!account) return <div className="p-10 text-center font-bold text-primary">الحساب غير موجود</div>;

  const handleShareAccount = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `حساب ${account.name}`,
          text: `تفاصيل الرصيد لـ ${account.name}: إجمالي له 45,000 (${account.currency})`,
          url: window.location.href,
        });
      } catch (err) { console.log(err); }
    } else {
      toast({ title: "المشاركة غير مدعومة" });
    }
  };

  const handleGenerateReminder = async () => {
    setReminderLoading(true);
    try {
      const res = await generateSmartReminder({
        customerName: account.name,
        amountDue: 5000,
        currency: account.currency,
        businessName: 'متجر التميز',
        contactInfo: '+967 777 000 000'
      });
      const url = `https://wa.me/${account.phone}?text=${encodeURIComponent(res.reminderMessage)}`;
      window.open(url, '_blank');
    } catch (e) {
      toast({ title: "خطأ", variant: "destructive" });
    } finally { setReminderLoading(false); }
  };

  const openAddDialog = (type: 'leh' | 'alaih') => {
    setNewType(type);
    setNewAmount('');
    setNewNote('');
    setNewDate(new Date());
    setEditingTransaction(null);
    setIsAddingTransaction(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <header className="gradient-primary p-4 text-primary-foreground shadow-md rounded-b-[24px] relative">
        <div className="flex justify-between items-center mb-4 relative z-10">
          <Button variant="ghost" size="icon" className="text-primary-foreground bg-white/10 rounded-lg w-8 h-8" onClick={() => router.back()}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div className="flex gap-1.5">
             <Button variant="ghost" size="icon" className="text-primary-foreground bg-white/10 rounded-lg w-8 h-8" onClick={handleShareAccount}><Share2 className="h-3.5 w-3.5" /></Button>
             <Button variant="ghost" size="icon" className="text-primary-foreground bg-white/10 rounded-lg w-8 h-8"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
          </div>
        </div>

        <div className="text-center relative z-10 mb-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-xl mx-auto flex items-center justify-center text-xl font-black text-white mb-2">
            {account.name[0]}
          </div>
          <h1 className="text-base font-black tracking-tight">{account.name}</h1>
          <div className="flex justify-center gap-1 mt-1">
            <Badge className="bg-white/10 text-white border-none rounded-md px-1.5 py-0 text-[8px] font-bold">{account.phone}</Badge>
            <Badge className="gradient-accent text-accent-foreground border-none font-black rounded-md px-1.5 py-0 text-[8px] uppercase">{account.currency}</Badge>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 relative z-10">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 text-center border border-white/10">
            <p className="text-[7px] font-bold opacity-80 mb-0.5 text-white">رصيد (له)</p>
            <p className="text-sm font-black text-green-300">45,000</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-2 text-center border border-white/10">
            <p className="text-[7px] font-bold opacity-80 mb-0.5 text-white">رصيد (عليه)</p>
            <p className="text-sm font-black text-red-300">12,000</p>
          </div>
        </div>
      </header>

      <main className="flex-1 p-3 space-y-4">
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-hide">
          <Button onClick={() => openAddDialog('leh')} className="rounded-xl h-9 gradient-success flex gap-1.5 flex-shrink-0 shadow-sm px-4 text-[10px] font-bold">
            <Plus className="h-3.5 w-3.5" /> قبض (له)
          </Button>
          <Button onClick={() => openAddDialog('alaih')} className="rounded-xl h-9 gradient-destructive flex gap-1.5 flex-shrink-0 shadow-sm px-4 text-[10px] font-bold">
            <Minus className="h-3.5 w-3.5" /> صرف (عليه)
          </Button>
          <Button onClick={handleGenerateReminder} disabled={reminderLoading} variant="outline" className="rounded-xl h-9 flex gap-1.5 flex-shrink-0 border-primary text-primary text-[10px] font-bold">
            <Send className="h-3.5 w-3.5" /> تذكير AI
          </Button>
        </div>

        <section className="space-y-2">
          <h2 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <History className="h-4 w-4 text-primary" /> سجل العمليات
          </h2>
          <div className="space-y-2">
            {transactions.map(t => (
              <div key={t.id} className="bg-white p-2.5 rounded-xl shadow-soft border border-transparent flex justify-between items-center active:scale-[0.98] transition-all">
                <div className="flex items-center gap-2">
                  <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center", t.type === 'leh' ? "bg-leh/10 text-leh" : "bg-alaih/10 text-alaih")}>
                    {t.type === 'leh' ? <Plus className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 text-[10px] leading-tight">{t.note}</p>
                    <p className="text-[8px] text-slate-400 mt-0.5">{t.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <p className={cn("font-black text-xs", t.type === 'leh' ? "text-leh" : "text-alaih")}>
                    {t.type === 'leh' ? '+' : '-'}{t.amount.toLocaleString()}
                  </p>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-primary bg-primary/5 rounded-md" onClick={() => {
                      setEditingTransaction(t);
                      setNewNote(t.note);
                      setNewDate(new Date(t.date));
                      setNewAmount(t.amount.toString());
                      setIsAddingTransaction(true);
                    }}><Pencil className="h-3 w-3" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive bg-destructive/5 rounded-md"><Trash2 className="h-3 w-3" /></Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-[20px] max-w-[85%] p-4">
                        <AlertDialogHeader className="space-y-2">
                          <AlertCircle className="h-10 w-10 text-destructive mx-auto" />
                          <AlertDialogTitle className="text-destructive text-sm font-black text-center">حذف العملية</AlertDialogTitle>
                          <AlertDialogDescription className="text-center text-[10px]">هل تريد حذف هذه العملية من سجلات الحساب؟</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex-row gap-2 mt-3">
                          <AlertDialogCancel className="flex-1 h-9 text-[10px] font-bold">إلغاء</AlertDialogCancel>
                          <AlertDialogAction className="flex-1 h-9 rounded-lg gradient-destructive text-white font-bold text-[10px]" onClick={() => {
                            setTransactions(transactions.filter(tr => tr.id !== t.id));
                            toast({ title: "تم الحذف", variant: "destructive" });
                          }}>حذف</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Button onClick={() => openAddDialog('leh')} className="fixed bottom-20 right-4 w-12 h-12 rounded-xl gradient-primary text-white shadow-lg flex items-center justify-center active:scale-90 transition-all z-40">
        <Plus className="h-6 w-6" />
      </Button>

      <Dialog open={isAddingTransaction} onOpenChange={setIsAddingTransaction}>
        <DialogContent className="max-w-[92%] rounded-[20px] p-4">
          <DialogHeader>
            <DialogTitle className="text-right text-sm font-black">
              {editingTransaction ? 'تعديل عملية' : `إضافة عملية ${newType === 'leh' ? 'له' : 'عليه'}`}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-1 text-center">
              <Label className="text-slate-500 font-bold text-[9px]">المبلغ المطلوب</Label>
              <Input type="number" className="h-11 text-xl font-black text-center rounded-lg bg-slate-50 border-none" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-slate-500 font-bold text-[9px]">التاريخ</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full h-9 justify-start text-right font-bold rounded-lg bg-slate-50 border-none text-[10px]">
                    <CalendarIcon className="ml-2 h-3.5 w-3.5 text-primary" />
                    {newDate ? format(newDate, "PPP", { locale: ar }) : "اختر التاريخ"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 rounded-xl" align="start">
                  <Calendar mode="single" selected={newDate} onSelect={(date) => date && setNewDate(date)} locale={ar} />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-1">
              <Label className="text-slate-500 font-bold text-[9px]">الملاحظات</Label>
              <Textarea placeholder="التفاصيل..." className="rounded-lg bg-slate-50 border-none text-[10px] h-16" value={newNote} onChange={(e) => setNewNote(e.target.value)} />
            </div>
          </div>
          <DialogFooter className="flex flex-row gap-2">
             <Button variant="ghost" className="flex-1 h-10 text-[10px] font-bold" onClick={() => setIsAddingTransaction(false)}>إلغاء</Button>
             <Button className="flex-1 h-10 rounded-lg gradient-primary font-black text-[10px]" onClick={() => {
               setIsAddingTransaction(false);
               toast({ title: editingTransaction ? "تم التعديل" : "تم الحفظ" });
             }}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}