import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from './AuthContext';

const LibraryContext = createContext(null);

export function LibraryProvider({ children }) {
  const { users } = useAuth();
  const [books, setBooks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const refreshLibrary = async () => {
    const [nextBooks, nextTransactions] = await Promise.all([api.getBooks(), api.getTransactions()]);
    setBooks(nextBooks);
    setTransactions(nextTransactions);
    return { books: nextBooks, transactions: nextTransactions };
  };

  useEffect(() => {
    setLoading(true);
    refreshLibrary()
      .catch((error) => {
        console.error('Failed to load library data', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const addBook = async (book) => {
    const createdBook = await api.createBook(book);
    setBooks((prev) => [createdBook, ...prev]);
    return createdBook;
  };

  const updateBook = async (updatedBook) => {
    const savedBook = await api.updateBook(updatedBook);
    setBooks((prev) => prev.map((book) => (book.id === savedBook.id ? savedBook : book)));
    return savedBook;
  };

  const deleteBook = async (id) => {
    await api.deleteBook(id);
    setBooks((prev) => prev.filter((book) => book.id !== id));
    setTransactions((prev) => prev.filter((item) => item.bookId !== id));
  };

  const issueBook = async ({ bookId, userId, issueDate, dueDate }) => {
    await api.issueBook({
      bookId: Number(bookId),
      userId: Number(userId),
      issueDate,
      dueDate,
    });
    await refreshLibrary();
  };

  const returnBook = async (transactionId, returnDate) => {
    await api.returnBook(transactionId, returnDate);
    await refreshLibrary();
  };

  const summary = useMemo(
    () => ({
      totalBooks: books.length,
      issuedBooks: books.filter((book) => book.status === 'Issued').length,
      totalUsers: users.filter((user) => user.role === 'user').length,
    }),
    [books, users],
  );

  const value = useMemo(
    () => ({
      books,
      users,
      transactions,
      loading,
      refreshLibrary,
      addBook,
      updateBook,
      deleteBook,
      issueBook,
      returnBook,
      summary,
    }),
    [books, users, transactions, loading, summary],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  return useContext(LibraryContext);
}
