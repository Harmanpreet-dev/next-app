'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        'http://localhost:5001/api/auth/register', // change if different
        {
          name,
          email,
          password,
        }
      );

      setSuccess(res.data.message);

      setTimeout(() => {
        router.push('/auth/login');
      }, 1500);
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as {
          response?: { data?: { message?: string } };
        };

        setError(err.response?.data?.message || 'Something went wrong');
      } else {
        setError('Something went wrong');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background-dark flex min-h-screen items-center justify-center px-4">
      <div className="bg-surface-dark w-full max-w-md rounded-2xl border border-white/10 p-8 shadow-xl">
        <h1 className="mb-6 text-center text-2xl font-bold">Create Account</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-text-dim mb-1 block text-sm">Name</label>
            <input
              type="text"
              className="bg-background-dark focus:ring-primary w-full rounded-lg border border-white/10 px-4 py-2 focus:ring-2 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="text-text-dim mb-1 block text-sm">Email</label>
            <input
              type="email"
              className="bg-background-dark focus:ring-primary w-full rounded-lg border border-white/10 px-4 py-2 focus:ring-2 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="text-text-dim mb-1 block text-sm">Password</label>
            <input
              type="password"
              className="bg-background-dark focus:ring-primary w-full rounded-lg border border-white/10 px-4 py-2 focus:ring-2 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          {success && <p className="text-sm text-green-400">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary-hover mt-2 rounded-lg py-2 font-semibold transition disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className="text-text-dim mt-6 text-center text-sm">
          Already have an account?{' '}
          <span className="text-primary cursor-pointer" onClick={() => router.push('/auth/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
