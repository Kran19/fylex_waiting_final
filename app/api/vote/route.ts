import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/** Extract real IP from request headers */
function getIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const real = request.headers.get('x-real-ip');
  if (real) return real.trim();
  return '127.0.0.1'; // fallback for local dev
}

/** Get live vote percentages from DB */
async function getPercentages(): Promise<{ percentages: Record<number, number>; totalVotes: number }> {
  const counts = await prisma.vote.groupBy({
    by: ['watchId'],
    _count: { watchId: true },
  });
  const totalVotes = counts.reduce((sum, c) => sum + c._count.watchId, 0);
  const percentages: Record<number, number> = {};
  for (const c of counts) {
    percentages[c.watchId] = totalVotes === 0 ? 0 : Math.round((c._count.watchId / totalVotes) * 100);
  }
  // Ensure all 4 IDs are always present
  [1, 2, 3, 4].forEach(id => { if (!(id in percentages)) percentages[id] = 0; });
  return { percentages, totalVotes };
}

// ─── GET /api/vote ────────────────────────────────────────────────────────────
// Called on page load. Returns whether this IP already voted + live percentages.
export async function GET(request: Request) {
  const ip = getIp(request);
  const { percentages, totalVotes } = await getPercentages();

  const existing = await prisma.vote.findUnique({ where: { ip } });

  return NextResponse.json({
    success: true,
    hasVoted: !!existing,
    watchId: existing?.watchId ?? null,
    percentages,
    totalVotes,
  });
}

// ─── POST /api/vote ───────────────────────────────────────────────────────────
// Body: { watchId: number }
// Saves the vote for this IP and returns updated percentages.
export async function POST(request: Request) {
  try {
    const ip = getIp(request);
    const body = await request.json();
    const watchId = Number(body.watchId);

    if (!watchId || ![1, 2, 3, 4].includes(watchId)) {
      return NextResponse.json({ success: false, error: 'Invalid watchId' }, { status: 400 });
    }

    // upsert: create if not exists, skip update if already voted (preserves first vote)
    await prisma.vote.upsert({
      where: { ip },
      update: {},            // intentionally empty — first vote wins
      create: { ip, watchId },
    });

    const { percentages, totalVotes } = await getPercentages();

    // Return the watchId that is actually stored (in case they already voted)
    const stored = await prisma.vote.findUnique({ where: { ip } });

    return NextResponse.json({
      success: true,
      watchId: stored?.watchId ?? watchId,
      percentages,
      totalVotes,
    });
  } catch (error) {
    console.error('Vote POST error:', error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
