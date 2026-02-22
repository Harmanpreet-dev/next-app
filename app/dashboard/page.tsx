'use client';

import { useRouter } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function Dashboard() {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/logout', {
      method: 'POST',
    });

    router.push('/auth/login');
  }

  return (
    <div className="bg-background-dark min-h-screen p-10 text-white">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="rounded-lg bg-red-500 px-4 py-2 font-semibold transition hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <p className="text-text-dim">You are successfully logged in 🎉</p>
    </div>
  );
}
