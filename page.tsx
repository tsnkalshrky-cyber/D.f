"use client";

import { useState } from 'react';
import { MOCK_ACCOUNTS } from '@/lib/mock-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, UserPlus, Trash2, AlertCircle, ArrowRight, Plus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/layout/BottomNav';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';

export default function AccountsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddingAccount, setIsAddingAccount] = useState(false);
  const [accounts, setAccounts] = useState(MOCK_ACCOUNTS);
  const [quickTransactionAccount, setQuickTransactionAccount] = useState<any>(null);
  
  const filteredAccounts = accounts.filter(acc => 
    acc.name.includes(searchQuery) || acc.phone?.includes(searchQuery)
  );

  const handleDeleteAccount = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
    toast({
      variant: "destructive",
      title: "تم حذف الحساب",
      description: "تمت إزالة الحساب بنجاح.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-16">
      <header className="p-3 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full w-8 h-8">
              <ArrowRight className="h-4 w-4" />
            </Button>
            <h1 className="text-sm font-black text-slate-800">الحسابات</h1>
          </div>
          <Dialog open={isAddingAccount} onOpenChange={setIsAddingAccount}>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-lg gradient-primary gap-1 h-8 px-2">
                <UserPlus className="h-3 w-3" />
                <span className="font-bold text-[10px]">جديد</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[92%] rounded-[20px] p-4">
              <DialogHeader>
                <DialogTitle className="text-right text-sm font-black">إضافة حساب جديد</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 py-1">
                <div className="space-y-1">
                  <Label className="text-slate-500 font-bold text-[9px]">اسم الحساب</Label>
                  <Input placeholder="أحمد محمد" className="rounded-lg h-9 bg-slate-50 border-none text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="text-slate-500 font-bold text-[9px]">رقم الجوال</Label>
                  <Input placeholder="777XXXXXX" className="rounded-lg h-9 bg-slate-50 border-none text-xs" />
                </div>
                <div className="space-y-1">
                  <Label className="text-primary font-black text-[9px]">العملة (ثابتة للحساب)</Label>
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
                  toast({ title: "تم الحفظ" });
                }}>حفظ الحساب</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground" />
          <Input 
            placeholder="بحث عن اسم أو رقم..." 
            className="pr-8 bg-slate-100 border-none rounded-lg h-8 text-[10px]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      <main className="flex-1 p-2">
        <Tabs defaultValue="all">
          <TabsList className="w-full grid grid-cols-4 h-8 bg-slate-100 p-0.5 rounded-lg mb-2">
            <TabsTrigger value="all" className="text-[8px] font-bold">الكل</TabsTrigger>
            <TabsTrigger value="customer" className="text-[8px] font-bold">عملاء</TabsTrigger>
            <TabsTrigger value="supplier" className="text-[8px] font-bold">موردين</TabsTrigger>
            <TabsTrigger value="general" className="text-[8px] font-bold">أخرى</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="space-y-2">
              {filteredAccounts.map((acc: any) => (
                <div key={acc.id} className="bg-white p-2.5 rounded-xl shadow-soft border border-transparent hover:border-primary/10 transition-all">
                  <Link href={`/accounts/${acc.id}`} className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center font-black text-white text-xs">
                        {acc.name[0]}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-black text-slate-800 text-[11px] leading-none">{acc.name}</p>
                        <Badge className="text-[7px] h-3 px-1 py-0 bg-primary/10 text-primary border-none">{acc.currency}</Badge>
                      </div>
                    </div>
                    <div className="text-left flex items-center gap-1">
                       <p className="text-leh font-black text-xs">15,000</p>
                       <ChevronLeft className="h-3 w-3 text-slate-300" />
                    </div>
                  </Link>
                  <div className="flex gap-1.5 pt-2 border-t border-slate-50">
                     <Button onClick={() => setQuickTransactionAccount(acc)} size="sm" className="flex-1 h-7 rounded-lg gradient-success text-white font-black text-[9px] gap-1">
                       <Plus className="h-2.5 w-2.5" /> إضافة عملية
                     </Button>
                     <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7 rounded-lg text-destructive bg-destructive/5">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="rounded-[20px] max-w-[90%] p-4">
                          <AlertDialogHeader className="space-y-2">
                            <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                              <AlertCircle className="h-5 w-5 text-destructive" />
                            </div>
                            <AlertDialogTitle className="text-destructive text-sm font-black text-center">حذف الحساب نهائياً</AlertDialogTitle>
                            <AlertDialogDescription className="text-center text-[10px] text-slate-600">سيتم مسح كافة البيانات لـ {acc.name}. هل أنت متأكد؟</AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter className="flex gap-2 mt-3">
                            <AlertDialogCancel className="flex-1 h-9 text-[10px] font-bold">إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteAccount(acc.id)} className="flex-1 h-9 rounded-lg gradient-destructive text-white font-bold text-[10px]">نعم، احذف</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!quickTransactionAccount} onOpenChange={(open) => !open && setQuickTransactionAccount(null)}>
        <DialogContent className="max-w-[92%] rounded-[20px] p-4">
          <DialogHeader>
            <DialogTitle className="text-right text-xs font-black">عملية سريعة لـ {quickTransactionAccount?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-1">
             <div className="flex gap-1 p-1 bg-slate-100 rounded-lg">
               <Button size="sm" className="flex-1 rounded-md h-7 text-[9px] font-black gradient-success">له (قبض)</Button>
               <Button size="sm" variant="ghost" className="flex-1 rounded-md h-7 text-[9px] font-bold">عليه (صرف)</Button>
             </div>
             <div className="space-y-1">
               <Label className="text-slate-500 font-bold text-[9px]">المبلغ ({quickTransactionAccount?.currency})</Label>
               <Input type="number" placeholder="0.00" className="h-9 text-lg font-black text-center rounded-lg bg-slate-50 border-none" />
             </div>
             <div className="space-y-1">
               <Label className="text-slate-500 font-bold text-[9px]">ملاحظة</Label>
               <Textarea placeholder="التفاصيل..." className="rounded-lg bg-slate-50 border-none text-[10px] h-14" />
             </div>
          </div>
          <DialogFooter className="flex gap-2">
             <Button variant="ghost" className="flex-1 h-9 text-[10px] font-bold" onClick={() => setQuickTransactionAccount(null)}>إلغاء</Button>
             <Button className="flex-1 h-9 rounded-lg gradient-primary font-black text-[10px]" onClick={() => {
               setQuickTransactionAccount(null);
               toast({ title: "تم الحفظ" });
             }}>حفظ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}