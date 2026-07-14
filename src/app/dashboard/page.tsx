'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDocument, computeStats, formatSOL, formatPct, formatDate, formatMC } from '@/lib/firestore';
import type { UserDocument, DashboardStats, Trade } from '@/types/firestore';

type Filter = 'all' | 'won' | 'lost';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<UserDocument | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [fetching, setFetching] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getUserDocument(user.uid, user.email)
      .then(doc => {
        if (!doc) { setError('Aucune donnée trouvée. Lance l\'extension PaperMemes pour commencer.'); return; }
        setData(doc);
        setStats(computeStats(doc));
      })
      .catch(() => setError('Erreur de chargement des données.'))
      .finally(() => setFetching(false));
  }, [user]);

  if (loading || (!data && fetching)) return <main className="dashboard-loading"><div className="dashboard-spinner" /></main>;

  const trades = (data?.closedTrades ?? []).slice().reverse();
  const filtered: Trade[] = filter === 'all' ? trades : trades.filter(t => t.status === filter);

  return (
    <main className="dashboard-page">
      <div className="container">

        {/* Header */}
        <div className="dash-header">
          <div>
            <p className="section-tag">Dashboard</p>
            <h1 className="dash-title">Overview</h1>
          </div>
          <div className="dash-balance">
            <span className="dash-balance-label">Balance actuelle</span>
            <span className="dash-balance-value">{formatSOL(data?.balance ?? 0)}</span>
          </div>
        </div>

        {error && <p className="dash-error">{error}</p>}

        {stats && (
          <>
            {/* Stats grid */}
            <div className="dash-stats">
              <StatCard
                label="PnL total"
                value={formatSOL(stats.totalPnlSOL)}
                sub={formatPct(stats.totalInvested > 0 ? (stats.totalPnlSOL / stats.totalInvested) * 100 : 0)}
                positive={stats.totalPnlSOL >= 0}
              />
              <StatCard
                label="Win rate"
                value={stats.winRate.toFixed(1) + '%'}
                sub={`${stats.wins}W / ${stats.losses}L`}
                positive={stats.winRate >= 50}
              />
              <StatCard
                label="Trades fermés"
                value={stats.totalTrades.toString()}
                sub={`Moy. ${formatPct(stats.avgPnlPercent)} / trade`}
              />
              <StatCard
                label="Meilleur trade"
                value={stats.bestTrade ? formatPct(stats.bestTrade.pnlPercent ?? 0) : '—'}
                sub={stats.bestTrade?.tokenName ?? ''}
                positive
              />
              <StatCard
                label="Pire trade"
                value={stats.worstTrade ? formatPct(stats.worstTrade.pnlPercent ?? 0) : '—'}
                sub={stats.worstTrade?.tokenName ?? ''}
                positive={false}
              />
              <StatCard
                label="Total investi"
                value={formatSOL(stats.totalInvested)}
                sub="sur tous les trades"
              />
            </div>

            {/* Active trade */}
            {data?.activeTrade && (
              <div className="dash-section">
                <h2 className="dash-section-title">Trade actif</h2>
                <div className="dash-active-trade">
                  <div className="dat-token">{data.activeTrade.tokenName}</div>
                  <div className="dat-meta">
                    <span className="dat-terminal">{data.activeTrade.terminal}</span>
                    <span className="dat-date">{formatDate(data.activeTrade.openedAt)}</span>
                  </div>
                  <div className="dat-entries">
                    {data.activeTrade.entries?.map((e, i) => (
                      <div key={i} className="dat-entry">
                        <span>{formatSOL(e.invested)} misé</span>
                        <span>MC entrée : {formatMC(e.entryMC)}</span>
                        <span>{e.entryPrice.toExponential(4)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Trade history */}
            <div className="dash-section">
              <div className="dash-section-head">
                <h2 className="dash-section-title">Historique</h2>
                <div className="dash-filters">
                  {(['all', 'won', 'lost'] as Filter[]).map(f => (
                    <button
                      key={f}
                      className={`dash-filter${filter === f ? ' active' : ''}`}
                      onClick={() => setFilter(f)}
                    >
                      {f === 'all' ? 'Tous' : f === 'won' ? 'Gains' : 'Pertes'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="dash-trades">
                {filtered.length === 0 && (
                  <p className="dash-empty">Aucun trade dans cette catégorie.</p>
                )}
                {filtered.map((trade, i) => (
                  <Link key={trade.id ?? i} href={`/dashboard/${encodeURIComponent(trade.id)}`} className="trade-row">
                    <div className="trade-row-left">
                      <span className={`trade-status-dot ${trade.status}`} />
                      <div>
                        <span className="trade-token">{trade.tokenName}</span>
                        <span className="trade-meta">{trade.terminal} · {formatDate(trade.openedAt)}</span>
                      </div>
                    </div>
                    <div className="trade-row-right">
                      <span className={`trade-pnl ${(trade.pnlSOL ?? 0) >= 0 ? 'pos' : 'neg'}`}>
                        {formatSOL(trade.pnlSOL ?? 0)}
                      </span>
                      <span className={`trade-pct ${(trade.pnlSOL ?? 0) >= 0 ? 'pos' : 'neg'}`}>
                        {formatPct(trade.pnlPercent ?? 0)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

function StatCard({ label, value, sub, positive }: {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
}) {
  const colored = positive !== undefined;
  return (
    <div className="stat-card">
      <span className="stat-label">{label}</span>
      <span className={`stat-value${colored ? (positive ? ' pos' : ' neg') : ''}`}>{value}</span>
      {sub && <span className="stat-sub">{sub}</span>}
    </div>
  );
}
