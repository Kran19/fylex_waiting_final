import { AdminClient } from './AdminClient';
import prisma from '@/lib/db';
import { logout } from '@/app/actions/auth';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  // Fetch all waitlist entries, ordered by newest first
  const entries = await prisma.waitlist.findMany({
    orderBy: {
      created_at: 'desc'
    }
  });

  return (
    <div className="min-h-screen bg-neutral-950 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Waitlist Dashboard</h1>
            <p className="text-neutral-400">Manage and view all registered users.</p>
          </div>
          <form action={logout}>
            <button
              type="submit"
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium"
            >
              Sign Out
            </button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
            <h3 className="text-neutral-400 text-sm font-medium mb-1">Total Signups</h3>
            <p className="text-4xl font-bold text-white">{entries.length}</p>
          </div>
        </div>

        <AdminClient entries={entries} />
      </div>
    </div>
  );
}
