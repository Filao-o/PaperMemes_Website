export interface WikiArticle {
  slug: string
  title: string
  description: string
  category: string
  content: string // HTML string
}

export interface WikiCategory {
  id: string
  label: string
  articles: WikiArticle[]
}

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    id: 'getting-started',
    label: 'Démarrage',
    articles: [
      {
        slug: 'installer',
        title: 'Installer PaperMemes',
        description: "Comment ajouter l'extension Chrome et la configurer en 2 minutes.",
        category: 'getting-started',
        content: `
<h1>Installer PaperMemes</h1>
<p>PaperMemes s'installe en quelques secondes depuis le Chrome Web Store. Aucun compte, aucun wallet réel, aucune carte bancaire requise.</p>

<h2>Étapes d'installation</h2>
<ol>
  <li>Ouvre le <strong>Chrome Web Store</strong> et recherche <em>PaperMemes</em>.</li>
  <li>Clique sur <strong>Ajouter à Chrome</strong> puis confirme.</li>
  <li>Épingle l'extension à ta barre d'outils via l'icône puzzle de Chrome.</li>
  <li>Clique sur l'icône PaperMemes — tu reçois immédiatement un solde virtuel en SOL.</li>
</ol>

<h2>Compatibilité</h2>
<p>PaperMemes fonctionne sur tous les navigateurs basés sur Chromium : Chrome, Brave, Edge, Arc.</p>

<h2>Première configuration</h2>
<p>Au premier lancement, choisis ta plateforme de trading préférée parmi <strong>Photon, GMGN, Bullx, Axiom</strong> ou <strong>Padre</strong>. Tu pourras en changer à tout moment depuis les paramètres.</p>
        `.trim(),
      },
      {
        slug: 'premiers-pas',
        title: 'Premiers pas',
        description: 'Comprendre le wallet virtuel, ouvrir ton premier trade et lire tes stats.',
        category: 'getting-started',
        content: `
<h1>Premiers pas</h1>
<p>Une fois l'extension installée, tu as un solde virtuel en SOL prêt à l'emploi. Voici comment ouvrir ton premier trade simulé.</p>

<h2>1. Naviguer sur une plateforme</h2>
<p>Va sur <strong>Photon, GMGN, Bullx, Axiom</strong> ou <strong>Padre</strong>. Le widget PaperMemes apparaît automatiquement sur la page du token.</p>

<h2>2. Choisir un montant</h2>
<p>Utilise les presets rapides (0.1, 0.5, 1, 5 SOL…) ou saisis un montant personnalisé. Clique sur <strong>Buy</strong> pour ouvrir la position.</p>

<h2>3. Suivre ta position</h2>
<p>Ton PnL se met à jour en temps réel. Tu peux vendre partiellement (10%, 25%, 50%) ou tout solder d'un coup.</p>

<h2>4. Lire tes stats</h2>
<p>Ouvre la popup PaperMemes et navigue dans les onglets <strong>Stats, Historique, Calendrier, PnL</strong> pour analyser tes performances.</p>
        `.trim(),
      },
    ],
  },
  {
    id: 'wallet',
    label: 'Wallet & Solde',
    articles: [
      {
        slug: 'wallet-sol',
        title: 'Wallet SOL virtuel',
        description: 'Comprendre le solde virtuel, les devises et la réinitialisation.',
        category: 'wallet',
        content: `
<h1>Wallet SOL virtuel</h1>
<p>PaperMemes te crédite d'un solde virtuel en SOL dès le lancement. Ce solde est entièrement fictif — aucun vrai SOL n'est jamais utilisé.</p>

<h2>Affichage SOL / USD</h2>
<p>Tu peux basculer l'affichage entre SOL et USD depuis les paramètres de l'extension. Le taux de conversion est récupéré en temps réel depuis Binance.</p>

<h2>Réinitialisation</h2>
<p>Deux options dans les paramètres :</p>
<ul>
  <li><strong>Reset solde uniquement</strong> — remet ton wallet à zéro mais conserve l'historique de tes trades.</li>
  <li><strong>Reset complet</strong> — efface solde et historique pour repartir de zéro.</li>
</ul>

<h2>Frais simulés</h2>
<p>PaperMemes simule des frais de trading configurables (défaut 1%). Ils sont déduits à chaque achat et vente pour se rapprocher des conditions réelles.</p>
        `.trim(),
      },
    ],
  },
  {
    id: 'trading',
    label: 'Trading',
    articles: [
      {
        slug: 'tp-sl',
        title: 'Take Profit / Stop Loss',
        description: 'Configurer des ordres automatiques TP et SL sur tes positions.',
        category: 'trading',
        content: `
<h1>Take Profit / Stop Loss</h1>
<p>PaperMemes te permet de configurer des ordres automatiques pour sécuriser tes gains et limiter tes pertes — exactement comme en trading réel.</p>

<h2>Take Profit (TP)</h2>
<p>Définit le niveau de gain auquel ta position se ferme automatiquement. Tu peux le configurer en :</p>
<ul>
  <li><strong>Pourcentage</strong> — ex : +50% pour vendre quand le trade gagne 50%.</li>
  <li><strong>Market Cap cible</strong> — ex : fermer à 10M$ de MC.</li>
</ul>

<h2>Stop Loss (SL)</h2>
<p>Définit le niveau de perte maximum toléré. La position se ferme automatiquement si le prix descend à ce seuil.</p>
<ul>
  <li>Presets disponibles : -10%, -25%, -50%, -75%, -100%</li>
</ul>

<h2>Déclenchement automatique</h2>
<p>PaperMemes surveille le prix en permanence pendant que tu navigues. Le TP ou SL se déclenche dès que le seuil est atteint, même si tu n'as pas la page du token ouverte.</p>
        `.trim(),
      },
      {
        slug: 'vente-partielle',
        title: 'Vente partielle & Sell Init.',
        description: "Solder partiellement une position ou récupérer sa mise initiale.",
        category: 'trading',
        content: `
<h1>Vente partielle & Sell Init.</h1>
<p>Tu n'es pas obligé de tout vendre d'un coup. PaperMemes propose deux modes de sortie partielle.</p>

<h2>Vente partielle</h2>
<p>Vends 10%, 25%, 50% ou 100% de ta position en un clic. Le reste continue à évoluer selon le marché.</p>

<h2>Sell Init. (Vendre les initiaux)</h2>
<p>Ce bouton calcule automatiquement le pourcentage de tokens à vendre pour récupérer exactement le montant initial investi. Il permet de "jouer avec la maison" une fois ta mise sécurisée.</p>

<h2>DCA (renforcement)</h2>
<p>Tu peux acheter plusieurs fois sur le même token. PaperMemes calcule automatiquement ton prix moyen d'entrée en pondérant chaque achat.</p>
        `.trim(),
      },
      {
        slug: 'presets-achat',
        title: "Presets d'achat",
        description: 'Personnaliser les boutons de montants rapides.',
        category: 'trading',
        content: `
<h1>Presets d'achat</h1>
<p>Les presets d'achat sont les boutons de montants rapides affichés dans le widget (ex : 0.1, 0.5, 1, 5 SOL). Tu peux les personnaliser entièrement.</p>

<h2>Modifier les presets</h2>
<ol>
  <li>Ouvre le widget sur une page de trading.</li>
  <li>Clique sur l'icône ⚙ dans le widget.</li>
  <li>Modifie les montants selon tes habitudes.</li>
  <li>Sauvegarde — les nouveaux presets s'appliquent immédiatement.</li>
</ol>

<p>Tu peux configurer jusqu'à 8 presets différents.</p>
        `.trim(),
      },
    ],
  },
  {
    id: 'analyse',
    label: 'Analyse',
    articles: [
      {
        slug: 'rugcheck',
        title: 'Rugcheck intégré',
        description: 'Analyser un token avant de trader : risque, holders, liquidité.',
        category: 'analyse',
        content: `
<h1>Rugcheck intégré</h1>
<p>Avant de trader un token, PaperMemes te donne une lecture rapide du risque grâce à une intégration avec <strong>RugCheck.xyz</strong>.</p>

<h2>Ce qui est analysé</h2>
<ul>
  <li><strong>Score de risque</strong> — note globale du token (Good, Warning, Danger).</li>
  <li><strong>Top holders</strong> — répartition des wallets dominant la supply. Une concentration élevée = risque de dump.</li>
  <li><strong>Liquidité</strong> — montant verrouillé en pool. Une liquidité faible = sortie difficile.</li>
</ul>

<h2>Comment l'utiliser</h2>
<p>Les informations s'affichent automatiquement dans le widget quand tu arrives sur la page d'un token compatible. Aucune action requise.</p>
        `.trim(),
      },
      {
        slug: 'stats',
        title: 'Stats & Analytics',
        description: 'Lire ses performances : PnL, win rate, meilleur trade.',
        category: 'analyse',
        content: `
<h1>Stats & Analytics</h1>
<p>L'onglet <strong>Stats</strong> de la popup PaperMemes centralise toutes tes métriques de performance.</p>

<h2>Métriques disponibles</h2>
<ul>
  <li><strong>PnL total</strong> — gain ou perte cumulé en SOL depuis le début.</li>
  <li><strong>Win rate</strong> — pourcentage de trades gagnants sur le total fermé.</li>
  <li><strong>Meilleur trade</strong> — ta meilleure performance en % sur une position.</li>
  <li><strong>Trades actifs / fermés</strong> — nombre de positions en cours et clôturées.</li>
</ul>

<h2>Calendrier de performances</h2>
<p>L'onglet <strong>Calendrier</strong> affiche tes PnL jour par jour. Identifie tes meilleures séquences et tes journées de drawdown d'un coup d'œil.</p>

<h2>Dashboard web</h2>
<p>Connecte-toi sur <a href="/dashboard">papermemes.io/dashboard</a> pour retrouver l'ensemble de tes trades et stats sur une interface plus large, depuis n'importe quel appareil.</p>
        `.trim(),
      },
    ],
  },
  {
    id: 'compte',
    label: 'Compte & Sync',
    articles: [
      {
        slug: 'connexion',
        title: 'Créer un compte',
        description: 'Créer un compte PaperMemes pour synchroniser ses données.',
        category: 'compte',
        content: `
<h1>Créer un compte</h1>
<p>Un compte PaperMemes est optionnel mais recommandé : il synchronise tes trades et stats sur le cloud et les rend accessibles depuis le dashboard web.</p>

<h2>Méthodes de connexion</h2>
<ul>
  <li><strong>Google</strong> — connexion en un clic, recommandée.</li>
  <li><strong>Email / mot de passe</strong> — inscription classique.</li>
</ul>

<h2>Comment se connecter</h2>
<ol>
  <li>Ouvre la popup PaperMemes.</li>
  <li>Un modal de connexion apparaît au premier lancement.</li>
  <li>Choisis Google ou email.</li>
  <li>Tes données se synchronisent automatiquement.</li>
</ol>
        `.trim(),
      },
      {
        slug: 'sync',
        title: 'Synchronisation cloud',
        description: "Comment tes trades sont synchronisés entre l'extension et le dashboard.",
        category: 'compte',
        content: `
<h1>Synchronisation cloud</h1>
<p>Une fois connecté, PaperMemes synchronise automatiquement tes données vers le cloud (Firebase Firestore).</p>

<h2>Ce qui est synchronisé</h2>
<ul>
  <li>Solde SOL virtuel</li>
  <li>Trade actif en cours</li>
  <li>Historique complet des trades fermés</li>
  <li>Paramètres (langue, frais, presets…)</li>
</ul>

<h2>Accès depuis le dashboard</h2>
<p>Connecte-toi sur <a href="/dashboard">papermemes.io/dashboard</a> avec le même compte Google pour retrouver toutes tes données. La synchro est quasi temps-réel (délai &lt; 2 secondes après une action).</p>

<h2>Wallet Solana</h2>
<p>Tu peux renseigner ton adresse de wallet Solana réel dans les paramètres du compte. Ce champ est informatif uniquement — PaperMemes n'a jamais accès à tes fonds.</p>
        `.trim(),
      },
    ],
  },
]

export function getAllArticles(): WikiArticle[] {
  return WIKI_CATEGORIES.flatMap(c => c.articles)
}

export function getArticle(slug: string): WikiArticle | undefined {
  return getAllArticles().find(a => a.slug === slug)
}

export function getAdjacentArticles(slug: string): { prev: WikiArticle | null; next: WikiArticle | null } {
  const all = getAllArticles()
  const idx = all.findIndex(a => a.slug === slug)
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx < all.length - 1 ? all[idx + 1] : null,
  }
}
