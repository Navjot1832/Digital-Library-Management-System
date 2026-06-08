import { LibraryBig } from 'lucide-react';

function AuthLayout({ title, subtitle, sideTitle, sideText, children, footer }) {
  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-[32px] bg-white shadow-soft lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white lg:flex lg:flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(61,109,244,0.32),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(34,197,94,0.18),transparent_26%)]" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 backdrop-blur">
              <LibraryBig size={28} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Portfolio Ready</p>
              <h1 className="text-xl font-semibold">Digital Library</h1>
            </div>
          </div>

          <div className="relative z-10 mt-auto space-y-5">
            <span className="chip bg-white/10 text-slate-100">React + Tailwind CSS</span>
            <h2 className="max-w-md text-4xl font-bold leading-tight">{sideTitle}</h2>
            <p className="max-w-lg text-base leading-7 text-slate-300">{sideText}</p>
            <div className="grid gap-4 pt-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-bold">12k+</p>
                <p className="mt-1 text-sm text-slate-300">Books cataloged in the system</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <p className="text-3xl font-bold">98%</p>
                <p className="mt-1 text-sm text-slate-300">On-time returns this semester</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center bg-white p-6 md:p-10">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-brand-600">Welcome</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
            </div>
            {children}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
