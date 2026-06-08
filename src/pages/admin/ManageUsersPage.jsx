import { Mail, ShieldCheck, UserRound } from 'lucide-react';
import { useEffect } from 'react';
import Avatar from '../../components/common/Avatar';
import AppShell from '../../components/layout/AppShell';
import PageSection from '../../components/common/PageSection';
import EmptyState from '../../components/common/EmptyState';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

function ManageUsersPage() {
  const { refreshUsers } = useAuth();
  const { users } = useLibrary();
  const studentUsers = users.filter((user) => user.role === 'user');

  useEffect(() => {
    refreshUsers().catch((error) => {
      console.error('Failed to refresh users', error);
    });
  }, [refreshUsers]);

  return (
    <AppShell title="Manage Users" subtitle="View registered members and their library details">
      <PageSection
        title="User Directory"
        subtitle="A clean overview of all registered library members."
      >
        {studentUsers.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {studentUsers.map((user) => (
              <div key={user.id} className="panel p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <div className="flex items-center gap-4">
                  <Avatar src={user.avatar} alt={user.name} className="h-16 w-16 rounded-3xl object-cover" />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{user.name}</h3>
                    <p className="text-sm text-slate-500">{user.department}</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Mail size={15} />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <UserRound size={15} />
                    <span>{user.membershipId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={15} />
                    <span>Active library member</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No users available"
            description="Once students register, their member cards will appear here."
          />
        )}
      </PageSection>
    </AppShell>
  );
}

export default ManageUsersPage;
