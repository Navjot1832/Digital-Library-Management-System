import { Bell, Menu, Search } from 'lucide-react';
import Avatar from '../common/Avatar';
import { useAuth } from '../../context/AuthContext';

function Topbar({ title, subtitle, onMenuClick }) {
  const { currentUser } = useAuth();

  return (
    <header className="mb-8 flex flex-col gap-4 rounded-3xl bg-mesh p-5 shadow-soft md:flex-row md:items-center md:justify-between md:p-6">
      <div className="flex items-start gap-4">
        <button
          type="button"
          className="rounded-2xl border border-slate-200 bg-white p-3 text-slate-600 shadow-sm transition hover:text-brand-600 md:hidden"
          onClick={onMenuClick}
        >
          <Menu size={18} />
        </button>
        <div>
          <p className="text-sm font-medium text-brand-700">{subtitle}</p>
          <h2 className="mt-1 text-2xl font-bold text-slate-900 md:text-3xl">{title}</h2>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-4 py-3 shadow-sm">
          <Search size={16} className="text-slate-400" />
          <span className="text-sm text-slate-500">Search books, users or transactions</span>
        </div>
        <button type="button" className="relative rounded-2xl border border-white/60 bg-white/80 p-3 text-slate-600 shadow-sm">
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-amber-400" />
        </button>
        <div className="hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/80 px-3 py-2 shadow-sm sm:flex">
          <Avatar src={currentUser?.avatar} alt={currentUser?.name} className="h-10 w-10 rounded-2xl object-cover" />
          <div>
            <p className="text-sm font-semibold text-slate-800">{currentUser?.name}</p>
            <p className="text-xs text-slate-500">{currentUser?.department}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
