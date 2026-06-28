import { FileText, BarChart3 } from 'lucide-react';
import PageShell from '../components/PageShell';

const reports = [
  { title: 'Revenue report', detail: 'Generated weekly sales and payout summaries.' },
  { title: 'Risk report', detail: 'Flags suspicious account or order activity for review.' },
  { title: 'Growth report', detail: 'Tracks product, seller, and category trends.' },
];

const ReportsPage = () => {
  return (
    <PageShell
      eyebrow="Admin"
      title="Reports"
      description="A placeholder reporting hub for future backend data."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reports.map((report) => (
          <article key={report.title} className="bg-white border border-brand-brown/10 rounded-2xl p-5 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-brand-orange/10 text-brand-orange flex items-center justify-center mb-4">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-xl font-bold text-brand-brown">{report.title}</h3>
            <p className="text-sm text-brand-muted mt-2">{report.detail}</p>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default ReportsPage;

