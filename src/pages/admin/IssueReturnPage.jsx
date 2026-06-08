import { useMemo, useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageSection from '../../components/common/PageSection';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { useLibrary } from '../../context/LibraryContext';

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function getDefaultIssueForm() {
  const issueDate = new Date();
  const dueDate = new Date(issueDate);
  dueDate.setDate(issueDate.getDate() + 15);

  return {
    bookId: '',
    userId: '',
    issueDate: formatDate(issueDate),
    dueDate: formatDate(dueDate),
  };
}

function IssueReturnPage() {
  const { books, users, transactions, issueBook, returnBook } = useLibrary();
  const [form, setForm] = useState(getDefaultIssueForm);

  const availableBooks = useMemo(() => books.filter((book) => book.status === 'Available'), [books]);
  const memberUsers = useMemo(() => users.filter((user) => user.role === 'user'), [users]);
  const activeTransactions = useMemo(
    () => transactions.filter((transaction) => transaction.status === 'Issued'),
    [transactions],
  );

  const handleIssueSubmit = async (event) => {
    event.preventDefault();
    if (!form.bookId || !form.userId) {
      return;
    }
    await issueBook(form);
    setForm(getDefaultIssueForm());
  };

  return (
    <AppShell title="Issue & Return" subtitle="Manage book circulation and transaction records">
      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <PageSection
          title="Issue a Book"
          subtitle="Assign an available book to a registered user."
        >
          <form className="space-y-4" onSubmit={handleIssueSubmit}>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Select Book</label>
              <select
                className="field"
                value={form.bookId}
                onChange={(event) => setForm((prev) => ({ ...prev, bookId: event.target.value }))}
              >
                <option value="">Choose a book</option>
                {availableBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-slate-700">Select User</label>
              <select
                className="field"
                value={form.userId}
                onChange={(event) => setForm((prev) => ({ ...prev, userId: event.target.value }))}
              >
                <option value="">Choose a user</option>
                {memberUsers.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Issue Date</label>
                <input
                  type="date"
                  className="field"
                  value={form.issueDate}
                  onChange={(event) => {
                    const issueDate = new Date(event.target.value);
                    const dueDate = new Date(issueDate);
                    dueDate.setDate(issueDate.getDate() + 15);
                    setForm((prev) => ({
                      ...prev,
                      issueDate: event.target.value,
                      dueDate: formatDate(dueDate),
                    }));
                  }}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-slate-700">Due Date</label>
                <input
                  type="date"
                  className="field"
                  value={form.dueDate}
                  readOnly
                />
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">
              Issue Book
            </button>
          </form>
        </PageSection>

        <PageSection
          title="Active Transactions"
          subtitle="Return books and monitor fines for overdue entries."
        >
          {activeTransactions.length ? (
            <DataTable
              columns={['Book', 'Borrower', 'Issue Date', 'Due Date', 'Fine', 'Action']}
              rows={activeTransactions}
              renderRow={(item) => (
                <tr key={item.id} className="text-sm text-slate-600 transition hover:bg-slate-50">
                  <td className="px-4 py-4 font-medium text-slate-800">{item.bookTitle}</td>
                  <td className="px-4 py-4">{item.borrower}</td>
                  <td className="px-4 py-4">{item.issueDate}</td>
                  <td className="px-4 py-4">{item.dueDate}</td>
                  <td className="px-4 py-4 font-semibold text-amber-600">₹{item.fine}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={item.status} />
                      <button
                        type="button"
                        className="btn-secondary !px-3 !py-2"
                        onClick={() => returnBook(item.id, formatDate(new Date()))}
                      >
                        Return
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            />
          ) : (
            <EmptyState
              title="No active transactions"
              description="Issue a book to a user and the circulation details will appear here."
            />
          )}
        </PageSection>
      </div>
    </AppShell>
  );
}

export default IssueReturnPage;
