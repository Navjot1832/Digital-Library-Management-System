import { Link } from 'react-router-dom';

function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="panel max-w-lg p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-red-500">Access Restricted</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">You do not have permission to view this page.</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The requested route is protected for a different user role. Please go back to the appropriate dashboard.
        </p>
        <Link to="/login" className="btn-primary mt-6">
          Back to Login
        </Link>
      </div>
    </div>
  );
}

export default UnauthorizedPage;
