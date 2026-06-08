import {
  BookCopy,
  BookOpen,
  Home,
  LibraryBig,
  LogOut,
  Search,
  UserCog,
  Users,
  WalletCards,
  X,
} from 'lucide-react';
import { flushSync } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';

const navigationMap = {
  user: [
    { label: 'Dashboard', to: '/user/dashboard', icon: Home },
    { label: 'Search Books', to: '/user/search', icon: Search },
    { label: 'Profile', to: '/user/profile', icon: UserCog },
  ],
  admin: [
    { label: 'Dashboard', to: '/admin/dashboard', icon: Home },
    { label: 'Manage Books', to: '/admin/books', icon: BookOpen },
    { label: 'Manage Users', to: '/admin/users', icon: Users },
    { label: 'Transactions', to: '/admin/transactions', icon: WalletCards },
    { label: 'Profile', to: '/admin/profile', icon: UserCog },
  ],
};

function Sidebar({ open, onClose }) {
  const { currentUser, logout } = useAuth();
  const items = navigationMap[currentUser?.role] || [];

  const handleLogout = () => {
    flushSync(() => {
      logout();
      onClose();
    });
    window.location.replace('/login');
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-900/40 transition md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-slate-950 text-white shadow-2xl transition duration-300 md:static md:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
          <Link to={currentUser?.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-500/20 text-brand-200">
              <LibraryBig size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Digital Library</p>
              <h1 className="text-lg font-semibold">Management System</h1>
            </div>
          </Link>
          <button
            type="button"
            className="rounded-2xl p-2 text-slate-400 transition hover:bg-white/10 hover:text-white md:hidden"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={currentUser?.avatar}
                alt={currentUser?.name}
                className="h-12 w-12 rounded-2xl object-cover"
              />
              <div>
                <p className="font-semibold">{currentUser?.name}</p>
                <p className="text-sm text-slate-400">{currentUser?.role === 'admin' ? 'Administrator' : 'Student Member'}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-white/5 px-3 py-2 text-sm text-slate-300">
              <BookCopy size={16} />
              <span>{currentUser?.membershipId}</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-2 px-4">
          {items.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={label}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-500 text-white shadow-lg shadow-brand-900/20'
                    : 'text-slate-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
