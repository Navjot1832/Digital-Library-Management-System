import { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function AppShell({ title, subtitle, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto flex min-h-screen max-w-[1680px]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Topbar title={title} subtitle={subtitle} onMenuClick={() => setSidebarOpen(true)} />
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppShell;
