import { BadgeCheck, BookHeart, GraduationCap, Mail, Shield } from 'lucide-react';
import Avatar from '../../components/common/Avatar';
import AppShell from '../../components/layout/AppShell';
import PageSection from '../../components/common/PageSection';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

function ProfilePage() {
  const { currentUser } = useAuth();
  const { transactions } = useLibrary();
  const myTransactions = transactions.filter((item) =>
    currentUser.role === 'admin' ? true : item.userId === currentUser.id,
  );

  return (
    <AppShell title="Profile" subtitle="Account details and library activity snapshot">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <PageSection title="Profile Card" subtitle="Your personal library account information.">
          <div className="flex flex-col items-start gap-5 sm:flex-row">
            <Avatar src={currentUser.avatar} alt={currentUser.name} className="h-28 w-28 rounded-[32px] object-cover" />
            <div>
              <span className="chip bg-brand-50 text-brand-700">
                {currentUser.role === 'admin' ? 'Administrator' : 'Student Member'}
              </span>
              <h3 className="mt-4 text-2xl font-bold text-slate-900">{currentUser.name}</h3>
              <p className="mt-1 text-slate-500">{currentUser.department}</p>
              <div className="mt-5 grid gap-3 text-sm text-slate-600">
                <div className="flex items-center gap-3">
                  <Mail size={16} />
                  <span>{currentUser.email}</span>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap size={16} />
                  <span>{currentUser.membershipId}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield size={16} />
                  <span>{currentUser.role === 'admin' ? 'Full dashboard access' : 'Book search and borrowing access'}</span>
                </div>
              </div>
            </div>
          </div>
        </PageSection>

        <PageSection title="Activity Snapshot" subtitle="A quick summary of your library interaction.">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <BookHeart size={22} />
              </div>
              <h4 className="mt-4 text-2xl font-bold text-slate-900">{myTransactions.length}</h4>
              <p className="mt-1 text-sm text-slate-500">Total transactions</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <BadgeCheck size={22} />
              </div>
              <h4 className="mt-4 text-2xl font-bold text-slate-900">
                {myTransactions.filter((item) => item.status === 'Returned').length}
              </h4>
              <p className="mt-1 text-sm text-slate-500">Returned books</p>
            </div>
            <div className="rounded-3xl bg-slate-50 p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <Shield size={22} />
              </div>
              <h4 className="mt-4 text-2xl font-bold text-slate-900">
                {myTransactions.filter((item) => item.status === 'Issued').length}
              </h4>
              <p className="mt-1 text-sm text-slate-500">Active items</p>
            </div>
          </div>
        </PageSection>
      </div>
    </AppShell>
  );
}

export default ProfilePage;
