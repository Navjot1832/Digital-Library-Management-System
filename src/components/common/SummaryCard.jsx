function SummaryCard({ icon: Icon, label, value, helper, tone = 'brand' }) {
  const toneMap = {
    brand: 'bg-brand-50 text-brand-600',
    accent: 'bg-emerald-50 text-emerald-600',
    amber: 'bg-amber-50 text-amber-600',
  };

  return (
    <div className="panel p-5 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
          <p className="mt-2 text-sm text-slate-500">{helper}</p>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${toneMap[tone]}`}>
          <Icon size={22} />
        </div>
      </div>
    </div>
  );
}

export default SummaryCard;
