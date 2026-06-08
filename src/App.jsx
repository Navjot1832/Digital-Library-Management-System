import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ProtectedRoute from './components/routing/ProtectedRoute';
import UserDashboardPage from './pages/user/UserDashboardPage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import BookSearchPage from './pages/user/BookSearchPage';
import ProfilePage from './pages/shared/ProfilePage';
import BookManagementPage from './pages/admin/BookManagementPage';
import IssueReturnPage from './pages/admin/IssueReturnPage';
import ManageUsersPage from './pages/admin/ManageUsersPage';
import UnauthorizedPage from './pages/shared/UnauthorizedPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      <Route element={<ProtectedRoute allowedRoles={['user']} />}>
        <Route path="/user/dashboard" element={<UserDashboardPage />} />
        <Route path="/user/search" element={<BookSearchPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/books" element={<BookManagementPage />} />
        <Route path="/admin/users" element={<ManageUsersPage />} />
        <Route path="/admin/transactions" element={<IssueReturnPage />} />
        <Route path="/admin/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
