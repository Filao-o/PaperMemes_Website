/**
 * Seed Firestore with realistic fake trade data for local/dev testing.
 *
 * Prerequisites:
 *   1. npm install -D firebase-admin   (once)
 *   2. Download a service account key:
 *      Firebase Console → Project Settings → Service accounts → Generate new private key
 *      Save the JSON as  scripts/service-account.json  (already gitignored)
 *   3. Get YOUR Firebase UID:
 *      Sign in on the website → open browser devtools → run:
 *        firebase.auth().currentUser.uid
 *      OR check Firebase Console → Authentication → Users → copy your UID
 *
 * Usage:
 *   node scripts/seed-firestore.mjs <YOUR_FIREBASE_UID>
 *
 * Run it once. Re-running replaces the existing test document.
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const uid = process.argv[2];
if (!uid) {
  console.error('Usage: node scripts/seed-firestore.mjs <FIREBASE_UID>');
  process.exit(1);
}

const serviceAccountPath = path.join(__dirname, 'service-account.json');
let serviceAccount;
try {
  serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));
} catch {
  console.error('❌  service-account.json introuvable dans scripts/');
  console.error('   Télécharge-le depuis Firebase Console → Project Settings → Service accounts');
  process.exit(1);
}

const admin = require('firebase-admin');
if (!admin.apps.length) {
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
}
const db = admin.firestore();

// ─── Fake data helpers ──────────────────────────────────────────────────────

function rand(min, max) { return Math.random() * (max - min) + min; }
function randInt(min, max) { return Math.floor(rand(min, max)); }
function daysAgo(n) { return Date.now() - n * 86_400_000; }

const TOKENS = [
  'BONK', 'WIF', 'POPCAT', 'MEW', 'BRETT', 'SLERF', 'BOME',
  'MICHI', 'PONKE', 'MYRO', 'FLOKI', 'PEPE', 'TURBO',
];
const TERMINALS = ['Photon', 'GMGN', 'Axiom', 'Padre', 'BullX'];

function makeTrade(i) {
  const won = Math.random() > 0.42;
  const invested = parseFloat(rand(0.1, 2.5).toFixed(4));
  const entryMC = randInt(50_000, 5_000_000);
  const pnlPct = won ? rand(5, 300) : -rand(5, 90);
  const pnlSOL = parseFloat((invested * pnlPct / 100).toFixed(4));
  const openedAt = daysAgo(randInt(1, 60));
  const entryPrice = parseFloat((rand(0.000001, 0.0001)).toFixed(8));
  const tokensHeld = parseFloat((invested / entryPrice).toFixed(0));

  return {
    id: `test-trade-${i}-${Date.now()}`,
    tokenName: TOKENS[i % TOKENS.length],
    mintAddress: `FAKE${i}MINT`.padEnd(44, 'x'),
    terminal: TERMINALS[i % TERMINALS.length],
    status: won ? 'won' : 'lost',
    openedAt,
    closedAt: openedAt + randInt(600_000, 86_400_000),
    pnlSOL,
    pnlPercent: parseFloat(pnlPct.toFixed(2)),
    tokensHeld,
    invested,
    entryPrice,
    entryMC,
    tp: won ? parseFloat(rand(10, 200).toFixed(1)) : null,
    sl: parseFloat((-rand(10, 50)).toFixed(1)),
    tpMC: null,
    entries: [{
      entryPrice,
      entryMC,
      invested,
      tokensHeld,
      timestamp: openedAt,
    }],
    closeEvents: [{
      id: `ce-${i}`,
      priceAtClose: parseFloat((entryPrice * (1 + pnlPct / 100)).toFixed(8)),
      mcAtClose: Math.round(entryMC * (1 + pnlPct / 100)),
      sellPercent: 100,
      solReturned: parseFloat((invested + pnlSOL).toFixed(4)),
      closedAt: openedAt + randInt(600_000, 86_400_000),
      timestamp: openedAt + randInt(600_000, 86_400_000),
    }],
  };
}

function makeActiveTrade() {
  const invested = parseFloat(rand(0.2, 1.5).toFixed(4));
  const entryMC = randInt(200_000, 2_000_000);
  const entryPrice = parseFloat(rand(0.000001, 0.0001).toFixed(8));
  const openedAt = daysAgo(rand(0.1, 2));
  return {
    id: 'test-active-trade',
    tokenName: 'PNUT',
    mintAddress: 'FAKEACTIVEMINTxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    terminal: 'Axiom',
    status: 'active',
    openedAt,
    closedAt: null,
    pnlSOL: null,
    pnlPercent: null,
    tokensHeld: parseFloat((invested / entryPrice).toFixed(0)),
    invested,
    entryPrice,
    entryMC,
    tp: 50,
    sl: -25,
    tpMC: null,
    entries: [{ entryPrice, entryMC, invested, tokensHeld: parseFloat((invested / entryPrice).toFixed(0)), timestamp: openedAt }],
    closeEvents: [],
  };
}

// ─── Build document ──────────────────────────────────────────────────────────

const NUM_TRADES = 18;
const closedTrades = Array.from({ length: NUM_TRADES }, (_, i) => makeTrade(i));

const userDoc = {
  email: `test-user-${uid.slice(0, 6)}@papermemes.dev`,
  balance: parseFloat(rand(5, 25).toFixed(4)),
  activeTrade: makeActiveTrade(),
  closedTrades,
};

// ─── Write ───────────────────────────────────────────────────────────────────

console.log(`\n📝  Seeding Firestore  →  users/${uid}`);
console.log(`   ${NUM_TRADES} trades fermés + 1 trade actif`);

await db.collection('users').doc(uid).set(userDoc);

console.log('✅  Done. Lance le website (npm run dev) et connecte-toi pour voir le dashboard.\n');
process.exit(0);
