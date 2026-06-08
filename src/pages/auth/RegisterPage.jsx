import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import AuthLayout from './AuthLayout';
import { useAuth } from '../../context/AuthContext';

function RegisterPage() {
  const navigate = useNavigate();
  const { currentUser, register } = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    department: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const nextErrors = {};

    if (form.name.trim().length < 3) {
      nextErrors.name = 'Name must be at least 3 characters.';
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (form.department.trim().length < 2) {
      nextErrors.department = 'Department is required.';
    }

    if (form.password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters.';
    }

    if (form.password !== form.confirmPassword) {
      nextErrors.confirmPassword = 'Passwords do not match.';
    }

    return nextErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      return;
    }

    setSubmitting(true);
    window.setTimeout(async () => {
      await register(form);
      navigate('/user/dashboard', { replace: true });
    }, 700);
  };

  if (currentUser) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin/dashboard' : '/user/dashboard'} replace />;
  }

  return (
    <AuthLayout
      title="Create your student account"
      subtitle="Register to search the library catalog, check due dates, and monitor borrowed books from one place."
      sideTitle="Join a smarter academic library experience."
      sideText="The registration flow uses client-side validation and drops users directly into a responsive dashboard powered by mock data."
      footer={
        <p className="mt-8 text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-600 transition hover:text-brand-700">
            Back to sign in
          </Link>
        </p>
      }
    >
      <form className="space-y-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Full name</label>
          <input
            type="text"
            className="field"
            placeholder="Your full name"
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
          />
          {errors.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            className="field"
            placeholder="student@college.edu"
            value={form.email}
            onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          />
          {errors.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Department</label>
          <input
            type="text"
            className="field"
            placeholder="Computer Science"
            value={form.department}
            onChange={(event) => setForm((prev) => ({ ...prev, department: event.target.value }))}
          />
          {errors.department ? <p className="text-sm text-red-500">{errors.department}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input
            type="password"
            className="field"
            placeholder="Create a strong password"
            value={form.password}
            onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))}
          />
          {errors.password ? <p className="text-sm text-red-500">{errors.password}</p> : null}
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium text-slate-700">Confirm password</label>
          <input
            type="password"
            className="field"
            placeholder="Repeat your password"
            value={form.confirmPassword}
            onChange={(event) => setForm((prev) => ({ ...prev, confirmPassword: event.target.value }))}
          />
          {errors.confirmPassword ? <p className="text-sm text-red-500">{errors.confirmPassword}</p> : null}
        </div>

        <button type="submit" className="btn-primary w-full" disabled={submitting}>
          {submitting ? 'Creating account...' : 'Create Account'}
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;
