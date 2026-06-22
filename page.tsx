
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/BottomNav';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { FileText, Sparkles, TrendingUp, Wallet, Download, Share2, ArrowRight } from 'lucide-react';
import { analyzeFinancialReport } from '@/ai/flows/financial-report-analyzer';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const DEBT_CHART_DATA = [
  { name: 'يناير', leh: 40000, alaih: 24000 },
  { name: 'فبراير', leh: 30000, alaih: 13980 },
  { name: 'مارس', leh: 20000, alaih: 98000 },
  { name: 'أبريل', leh: 27800, alaih: 39080 },
  { name: 'مايو', leh: 18900, alaih: 48000 },
];

const CURRENCY_DIST_DATA = [
  { name: 'YER', value: 75 },
  { name: 'SAR', value: 15 },
  { name: 'USD', value: 10 },
];

const COLORS = ['#5E9BCD', '#FFB600', '#339933', '#DF2626'];

export default function ReportsPage() {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeFinancialReport({
        businessName: 'متجر التميز',
        currencyBalances: [
          { currency: 'YER', totalCredit: 100000, totalDebit: 50000, netBalance: 50000 },
          { currency: 'USD', totalCredit: 500, totalDebit: 200, netBalance: 300 },
        ],
        monthlyDebtMovements: [
          { month: 'مارس', year: 2024, totalCredit: 20000, totalDebit: 98000, netChange: -78000 }
        ]
      });
      setAnalysisResult(result);
      toast({ title: "اكتمل التحليل", description: "تم استخراج التوصيات المالية" });
    } catch (e) {
      toast({ title: "خطأ", variant: "destructive", description: "فشل التحليل الذكي" });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-20">
      <header className="p-6 bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => router.back()} className="rounded-full">
              <ArrowRight className="h-6 w-6" />
            </Button>
            <h1 className="text-2xl font-bold font-headline">التقارير والإحصائيات</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
            <Button variant="outline" size="icon" className="rounded-full"><Download className="h-4 w-4" /></Button>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <section>
          <Button 
            onClick={handleAIAnalysis} 
            disabled={isAnalyzing}
            className="w-full h-16 bg-gradient-to-l from-primary to-accent text-white font-bold rounded-2xl shadow-lg border-none hover:opacity-90 flex gap-3 text-lg relative overflow-hidden group"
          >
            <Sparkles className="h-6 w-6 group-hover:rotate-12 transition-transform" />
            {isAnalyzing ? 'جاري التحليل الذكي...' : 'تحليل مالي بالذكاء الاصطناعي'}
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 skew-x-12" />
          </Button>
        </section>

        {analysisResult && (
          <Card className="border-none shadow-xl bg-primary/5 rounded-3xl animate-in fade-in slide-in-from-bottom-4 duration-500 overflow-hidden">
            <CardHeader className="bg-primary/10 border-b border-primary/10">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">توصيات الخبير الذكي</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-primary uppercase">ملخص الحالة</p>
                <p className="text-sm leading-relaxed">{analysisResult.executiveSummary}</p>
              </div>
              <div className="grid grid-cols-1 gap-4 mt-4">
                <div className="bg-white p-4 rounded-2xl border border-primary/10 shadow-sm">
                  <p className="text-xs font-bold text-leh mb-2">توصية مالية</p>
                  <p className="text-sm italic">{analysisResult.actionableRecommendations}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <section className="space-y-4">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            حركة الديون (شهرياً)
          </h2>
          <Card className="border-none shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-4 pt-6 h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={DEBT_CHART_DATA}>
                  <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis fontSize={10} axisLine={false} tickLine={false} hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
                    cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="leh" fill="#339933" radius={[4, 4, 0, 0]} name="له" />
                  <Bar dataKey="alaih" fill="#DF2626" radius={[4, 4, 0, 0]} name="عليه" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-accent" />
              توزيع العملات
            </h2>
            <Card className="border-none shadow-sm rounded-3xl h-[250px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={CURRENCY_DIST_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {CURRENCY_DIST_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <FileText className="h-5 w-5 text-slate-500" />
              أحدث التقارير
            </h2>
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="bg-white p-4 rounded-2xl flex items-center justify-between border border-border/50 shadow-sm active:scale-[0.98] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center">
                      <FileText className="h-5 w-5 text-slate-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">كشف حساب مارس</p>
                      <p className="text-[10px] text-muted-foreground">PDF • قبل ٣ أيام</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="rounded-full text-primary hover:bg-primary/10">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <BottomNav />
    </div>
  );
}
