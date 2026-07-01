[![Netlify Status](https://api.netlify.com/api/v1/badges/bc68f9f5-1aa3-4dc4-a1ac-2ff2682d59c2/deploy-status)](https://app.netlify.com/sites/dice-game-100/deploys)

## Création d'un petit jeu sur navigateur web à l'aide du DOM.

Fork de [sandix34/Dice-Game](https://github.com/sandix34/Dice-Game), avec une refonte visuelle rétro-moderne, des corrections de bugs et quelques améliorations d'accessibilité et de sécurité.

---

![dice-game](https://user-images.githubusercontent.com/44428775/111074974-ed630980-84e5-11eb-8253-fa3f90d9e88c.gif)

*(aperçu de l'interface d'origine — le thème visuel a depuis été repensé, voir la section "Moyens utilisés" ci-dessous.)*

---

### Règles du jeu
Le jeu comprend 2 joueurs sur un seul et même écran.
Chaque joueur possède un score temporaire (ROUND) et un score global (GLOBAL).
A chaque tour, le joueur a son ROUND initialisé à 0 et peut lancer un dé autant de fois qu'il le souhaite. Le résultat d'un lancer est ajouté au ROUND.

Lors de son tour, le joueur peut décider à tout moment de :
- Cliquer sur l'option "Hold", qui permet d'envoyer les points du ROUND vers le GLOBAL. Ce sera alors le tour de l'autre joueur.
- Lancer le dé. S'il obtient un 1, son score ROUND est perdu et c'est la fin de son tour.

Le premier joueur qui atteint les 100 points sur global gagne le jeu (les boutons se désactivent alors automatiquement).

---

### Moyens utilisés :

- [html 5](https://developer.mozilla.org/fr/docs/Web/HTML)
- [CSS 3](https://developer.mozilla.org/fr/docs/Web/CSS)
- [Sass](https://sass-lang.com/) (compilé via [Dart Sass](https://www.npmjs.com/package/sass))
- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) vanilla (pas de framework JS)
- SVG pour les icônes et les faces de dé
- Le framework [ionic](https://ionicframework.com/docs/intro/cdn) (via CDN, avec intégrité SRI)
- [google Fonts](https://fonts.google.com/?query=lato)
- [stylelint](https://stylelint.io/) pour le lint CSS
- [Netlify](https://www.netlify.com/) pour la mise en ligne.

---

### Développement

Installer les dépendances (nécessaires uniquement pour compiler le SCSS et lancer le lint) :

```bash
npm install
```

Scripts disponibles :

```bash
npm run build:css  # compile style.scss -> style.css (+ source map)
npm run watch:css  # recompile automatiquement à chaque modification
npm run lint:css   # vérifie style.css avec stylelint
```

Le jeu lui-même est un site statique : il suffit d'ouvrir `index.html` dans un navigateur (ou de le servir via n'importe quel serveur HTTP) après avoir généré `style.css`.
