export interface TradeEntry {
  entryPrice: number;
  entryMC: number;
  invested: number;
  tokensHeld: number;
  timestamp: number;
}

export interface CloseEvent {
  id: string;
  priceAtClose: number;
  mcAtClose: number;
  sellPercent: number;
  solReturned: number;
  closedAt: number;
  timestamp: number;
}

export interface Trade {
  id: string;
  tokenName: string;
  mintAddress: string;
  terminal: string;
  status: 'won' | 'lost' | 'active' | 'closed';
  openedAt: number;
  closedAt: number | null;
  pnlSOL: number | null;
  pnlPercent: number | null;
  tokensHeld: number;
  invested: number;        // root-level (extension schema)
  entryPrice: number;
  entryMC: number;
  tp: number | null;
  sl: number | null;
  tpMC: number | null;
  entries?: TradeEntry[];  // optional (older extension versions omit it)
  closeEvents: CloseEvent[];
}

export interface UserDocument {
  balance: number;
  activeTrade: Trade | null;
  closedTrades: Trade[];
}

export interface DashboardStats {
  totalTrades: number;
  wins: number;
  losses: number;
  winRate: number;
  totalPnlSOL: number;
  totalInvested: number;
  bestTrade: Trade | null;
  worstTrade: Trade | null;
  avgPnlPercent: number;
  currentBalance: number;
}
