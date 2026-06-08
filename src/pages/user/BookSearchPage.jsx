import { useMemo, useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageSection from '../../components/common/PageSection';
import BookCard from '../../components/common/BookCard';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

function formatDate(date) {
  return date.toISOString().slice(0, 10);
}

function BookSearchPage() {
  const { currentUser } = useAuth();
  const { books, issueBook } = useLibrary();
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    category: 'All',
  });
  const [issuingBookId, setIssuingBookId] = useState(null);
  const [message, setMessage] = useState('');

  const categories = useMemo(() => ['All', ...new Set(books.map((book) => book.category))], [books]);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) => {
        const titleMatch = book.title.toLowerCase().includes(filters.title.toLowerCase());
        const authorMatch = book.author.toLowerCase().includes(filters.author.toLowerCase());
        const categoryMatch = filters.category === 'All' || book.category === filters.category;
        return titleMatch && authorMatch && categoryMatch;
      }),
    [books, filters],
  );

  const handleIssueBook = async (book) => {
    if (!currentUser || book.status !== 'Available') {
      return;
    }

    const issueDate = new Date();
    const dueDate = new Date(issueDate);
    dueDate.setDate(issueDate.getDate() + 15);

    setMessage('');
    setIssuingBookId(book.id);

    try {
      await issueBook({
        bookId: book.id,
        userId: currentUser.id,
        issueDate: formatDate(issueDate),
        dueDate: formatDate(dueDate),
      });
      setMessage(`${book.title} has been issued to your account.`);
    } catch (error) {
      setMessage(error.message || 'Unable to issue this book right now.');
    } finally {
      setIssuingBookId(null);
    }
  };

  return (
    <AppShell title="Search Books" subtitle="Browse the collection and check real-time availability">
      <PageSection
        title="Library Catalog"
        subtitle="Use the filters below to quickly discover books by title, author, or category."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              type="text"
              className="field"
              placeholder="Search by title"
              value={filters.title}
              onChange={(event) => setFilters((prev) => ({ ...prev, title: event.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Author</label>
            <input
              type="text"
              className="field"
              placeholder="Search by author"
              value={filters.author}
              onChange={(event) => setFilters((prev) => ({ ...prev, author: event.target.value }))}
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <select
              className="field"
              value={filters.category}
              onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </PageSection>

      <div className="mt-6">
        {message ? (
          <p className="mb-4 rounded-2xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm font-medium text-brand-700">
            {message}
          </p>
        ) : null}
        {filteredBooks.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                issuing={issuingBookId === book.id}
                onIssue={handleIssueBook}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No books match these filters"
            description="Try clearing one or more filters to explore the rest of the collection."
          />
        )}
      </div>
    </AppShell>
  );
}

export default BookSearchPage;
