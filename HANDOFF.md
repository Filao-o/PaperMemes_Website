# Papermemes Website — Handoff Document
> Pour reprendre le projet comme si c'était le même chat. Lis tout avant de commencer.

---

## Projet

**Papermemes** est une extension Chrome de paper trading de memecoins sur Solana (wallet virtuel en SOL, prix de marché réels, zéro risque financier). Ce repo contient uniquement le **site marketing statique** (HTML/CSS/JS, pas de framework).

- **Repo GitHub :** https://github.com/Ulrich440/PaperMemes_Website
- **Stack :** HTML5 + CSS3 + JS vanilla, aucune dépendance npm
- **Dossier local :** `C:\Users\armou\Desktop\IA`

---

## Structure des fichiers

```
IA/
├── index.html          # Page unique (toutes les sections)
├── styles.css          # Tout le CSS
├── script.js           # Tout le JS
├── Logo/               # Logos PNG (fond transparent, removebg)
│   ├── logo_PaperMeme-removebg-preview.png   ← logo principal (577×433px)
│   ├── Axiom_-_Modifié-removebg-preview.png
│   ├── Gmgn-removebg-preview.png
│   ├── Photon_-_Modifié-removebg-preview.png
│   └── padre_-_Modifié-removebg-preview.png
└── Image/              # Screenshots de l'extension
    ├── wallet.png
    ├── trading-interface.png.png
    ├── Takeprofit.png
    ├── analytics.png
    ├── Interface_extension.png
    ├── calendrier.png
    └── parametres.png.png
```

> **Attention :** dans `index.html`, les chemins d'images utilisent `logo/` et `image/` en **minuscule** mais les dossiers sont `Logo/` et `Image/` avec majuscule. Ça fonctionne sur Windows (case-insensitive) mais peut casser sur Linux (serveur). À corriger si déploiement Linux.

---

## Sections de la page (ordre dans index.html)

| Section | ID | Description |
|---|---|---|
| Nav | `#nav` | Floating pill glassmorphism, sticky top:20px |
| Hero | `#hero` | Canvas pixel animation, titre shimmer, ticker plateformes |
| Suite | `#suite` | Accordion 4 items + aperçu image (Features) |
| How it works | `#how` | 3 cartes glow effet spotlight |
| Why us | `#why` | 6 cartes grille SVG pattern + témoignages |
| FAQ | `#faq` | Accordion |
| Footer | footer | Logo + colonnes liens + réseaux sociaux |

---

## Effets visuels clés — comprendre avant de toucher

### 1. Pixel Canvas (Hero)
- `<canvas id="heroCanvas">` couvre tout le hero
- JS IIFE dans `script.js` (~ligne 158) : grille de pixels blancs semi-transparents, animation d'apparition avec délai radial depuis le centre, puis shimmer infini
- `ResizeObserver` re-initialise sur resize

### 2. Glow Cards (section How it works)
- Cartes `[data-glow]` avec spotlight vert qui suit la souris
- CSS custom properties `--x`, `--y`, `--xp`, `--yp` mis à jour par JS via `getBoundingClientRect()` (coordonnées **locales** à chaque carte, pas viewport)
- Couleur varie blanc→vert selon position X (`--sat`, `--lit`)
- `::before` et `::after` pseudo-éléments avec `mask-composite: intersect` pour l'effet bordure lumineuse

### 3. Why Cards (section Why us)
- Pattern grille SVG injecté par JS (IIFE ~ligne 277 dans script.js) dans chaque `.why-card`
- Carrés aléatoires générés avec `genSquares()`, SVG avec `<pattern>` et `mask-image: linear-gradient`
- Pas de `[data-glow]` sur ces cartes — effet purement statique

### 4. Hero titre shimmer (Pixel Glass Text)
- `.pixel-glass-text` : `background-clip: text`, gradient animé 200% → 0% en 8s
- Deux mots avec polices différentes : `<em class="hero-word1">Paper</em>` (Inter italic 300) + `<span class="hero-word2">Memes.</span>` (Space Grotesk 800)

### 5. Ticker plateformes (bas du hero)
- `#heroBottomTicker` : 4 sets de 4 logos pour loop seamless
- JS : reset position à `scrollWidth/4` pour boucle parfaite

### 6. Suite accordion
- Auto-advance toutes les 5000ms avec barre de progression animée CSS (`width: 0% → 100%` en `linear`)
- Pause au hover sur la section

---

## Règles CSS impératives — NE PAS ENFREINDRE

### Valeurs en px directs uniquement
```css
/* ✅ CORRECT */
margin-bottom: 4px;
gap: 12px;
padding: 24px;

/* ❌ JAMAIS */
margin-bottom: var(--sp-2);
gap: var(--sp-3);
```
Le projet a des variables `--sp-X` définies dans le CSS **mais on ne les utilise pas** pour les nouvelles valeurs. Toujours écrire en px.

---

## CSS — Points critiques à connaître

### Logo principal (nav)
```css
.logo-img { height: 120px; width: auto; }
```
Le PNG a ~35% de transparence haut/bas → affiché à 120px mais visuellement correct.

### Logo footer
```css
/* Conteneur : overflow hidden pour couper la transparence */
.footer-brand .logo { display: block; overflow: hidden; height: 65px; margin-bottom: 4px; }
/* Image : décalée vers le haut pour centrer le vrai logo */
.logo-img--footer { height: 120px; margin-top: -47px; filter: brightness(0) invert(1); }
```
La technique `overflow:hidden + margin-top:-47px` compense les ~35% de transparence en haut du PNG.

### Nav floating pill
```css
.nav { position: sticky; top: 20px; z-index: 100; max-width: 860px; margin: 20px auto 0; border-radius: 12px; }
.nav-inner { backdrop-filter: blur(16px); border-radius: 10px; }
.btn-nav { margin-left: auto; } /* bouton collé à droite */
```

---

## JS — Organisation de script.js

| Ligne approx. | Bloc | Description |
|---|---|---|
| 1–5 | Nav scroll | Classe `.scrolled` sur scroll |
| 7–29 | Mobile burger | Toggle menu mobile |
| 32–42 | Reveal observer | `.reveal` → `.visible` au scroll |
| 45–61 | FAQ accordion | Open/close |
| 64–156 | Suite accordion | Auto-advance + barre de progression |
| 158–241 | Hero pixel canvas | Animation canvas |
| 243–260 | Hero fade-in | Apparition CTAs + ticker au load |
| 262–275 | Hero ticker | Loop seamless plateformes |
| 277–312 | Why cards pattern | Injection SVG grille |
| 314–329 | Glow cards | pointermove → CSS custom props |
| 331–348 | Platforms ticker | (Vestige, inutile — `.platforms-ticker` n'existe plus) |
| 351–363 | Smooth scroll | Ancres `href="#..."` |

---

## État actuel du site (ce qui est terminé)

- [x] Nav glassmorphism floating pill avec logo, liens anglais, bouton "Install extension" à droite
- [x] Hero pixel canvas blanc + overlay radial + titre shimmer "Paper Memes." + stats + CTAs + ticker plateformes
- [x] Section Suite accordion 4 items avec images de prévisualisation
- [x] Section How it works — 3 cartes avec effet glow spotlight vert/blanc
- [x] Section Why us — 6 cartes avec pattern SVG grille généré aléatoirement
- [x] Témoignages 3 cartes sous Why us
- [x] FAQ accordion
- [x] Footer avec logo (cropé/inversé), colonnes liens, réseaux sociaux
- [x] Animations reveal au scroll sur les cartes
- [x] Mobile responsive (burger menu)

---

## Prochaine phase : UI/UX polish & rebuild

L'objectif est de peaufiner et potentiellement reconstruire certaines sections pour améliorer la qualité visuelle et l'expérience utilisateur. Axes probables :

- **Cohérence visuelle** : vérifier espacement, tailles, alignements sur toutes sections
- **Responsivité** : tester et corriger mobile/tablette
- **Animations** : affiner les timings, easings, transitions entre sections
- **Sections à potentiellement retravailler** : Hero (contenu/layout), Suite (design des cards), Footer
- **Performance** : le canvas pixel peut être coûteux sur mobile → possibilité d'optimiser ou désactiver sur `prefers-reduced-motion`

---

## Déploiement

Le site n'est pas encore en ligne. Netlify CLI est installé (`npm install -g netlify-cli` déjà fait). Options disponibles :
- **Netlify Drop** : glisser le dossier sur netlify.com/drop
- **Netlify CLI** : `netlify deploy --prod --dir .` depuis `C:\Users\armou\Desktop\IA`
- **GitHub Pages** : activer dans les settings du repo (branche `main`, dossier `/`)

---

## Historique des décisions techniques importantes

| Décision | Pourquoi |
|---|---|
| `getBoundingClientRect()` pour le glow | `background-attachment: fixed` ne fonctionnait que sur la 1ère carte (coordonnées viewport partagées) |
| `overflow:hidden + margin-top:-47px` footer | Le PNG logo a ~35% de transparence haut/bas non compressible autrement |
| 4 sets dans le ticker hero | Minimum pour une boucle seamless sans saut visible |
| Pas de `var(--sp-X)` en CSS | Règle établie par l'utilisateur après que des variables avaient été utilisées par erreur |
| Pas de `data-glow` sur les why-cards | Les why-cards ont leur propre effet (SVG pattern) — le glow est réservé aux how-cards |

---

## Pour démarrer

```bash
# Cloner le repo
git clone https://github.com/Ulrich440/PaperMemes_Website.git
cd PaperMemes_Website

# Ouvrir dans le navigateur
# (double-cliquer sur index.html ou utiliser Live Server dans VS Code)
```

Il n'y a aucune dépendance à installer. Le site fonctionne directement en ouvrant `index.html`.
