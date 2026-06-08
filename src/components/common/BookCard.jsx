import { BookOpenText, Layers3, UserRound } from 'lucide-react';
import StatusBadge from './StatusBadge';

function BookCard({ book, issuing = false, onIssue }) {
  const canIssue = book.status === 'Available' && Boolean(onIssue);

  return (
    <article className="panel group p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
          <BookOpenText size={22} />
        </div>
        <StatusBadge status={book.status} />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-slate-900">{book.title}</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <UserRound size={15} />
          <span>{book.author}</span>
        </div>
        <div className="flex items-center gap-2">
          <Layers3 size={15} />
          <span>{book.category}</span>
        </div>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-500">{book.description}</p>
      <div className="mt-5">
        <button
          type="button"
          className="btn-secondary w-full !rounded-2xl group-hover:border-brand-200 group-hover:text-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!canIssue || issuing}
          onClick={() => onIssue?.(book)}
        >
          {issuing ? 'Issuing...' : book.status === 'Available' ? 'Issue Book' : 'Currently Issued'}
        </button>
      </div>
    </article>
  );
}

export default BookCard;
