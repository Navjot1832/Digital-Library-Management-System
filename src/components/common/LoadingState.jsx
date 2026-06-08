function LoadingState({ message = 'Loading data...' }) {
  return (
    <div className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-200 border-t-brand-500" />
      <span className="text-sm font-medium text-slate-600">{message}</span>
    </div>
  );
}

export default LoadingState;
