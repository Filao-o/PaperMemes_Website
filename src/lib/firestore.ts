import { doc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import type { UserDocument, DashboardStats, Trade } from '@/types/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCzxF6Ht4c-cGFT-QYY0m0dk6KYsf87B18',
  authDomain: 'papermemes-fd969.firebaseapp.com',
  projectId: 'papermemes-fd969',
  storageBucket: 'papermemes-fd969.firebasestorage.app',
  messagingSenderId: '1093050907458',
  appId: '1:1093050907458:web:d135de6fbb3c4a501ca6db',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getUserDocument(uid: string): Promise<UserDocument | null> {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return snap.data() as UserDocument;
}

export function computeStats(data: UserDocument): DashboardStats {
  const trades = data.closedTrades ?? [];

  const wins = trades.filter(t => t.status === 'won');
  const losses = trades.filter(t => t.status === 'lost');

  const totalPnlSOL = trades.reduce((sum, t) => sum + (t.pnlSOL ?? 0), 0);
  const totalInvested = trades.reduce((sum, t) => {
    const inv = t.entries?.reduce((s, e) => s + (e.invested ?? 0), 0) ?? 0;
    return sum + inv;
  }, 0);

  const avgPnlPercent =
    trades.length > 0
      ? trades.reduce((sum, t) => sum + (t.pnlPercent ?? 0), 0) / trades.length
      : 0;

  const bestTrade = trades.reduce<Trade | null>((best, t) => {
    if (!best) return t;
    return t.pnlSOL > best.pnlSOL ? t : best;
  }, null);

  const worstTrade = trades.reduce<Trade | null>((worst, t) => {
    if (!worst) return t;
    return t.pnlSOL < worst.pnlSOL ? t : worst;
  }, null);

  return {
    totalTrades: trades.length,
    wins: wins.length,
    losses: losses.length,
    winRate: trades.length > 0 ? (wins.length / trades.length) * 100 : 0,
    totalPnlSOL,
    totalInvested,
    bestTrade,
    worstTrade,
    avgPnlPercent,
    currentBalance: data.balance ?? 0,
  };
}

export function formatSOL(n: number): string {
  return n.toFixed(4) + ' SOL';
}

export function formatPct(n: number): string {
  return (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
}

export function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatMC(mc: number): string {
  if (mc >= 1_000_000) return (mc / 1_000_000).toFixed(2) + 'M';
  if (mc >= 1_000) return (mc / 1_000).toFixed(1) + 'K';
  return mc.toString();
}
