# Caveo - Frontend Front Office

Application React moderne pour la vente de vins d'exception aux revendeurs professionnels.

## 🎯 Description

Caveo est une solution développée par NegoSud, plateforme B2B dédiée à la vente de vins d'exception. Ce frontend front office présente une interface élégante et moderne, inspirée de la tradition viticole, avec des animations avancées utilisant GSAP.

## ✨ Fonctionnalités

- **Page d'accueil** : Design moderne avec animations GSAP 3D, effets de parallaxe et scroll interactif
- **Catalogue produits** : Affichage des vins avec filtres (région, type, prix), cartes produits détaillées
- **Panier** : Interface complète de gestion du panier avec calculs automatiques
- **Design responsive** : Compatible tous écrans (desktop, tablette, mobile)
- **Animations fluides** : Transitions et micro-interactions pour une UX premium

## 🛠️ Technologies

- **React 18.3** - Framework JavaScript
- **Vite 5.4** - Build tool et dev server
- **React Router 6.26** - Navigation
- **GSAP 3.12** - Animations avancées et effets 3D
- **CSS3** - Animations, grilles et flexbox modernes

## 📦 Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build de production
npm run build
```

## 🚀 Démarrage rapide

1. Cloner le repository
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `npm run dev`
4. Ouvrir http://localhost:3000

## 📁 Structure du projet

```
src/
├── components/
│   ├── Header/          # Navigation principale
│   └── Footer/          # Pied de page
├── pages/
│   ├── Home/            # Page d'accueil avec animations GSAP
│   ├── Products/        # Catalogue des vins
│   └── Cart/            # Panier d'achat
├── App.jsx              # Configuration des routes
├── main.jsx             # Point d'entrée
└── index.css            # Styles globaux
```

## 🎨 Design

Le design s'inspire du site Chartogne-Taillet avec :
- Palette de couleurs : blanc (#f8f8f8), gris (#e0e0e0), or (#c9a961), marron (#8b6f47)
- Typographies : Cormorant Garamond (titres) et Montserrat (texte)
- Animations GSAP pour les effets 3D et parallaxe
- Interface épurée et élégante

## 🔗 Intégration API

Le frontend est prêt pour l'intégration avec l'API Java backend :

### Endpoints à implémenter :
- `GET /api/products` - Liste des produits
- `GET /api/products/:id` - Détails d'un produit
- `POST /api/cart` - Ajouter au panier
- `PUT /api/cart/:id` - Modifier quantité
- `DELETE /api/cart/:id` - Retirer du panier
- `GET /api/cart` - Récupérer le panier
- `POST /api/checkout` - Valider la commande

### Données mockées actuelles :
- 2 produits exemples dans `Products.jsx`
- 1 article de panier dans `Cart.jsx`

## 🎭 Animations GSAP

Animations implémentées :
- **Hero** : Apparition progressive du titre et CTA
- **Parallaxe** : Effet de profondeur au scroll
- **Bouteilles flottantes** : Animation 3D continue
- **Cards** : Apparition au scroll avec stagger
- **Interactions** : Hover, click avec micro-animations

## 📱 Responsive

Breakpoints :
- Desktop : > 1024px
- Tablet : 768px - 1024px
- Mobile : < 768px

## 🔧 Configuration

### Variables CSS (src/index.css)
```css
--color-primary: #2c2c2c
--color-secondary: #f8f8f8
--color-accent: #8b6f47
--color-gold: #c9a961
```

### Port de développement
Par défaut : 3000 (configuré dans vite.config.js)

## 🚧 TODO - Intégration Backend

- [ ] Connecter les endpoints API
- [ ] Implémenter l'authentification
- [ ] Gestion d'état globale (Context/Redux)
- [ ] Persistance du panier
- [ ] Gestion des erreurs API
- [ ] Loading states
- [ ] Pagination des produits

## 👥 Auteurs

Solution Caveo développée par NegoSud

## 📄 Licence

Propriétaire NegoSud - Tous droits réservés