import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wiki Papermemes — Guide & documentation',
  description: "Le guide complet de PaperMemes : installation, wallet virtuel, TP/SL, rugcheck, analytics et plus.",
};

const RUBRICS = [
  {
    id: 'installer',
    title: 'Installer PaperMemes',
    body: "Ajoute l'extension à Chrome depuis le Chrome Web Store, épingle-la à ta barre d'outils, et lance-la en un clic. Aucun compte, aucun wallet réel, aucune carte bancaire — tu reçois un solde virtuel en SOL immédiatement.",
  },
  {
    id: 'wallet',
    title: 'Wallet SOL virtuel',
    body: "Un solde virtuel en SOL est crédité dès le lancement. Bascule l'affichage entre SOL et USD, et réinitialise ton wallet au montant de ton choix à tout moment pour repartir de zéro.",
  },
  {
    id: 'tp-sl',
    title: 'Take Profit / Stop Loss',
    body: "Configure des ordres Take Profit et Stop Loss avec des presets de +10% à +100% (et -10% à -100%). Dès que le prix cible est atteint, l'ordre s'exécute automatiquement dans la simulation.",
  },
  {
    id: 'rugcheck',
    title: 'Rugcheck intégré',
    body: "Avant chaque trade, PaperMemes analyse le token : score de risque, répartition des top holders et liquidité. Tu prends tes décisions avec une lecture claire du danger.",
  },
  {
    id: 'analytics',
    title: 'Stats & Analytics',
    body: "PnL total, win rate, meilleur trade, nombre de positions ouvertes et fermées : toutes tes statistiques clés sont réunies pour lire ta progression semaine après semaine.",
  },
  {
    id: 'historique',
    title: 'Historique filtrable',
    body: "Filtre l'historique de tes trades par All, Active, Gain ou Loss. Retrouve instantanément tes meilleures et pires positions pour en tirer des enseignements concrets.",
  },
  {
    id: 'calendrier',
    title: 'Calendrier de performances',
    body: "Visualise tes gains et pertes jour par jour, en vue hebdomadaire ou mensuelle. Identifie tes meilleures séquences et tes journées de drawdown d'un coup d'œil.",
  },
  {
    id: 'widget',
    title: 'Widget détachable',
    body: "Un widget en trois blocs : wallet SOL, informations du token et gestion des positions avec les boutons Take Profit et Stop Loss. Détache-le pour garder tes positions à l'œil en permanence.",
  },
  {
    id: 'suivi',
    title: 'Suivi des entrées',
    body: "Visualise chaque entrée effectuée sur une position : date et heure de l'opération, montant de SOL investi et total de SOL retiré. Une traçabilité complète de tes mouvements.",
  },
];

export default function WikiPage() {
  return (
    <main className="legal-page wiki-page">
      <div className="container">
        <p className="section-tag">Wiki Papermemes</p>
        <h1>Guide &amp; documentation</h1>
        <p>
          Tout ce qu&apos;il faut savoir pour prendre en main PaperMemes. Choisis une rubrique ci-dessous
          ou fais défiler pour tout parcourir.
        </p>

        <nav className="wiki-toc" aria-label="Sommaire du wiki">
          {RUBRICS.map(r => (
            <a key={r.id} href={`#${r.id}`}>{r.title}</a>
          ))}
        </nav>

        {RUBRICS.map(r => (
          <section key={r.id} className="wiki-rubric">
            <h2 id={r.id}>{r.title}</h2>
            <p>{r.body}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
