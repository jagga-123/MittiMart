import { BarChart3, TrendingUp } from 'lucide-react';
import PageShell from '../components/PageShell';
import { analyticsBars } from '../data/mockData';

const SellerAnalyticsPage = () => {
  return (
    <PageShell
      eyebrow="Seller Analytics"
      title="Performance insights"
      description="Analytics is role-protected and grouped under seller/admin access."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <article className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-heading text-xl font-bold text-brand-brown">Growth bars</h3>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1.5 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              +18% this month
            </div>
          </div>
          <div className="flex items-end justify-between gap-3 h-48">
            {analyticsBars.map((bar) => (
              <div key={bar.month} className="flex flex-col items-center flex-1">
                <div
                  className="w-full max-w-10 bg-gradient-to-t from-brand-orange to-brand-brown rounded-full"
                  style={{ height: `${bar.value * 2}px` }}
                />
                <span className="text-[10px] text-brand-muted mt-2">{bar.month}</span>
              </div>
            ))}
          </div>
        </article>
        <article className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
          <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-heading text-xl font-bold text-brand-brown">Summary</h3>
          <p className="text-sm text-brand-muted mt-2 leading-relaxed">
            This screen is ready to be swapped for live conversion, order, and traffic metrics from a backend API.
          </p>
        </article>
      </div>
    </PageShell>
  );
};

export default SellerAnalyticsPage;

