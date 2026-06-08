import { BookOpenCheck } from 'lucide-react';

function EmptyState({ title, description }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 px-6 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-50 text-brand-600">
        <BookOpenCheck size={28} />
      </div>
      <h4 className="mt-5 text-lg font-semibold text-slate-900">{title}</h4>
      <p className="mt-2 max-w-md text-sm text-slate-500">{description}</p>
    </div>
  );
}

export default EmptyState;
