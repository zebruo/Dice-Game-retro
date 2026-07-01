# Audit du projet Dice Game

Date de l'audit : 2026-07-01

**Projet forké** depuis [sandix34/Dice-Game](https://github.com/sandix34/Dice-Game) (remote `origin`, premier commit du projet d'origine daté du 2021-03-06).

Petit jeu de dés en 2 joueurs, vanilla JS + DOM, mise en forme via Ionic (CDN) et SCSS. Projet à visée pédagogique/portfolio, sans backend ni données utilisateur — logique simple et lisible.

---

## Bugs fonctionnels

### ~~1. Le jeu ne se bloque pas après la victoire~~
✅ Corrigé — flag `gameOver` + boutons désactivés à la victoire.

### ~~2. Perte de la référence DOM du joueur gagnant~~
✅ Corrigé — seul le texte du nom est modifié, le span est préservé.

### ~~3. Faute de frappe HTML~~
✅ Corrigée — `</span>` rétabli.

---

## Accessibilité

- ~~Les boutons ("new game", "roll dice", "hold") sont des `<p>` avec un simple listener `click` — pas de `role="button"`, `tabindex`, ni gestion clavier (`Enter` / `Espace`). Inutilisables au clavier ou avec un lecteur d'écran.~~ ✅ Corrigé — `role="button"` + `tabindex` + activation clavier.
- ~~Aucune zone `aria-live` pour annoncer les changements de score/dé aux lecteurs d'écran.~~ ✅ Corrigé — `aria-live="polite"` sur le dé, les scores et les noms de joueurs.

---

## Sécurité / robustesse

- ~~Les ressources CDN (Ionic JS/CSS, Google Fonts) sont chargées sans attributs **SRI** (`integrity` / `crossorigin`). Si le CDN était compromis, du code arbitraire pourrait s'exécuter sur la page.~~ ✅ Corrigé pour Ionic (version pinnée + SRI) — Google Fonts non éligible au SRI (contenu variable selon le user-agent).

---

## Hygiène de projet

- ~~Pas de `package.json` alors que [.stylelintrc.json](.stylelintrc.json) référence `stylelint-config-standard` : la dépendance n'est ni documentée ni pinnée, le lint n'est pas reproductible.~~ ✅ Corrigé — `package.json` avec scripts `build:css`/`watch:css`/`lint:css`.
- `style.css` et `style.css.map` (générés depuis `style.scss`) sont committés sans pipeline de build/CI garantissant leur synchronisation avec la source — risque de drift silencieux entre le SCSS et le CSS livré. ⚠️ Atténué (script `npm run build:css` disponible) mais pas encore de vérification automatique en CI.

---

## Points mineurs

- `replay()` fait un `document.location.reload()` complet (re-télécharge les libs CDN) plutôt qu'une réinitialisation en mémoire de l'état de jeu.
- État global mutable (`let randomNumber, roundScore, activePlayer, scores`) — acceptable pour un projet de cette taille, mais à surveiller en cas d'évolution.

---

## Priorité recommandée

1. ~~Corriger le verrouillage du jeu après victoire (bugs n°1 et n°2).~~ ✅
2. ~~Corriger la faute de frappe HTML (bug n°3).~~ ✅
3. ~~Améliorer l'accessibilité des boutons (rôle + clavier).~~ ✅
4. ~~Ajouter SRI sur les ressources CDN.~~ ✅
5. ~~Ajouter un `package.json` minimal pour figer les outils de lint.~~ ✅

Reste ouvert : synchronisation CI du SCSS/CSS, `replay()` en full reload, état global mutable (points mineurs, non bloquants).
