'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { getUserDocument, formatSOL, formatPct, formatDate, formatMC } from '@/lib/firestore';
import type { Trade } from '@/types/firestore';

export default function TradeDetailPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const tradeId = decodeURIComponent(params.tradeId as string);
  const [trade, setTrade] = useState<Trade | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  useEffect(() => {
    if (!user) return;
    getUserDocument(user.uid).then(doc => {
      if (!doc) return;
      const found = doc.closedTrades?.find(t => t.id === tradeId) ?? null;
      setTrade(found);
    }).finally(() => setFetching(false));
  }, [user, tradeId]);

  if (loading || fetching) return <main className="dashboard-loading"><div className="dashboard-spinner" /></main>;
  if (!trade) return (
    <main className="dashboard-page">
      <div className="container">
        <Link href="/dashboard" className="dash-back">← Retour au dashboard</Link>
        <p className="dash-error">Trade introuvable.</p>
      </div>
    </main>
  );

  const totalInvested = trade.entries?.reduce((s, e) => s + e.invested, 0) ?? 0;
  const totalReturned = trade.closeEvents?.reduce((s, e) => s + e.solReturned, 0) ?? 0;
  const lastClose = trade.closeEvents?.[trade.closeEvents.length - 1];
  const firstEntry = trade.entries?.[0];

  const mcMultiple = firstEntry && lastClose
    ? lastClose.mcAtClose / firstEntry.entryMC
    : null;

  return (
    <main className="dashboard-page">
      <div className="container">
        <Link href="/dashboard" className="dash-back">← Retour au dashboard</Link>

        <div className="trade-detail-header">
          <div className="trade-detail-title">
            <span className={`trade-status-badge ${trade.status}`}>
              {trade.status === 'won' ? 'Gain' : 'Perte'}
            </span>
            <h1>{trade.tokenName}</h1>
            <span className="trade-detail-terminal">{trade.terminal}</span>
          </div>
          <div className={`trade-detail-pnl ${trade.pnlSOL >= 0 ? 'pos' : 'neg'}`}>
            <span className="tdp-sol">{formatSOL(trade.pnlSOL)}</span>
            <span className="tdp-pct">{formatPct(trade.pnlPercent)}</span>
          </div>
        </div>

        {/* Key metrics */}
        <div className="trade-metrics">
          <MetricRow label="Token" value={trade.tokenName} />
          <MetricRow label="Mint address" value={trade.mintAddress} mono truncate />
          <MetricRow label="Ouvert le" value={formatDate(trade.openedAt)} />
          {lastClose && <MetricRow label="Fermé le" value={formatDate(lastClose.closedAt)} />}
          <MetricRow label="SOL investi" value={formatSOL(totalInvested)} />
          <MetricRow label="SOL récupéré" value={formatSOL(totalReturned)} />
          <MetricRow label="PnL" value={`${formatSOL(trade.pnlSOL)} (${formatPct(trade.pnlPercent)})`} colored={trade.pnlSOL >= 0} />
          {firstEntry && <MetricRow label="MC à l'entrée" value={formatMC(firstEntry.entryMC)} />}
          {lastClose && <MetricRow label="MC à la sortie" value={formatMC(lastClose.mcAtClose)} />}
          {mcMultiple !== null && <MetricRow label="Multiple MC" value={mcMultiple.toFixed(2) + 'x'} />}
          {trade.tp !== null && <MetricRow label="Take Profit" value={formatPct(trade.tp)} />}
          {trade.sl !== null && <MetricRow label="Stop Loss" value={formatPct(trade.sl)} />}
        </div>

        {/* Entries */}
        {trade.entries && trade.entries.length > 0 && (
          <div className="dash-section">
            <h2 className="dash-section-title">Entrées ({trade.entries.length})</h2>
            <div className="event-list">
              {trade.entries.map((e, i) => (
                <div key={i} className="event-row">
                  <div className="event-row-left">
                    <span className="event-badge entry">Achat</span>
                    <span className="event-date">{formatDate(e.timestamp)}</span>
                  </div>
                  <div className="event-row-right">
                    <span className="event-detail">{formatSOL(e.invested)} misé</span>
                    <span className="event-detail muted">MC : {formatMC(e.entryMC)}</span>
                    <span className="event-detail muted">{e.entryPrice.toExponential(4)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Close events */}
        {trade.closeEvents && trade.closeEvents.length > 0 && (
          <div className="dash-section">
            <h2 className="dash-section-title">Sorties ({trade.closeEvents.length})</h2>
            <div className="event-list">
              {trade.closeEvents.map((e, i) => (
                <div key={i} className="event-row">
                  <div className="event-row-left">
                    <span className="event-badge close">Vente {e.sellPercent}%</span>
                    <span className="event-date">{formatDate(e.closedAt)}</span>
                  </div>
                  <div className="event-row-right">
                    <span className="event-detail">{formatSOL(e.solReturned)} récupéré</span>
                    <span className="event-detail muted">MC : {formatMC(e.mcAtClose)}</span>
                    <span className="event-detail muted">{e.priceAtClose.toExponential(4)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function MetricRow({ label, value, mono, truncate, colored }: {
  label: string;
  value: string;
  mono?: boolean;
  truncate?: boolean;
  colored?: boolean;
}) {
  return (
    <div className="metric-row">
      <span className="metric-label">{label}</span>
      <span className={`metric-value${mono ? ' mono' : ''}${truncate ? ' truncate' : ''}${colored === true ? ' pos' : colored === false ? ' neg' : ''}`}>
        {value}
      </span>
    </div>
  );
}
