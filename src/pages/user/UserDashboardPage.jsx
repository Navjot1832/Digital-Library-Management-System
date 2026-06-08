import { CalendarClock, CircleDollarSign, Library, NotebookText } from 'lucide-react';
import { useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import SummaryCard from '../../components/common/SummaryCard';
import PageSection from '../../components/common/PageSection';
import DataTable from '../../components/common/DataTable';
import EmptyState from '../../components/common/EmptyState';
import StatusBadge from '../../components/common/StatusBadge';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

function UserDashboardPage() {
  const { currentUser } = useAuth();
  const { transactions, returnBook } = useLibrary();
  const [returningId, setReturningId] = useState(null);
  const [message, setMessage] = useState('');

  const issuedBooks = transactions.filter(
    (transaction) => transaction.userId === currentUser.id && transaction.status === 'Issued',
  );
  const totalFine = issuedBooks.reduce((sum, item) => sum + item.fine, 0);
  const nextDueDate = issuedBooks.length ? issuedBooks[0].dueDate : 'No active loans';

  const handleReturnBook = async (transaction) => {
    const returnDate = new Date().toISOString().slice(0, 10);

    setMessage('');
    setReturningId(transaction.id);

    try {
      await returnBook(transaction.id, returnDate);
      setMessage(`${transaction.bookTitle} has been returned successfully.`);
    } catch (error) {
      setMessage(error.message || 'Unable to return this book right now.');
    } finally {
      setReturningId(null);
    }
  };

  return (
    <AppShell title="Student Dashboard" subtitle="Overview of your current borrowing activity">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard icon={Library} label="Issued Books" value={issuedBooks.length} helper="Books currently on your account" />
        <SummaryCard
          icon={CalendarClock}
          label="Nearest Due Date"
          value={nextDueDate}
          helper="Stay ahead of return deadlines"
          tone="amber"
        />
        <SummaryCard
          icon={CircleDollarSign}
          label="Outstanding Fine"
          value={`₹${totalFine}`}
          helper="Calculated from overdue items"
          tone="accent"
        />
        <SummaryCard icon={NotebookText} label="Reading Status" value="On Track" helper="No pending renewal requests" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <PageSection
          title="Issued Books"
          subtitle="Track all books currently borrowed and monitor due dates."
        >
          {message ? (
            <p className="mb-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
              {message}
            </p>
          ) : null}
          {issuedBooks.length ? (
            <DataTable
              columns={['Book', 'Issue Date', 'Due Date', 'Fine', 'Status', 'Action']}
              rows={issuedBooks}
              renderRow={(item) => (
                <tr key={item.id} className="text-sm text-slate-600 transition hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-800">{item.bookTitle}</td>
                  <td className="px-4 py-4">{item.issueDate}</td>
                  <td className="px-4 py-4">{item.dueDate}</td>
                  <td className="px-4 py-4 font-semibold text-amber-600">₹{item.fine}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-4 py-4">
                    <button
                      type="button"
                      className="btn-secondary !px-3 !py-2"
                      disabled={returningId === item.id}
                      onClick={() => handleReturnBook(item)}
                    >
                      {returningId === item.id ? 'Returning...' : 'Return'}
                    </button>
                  </td>
                </tr>
              )}
            />
          ) : (
            <EmptyState
              title="No active issued books"
              description="Browse the catalog and issue books to see your reading activity here."
            />
          )}
        </PageSection>

        <div className="space-y-6">
          <PageSection
            title="Quick Tips"
            subtitle="Helpful reminders to keep your borrowing smooth."
          >
            <div className="space-y-4">
              {[
                'Return or renew books before the due date to avoid fines.',
                'Use filters in the search page to discover books faster.',
                'Keep your profile updated for a better admin follow-up.',
              ].map((tip) => (
                <div key={tip} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
                  {tip}
                </div>
              ))}
            </div>
          </PageSection>

          <PageSection
            title="Member Info"
            subtitle="Your library membership details."
          >
            <div className="space-y-4">
              <div className="rounded-3xl bg-brand-50 p-4">
                <p className="text-sm text-brand-700">Member ID</p>
                <p className="mt-2 text-lg font-semibold text-brand-900">{currentUser.membershipId}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Department</p>
                <p className="mt-1 font-semibold text-slate-900">{currentUser.department}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Email</p>
                <p className="mt-1 font-semibold text-slate-900">{currentUser.email}</p>
              </div>
            </div>
          </PageSection>
        </div>
      </div>
    </AppShell>
  );
}

export default UserDashboardPage;
