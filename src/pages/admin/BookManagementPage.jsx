import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';
import AppShell from '../../components/layout/AppShell';
import PageSection from '../../components/common/PageSection';
import DataTable from '../../components/common/DataTable';
import Modal from '../../components/common/Modal';
import StatusBadge from '../../components/common/StatusBadge';
import EmptyState from '../../components/common/EmptyState';
import { useLibrary } from '../../context/LibraryContext';

const emptyForm = {
  title: '',
  author: '',
  category: '',
  status: 'Available',
  description: '',
};

function BookManagementPage() {
  const { books, addBook, updateBook, deleteBook } = useLibrary();
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredBooks = useMemo(
    () =>
      books.filter((book) =>
        [book.title, book.author, book.category].some((value) =>
          value.toLowerCase().includes(query.toLowerCase()),
        ),
      ),
    [books, query],
  );

  const openCreateModal = () => {
    setEditingBook(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (book) => {
    setEditingBook(book);
    setForm(book);
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (editingBook) {
      await updateBook({ ...editingBook, ...form });
    } else {
      await addBook(form);
    }
    setModalOpen(false);
  };

  return (
    <AppShell title="Book Management" subtitle="Add, update, and organize your library collection">
      <PageSection
        title="Catalog Table"
        subtitle="Manage titles, authors, categories, and circulation status."
        action={
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              className="field h-11 min-w-[220px]"
              placeholder="Search books..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type="button" className="btn-primary" onClick={openCreateModal}>
              <Plus size={18} className="mr-2" />
              Add Book
            </button>
          </div>
        }
      >
        {filteredBooks.length ? (
          <DataTable
            columns={['Title', 'Author', 'Category', 'Status', 'Actions']}
            rows={filteredBooks}
            renderRow={(book) => (
              <tr key={book.id} className="text-sm text-slate-600 transition hover:bg-slate-50">
                <td className="px-4 py-4 font-medium text-slate-800">{book.title}</td>
                <td className="px-4 py-4">{book.author}</td>
                <td className="px-4 py-4">{book.category}</td>
                <td className="px-4 py-4">
                  <StatusBadge status={book.status} />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-brand-200 hover:text-brand-600"
                      onClick={() => openEditModal(book)}
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded-2xl border border-slate-200 p-2 text-slate-500 transition hover:border-red-200 hover:text-red-600"
                      onClick={() => deleteBook(book.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )}
          />
        ) : (
          <EmptyState
            title="No books found"
            description="Try a different search term or add a new title to the library catalog."
          />
        )}
      </PageSection>

      <Modal
        open={modalOpen}
        title={editingBook ? 'Edit Book' : 'Add New Book'}
        subtitle="Use the form below to maintain your catalog details."
        onClose={() => setModalOpen(false)}
      >
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Title</label>
            <input
              type="text"
              className="field"
              value={form.title}
              onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Author</label>
            <input
              type="text"
              className="field"
              value={form.author}
              onChange={(event) => setForm((prev) => ({ ...prev, author: event.target.value }))}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Category</label>
            <input
              type="text"
              className="field"
              value={form.category}
              onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              required
            />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description</label>
            <textarea
              className="min-h-[120px] rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 transition focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
              required
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700">Status</label>
            <select
              className="field"
              value={form.status}
              onChange={(event) => setForm((prev) => ({ ...prev, status: event.target.value }))}
            >
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
            </select>
          </div>
          <div className="flex items-end justify-end gap-3 md:col-span-2">
            <button type="button" className="btn-secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingBook ? 'Save Changes' : 'Add Book'}
            </button>
          </div>
        </form>
      </Modal>
    </AppShell>
  );
}

export default BookManagementPage;
