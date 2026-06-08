function StatusBadge({ status }) {
  const styles =
    status === 'Available'
      ? 'bg-emerald-50 text-emerald-700'
      : status === 'Issued'
        ? 'bg-amber-50 text-amber-700'
        : status === 'Returned'
          ? 'bg-slate-100 text-slate-700'
          : 'bg-red-50 text-red-700';

  return <span className={`chip ${styles}`}>{status}</span>;
}

export default StatusBadge;
