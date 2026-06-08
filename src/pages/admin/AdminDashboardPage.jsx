import { BookMarked, BookOpenCheck, ChartNoAxesCombined, Users } from 'lucide-react';
import AppShell from '../../components/layout/AppShell';
import SummaryCard from '../../components/common/SummaryCard';
import PageSection from '../../components/common/PageSection';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { useLibrary } from '../../context/LibraryContext';

function AdminDashboardPage() {
  const { summary, transactions } = useLibrary();
  const recentTransactions = transactions.slice(0, 5);

  return (
    <AppShell title="Admin Dashboard" subtitle="Track library performance and daily activity">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={BookMarked} label="Total Books" value={summary.totalBooks} helper="Books currently in the catalog" />
        <SummaryCard
          icon={BookOpenCheck}
          label="Issued Books"
          value={summary.issuedBooks}
          helper="Books currently with members"
          tone="amber"
        />
        <SummaryCard icon={Users} label="Total Users" value={summary.totalUsers} helper="Registered student members" tone="accent" />
        <SummaryCard icon={ChartNoAxesCombined} label="Library Health" value="Strong" helper="Steady borrowing and return activity" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <PageSection
          title="Recent Transactions"
          subtitle="Latest issue and return records across the system."
        >
          <DataTable
            columns={['Borrower', 'Book', 'Issue Date', 'Due Date', 'Status']}
            rows={recentTransactions}
            renderRow={(item) => (
              <tr key={item.id} className="text-sm text-slate-600 transition hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-800">{item.borrower}</td>
                <td className="px-4 py-4">{item.bookTitle}</td>
                <td className="px-4 py-4">{item.issueDate}</td>
                <td className="px-4 py-4">{item.dueDate}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            )}
          />
        </PageSection>

        <PageSection
          title="System Notes"
          subtitle="Operational highlights for admins."
        >
          <div className="space-y-4">
            <div className="rounded-3xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-500">Peak Activity</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">2 PM - 4 PM</p>
              <p className="mt-2 text-sm text-slate-500">Most book issues happen during lab breaks.</p>
            </div>
            <div className="rounded-3xl bg-brand-50 p-4">
              <p className="text-sm font-medium text-brand-700">Collection Focus</p>
              <p className="mt-2 text-xl font-semibold text-brand-900">Technology & AI</p>
              <p className="mt-2 text-sm text-brand-700">These categories are seeing the highest search volume.</p>
            </div>
            <div className="rounded-3xl bg-emerald-50 p-4">
              <p className="text-sm font-medium text-emerald-700">Return Compliance</p>
              <p className="mt-2 text-xl font-semibold text-emerald-900">91%</p>
              <p className="mt-2 text-sm text-emerald-700">Returned on or before the due date this month.</p>
            </div>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}

export default AdminDashboardPage;
