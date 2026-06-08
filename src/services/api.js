const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Request failed');
  }

  if (response.status === 204) {
    return null;
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export const api = {
  login: (payload) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  register: (payload) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getUsers: () => request('/users'),
  getBooks: () => request('/books'),
  createBook: (payload) =>
    request('/books', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  updateBook: (book) =>
    request(`/books/${book.id}`, {
      method: 'PUT',
      body: JSON.stringify(book),
    }),
  deleteBook: (id) =>
    request(`/books/${id}`, {
      method: 'DELETE',
    }),
  getTransactions: () => request('/transactions'),
  issueBook: (payload) =>
    request('/transactions/issue', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  returnBook: (transactionId, returnDate) =>
    request(`/transactions/${transactionId}/return`, {
      method: 'POST',
      body: JSON.stringify({ returnDate }),
    }),
  getSummary: () => request('/dashboard/summary'),
};
