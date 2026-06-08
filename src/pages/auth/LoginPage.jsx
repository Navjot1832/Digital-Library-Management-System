import { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, login } = useAuth();
  const [form, setForm] = useState({
    email: '',
    password: '',
    role: 'admin',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const redirectTarget = useMemo(() => location.state?.from?.pathname || '', [location.state]);

  const validate = () => {
    const nextErrors = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    setMessage('');

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);
    window.setTimeout(async () => {
      const result = await login(form);
      if (!result.success) {
        setMessage(result.message);
        setSubmitting(false);
        return;
      }

      const destination =
        redirectTarget || (result.user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard');

      navigate(destination, { replace: true });
    }, 600);
  };

  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return (
    <AuthLayout
      title="Sign in to your account"
      subtitle="Manage library activities, track due books, and keep everything organized from a polished dashboard."
      sideTitle="A cleaner way to run your college library."
      sideText="This frontend includes protected routes, reusable dashboard components, mock data flows, and responsive layouts designed to feel production-ready."
      footer={
        <p className="mt-8 text-sm text-slate-500">
          New here?{' '}
          <Link to="/register" className="font-semibold text-brand-600 transition hover:text-brand-700">
            Create an account
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Email address</label>
          <input
            type="email"
            className="field"
            placeholder="you@college.edu"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="field"
            placeholder="Enter your password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          {errors.password ? <p className="text-sm text-red-500">{errors.password}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Sign in as</label>
          <select
            className="field"
            value={form.role}
            onChange={(event) => setForm((prev) => ({ ...prev, role: event.target.value }))}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {message ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{message}</p> : null}

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;
