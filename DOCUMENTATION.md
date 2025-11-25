# Documentation Technique - Frontend Caveo

## 📋 Vue d'ensemble

Frontend React moderne pour la plateforme B2B Caveo de vente de vins d'exception.

---

## 🏗️ Architecture

### Structure des fichiers

```
frontoffice-react/
├── public/
│   └── vite.svg              # Logo de l'application
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── Header.jsx    # Navigation principale
│   │   │   └── Header.css
│   │   └── Footer/
│   │       ├── Footer.jsx    # Pied de page
│   │       └── Footer.css
│   ├── pages/
│   │   ├── Home/
│   │   │   ├── Home.jsx      # Page d'accueil avec animations
│   │   │   └── Home.css
│   │   ├── Products/
│   │   │   ├── Products.jsx  # Catalogue de produits
│   │   │   └── Products.css
│   │   └── Cart/
│   │       ├── Cart.jsx      # Panier d'achat
│   │       └── Cart.css
│   ├── App.jsx               # Configuration des routes
│   ├── App.css
│   ├── main.jsx              # Point d'entrée
│   └── index.css             # Styles globaux
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎨 Système de Design

### Palette de Couleurs

```css
--color-primary: #2c2c2c      /* Noir profond */
--color-secondary: #f8f8f8    /* Blanc cassé */
--color-accent: #8b6f47       /* Marron/Or foncé */
--color-gold: #c9a961         /* Or clair */
--color-white: #ffffff        /* Blanc pur */
--color-gray: #e0e0e0         /* Gris clair */
--color-dark-gray: #666666    /* Gris foncé */
```

### Typographies

- **Titres** : Cormorant Garamond (serif) - Élégant et classique
- **Corps de texte** : Montserrat (sans-serif) - Moderne et lisible

### Transitions

```css
--transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🧩 Composants

### Header
**Fichier** : `src/components/Header/Header.jsx`

**Fonctionnalités** :
- Navigation fixe avec effet de scroll
- Menu de navigation principal
- Icône panier avec badge de compteur
- Responsive

**Props attendues** (pour future implémentation) :
- `cartCount` : Nombre d'articles dans le panier

### Footer
**Fichier** : `src/components/Footer/Footer.jsx`

**Sections** :
- Logo et description
- Liens de navigation
- Informations de contact
- Horaires d'ouverture

---

## 📄 Pages

### Page d'Accueil (Home)
**Fichier** : `src/pages/Home/Home.jsx`

**Sections** :
1. **Hero** : 
   - Animation de titre avec GSAP
   - Bouteilles flottantes en arrière-plan (effet 3D)
   - Effet parallaxe au scroll
   - Indicateur de scroll animé

2. **Heritage** :
   - Présentation de la marque
   - Image illustrative
   - Texte sur deux colonnes

3. **Features** :
   - 4 cartes de fonctionnalités
   - Animation au scroll avec stagger
   - Icônes et descriptions

4. **CTA** :
   - Appel à l'action
   - Gradient d'arrière-plan
   - Bouton d'action principal

**Animations GSAP** :
```javascript
// Hero title animation
gsap.from(titleRef.current, {
  y: 100,
  opacity: 0,
  duration: 1.2,
  delay: 0.3
})

// Parallax effect
gsap.to(parallaxRef.current, {
  y: 200,
  scrollTrigger: {
    trigger: heroRef.current,
    scrub: true
  }
})

// Floating bottles
gsap.to(bottle, {
  y: -30,
  rotation: 5,
  repeat: -1,
  yoyo: true
})
```

### Page Produits (Products)
**Fichier** : `src/pages/Products/Products.jsx`

**Fonctionnalités** :
- Header avec titre et description
- Filtres par région, type et prix
- Grille de produits responsive
- Cartes produits détaillées

**Structure d'un produit** :
```javascript
{
  id: number,
  name: string,
  region: string,
  appellation: string,
  vintage: number,
  price: number,
  description: string,
  image: string,
  alcohol: string,
  volume: string,
  grapes: string[],
  inStock: boolean,
  minOrder: number
}
```

**Produits mockés** :
- Château Grand Cru 2018 (Bordeaux)
- Champagne Réserve Millésime 2015

**À implémenter** :
- Connexion API pour récupérer les produits
- Fonctionnalité des filtres
- Ajout réel au panier
- Pagination

### Page Panier (Cart)
**Fichier** : `src/pages/Cart/Cart.jsx`

**Fonctionnalités** :
- Affichage des articles du panier
- Modification des quantités (+/-)
- Suppression d'articles (avec animation)
- Calcul du sous-total, TVA, total
- Champ code promo
- Informations de livraison
- Bouton de paiement

**Structure d'un article de panier** :
```javascript
{
  id: number,
  productId: number,
  name: string,
  region: string,
  vintage: number,
  price: number,
  quantity: number,
  image: string
}
```

**Calculs** :
- Sous-total : Somme des (prix × quantité)
- TVA : 20% du sous-total
- Total : Sous-total + TVA
- Livraison : Gratuite

**Animations** :
- Apparition des cartes au chargement
- Mise à jour de quantité avec scale
- Suppression avec slide-out

---

## 🔌 Intégration Backend

### Configuration API

Créer un fichier `src/services/api.js` :

```javascript
const API_BASE_URL = 'http://localhost:8080/api'

export const api = {
  // Products
  getProducts: async (filters) => {
    const response = await fetch(`${API_BASE_URL}/products`)
    return response.json()
  },
  
  getProductById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/products/${id}`)
    return response.json()
  },
  
  // Cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`)
    return response.json()
  },
  
  addToCart: async (productId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity })
    })
    return response.json()
  },
  
  updateCartItem: async (itemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity })
    })
    return response.json()
  },
  
  removeFromCart: async (itemId) => {
    await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: 'DELETE'
    })
  },
  
  // Checkout
  checkout: async (orderData) => {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    return response.json()
  }
}
```

### Gestion d'État (Context API)

Créer un fichier `src/context/CartContext.jsx` :

```javascript
import { createContext, useState, useContext } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  
  const addToCart = async (product, quantity) => {
    // API call + update state
  }
  
  const removeFromCart = async (itemId) => {
    // API call + update state
  }
  
  const updateQuantity = async (itemId, quantity) => {
    // API call + update state
  }
  
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
```

---

## 🚀 Déploiement

### Build de production

```bash
npm run build
```

Génère un dossier `dist/` optimisé pour la production.

### Variables d'environnement

Créer un fichier `.env` :

```env
VITE_API_URL=http://localhost:8080/api
VITE_APP_NAME=Caveo
```

Utilisation :
```javascript
const apiUrl = import.meta.env.VITE_API_URL
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Desktop */
@media (min-width: 1025px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Mobile */
@media (max-width: 768px) { }
```

### Points d'attention mobile

- Navigation hamburger (à implémenter)
- Cartes produits en colonne unique
- Panier en layout vertical
- Touches plus grandes pour mobile

---

## ⚡ Performance

### Optimisations implémentées

- Lazy loading des images
- Code splitting par route (React Router)
- Animations GPU-accelerated (GSAP)
- CSS optimisé avec variables

### Optimisations à ajouter

- Image optimization (WebP, lazy loading)
- Service Worker pour mise en cache
- Compression gzip
- CDN pour assets statiques

---

## 🧪 Tests (à implémenter)

### Frameworks recommandés

- **Unit tests** : Vitest
- **Component tests** : React Testing Library
- **E2E tests** : Playwright ou Cypress

### Exemples de tests

```javascript
// Products.test.jsx
import { render, screen } from '@testing-library/react'
import Products from './Products'

test('displays products list', () => {
  render(<Products />)
  expect(screen.getByText('Nos Vins d\'Exception')).toBeInTheDocument()
})
```

---

## 🔒 Sécurité

### À implémenter

- Authentification JWT
- Protection CSRF
- Validation des inputs
- Sanitization des données
- HTTPS en production
- Rate limiting

---

## 📈 Améliorations futures

1. **Authentification** : Login/Register pour revendeurs
2. **Dashboard** : Historique des commandes
3. **Wishlist** : Liste de favoris
4. **Comparateur** : Comparer plusieurs vins
5. **Recherche avancée** : Filtres multiples
6. **Notifications** : Toast notifications
7. **Mode sombre** : Dark mode
8. **Internationalisation** : Multi-langues (i18n)
9. **Analytics** : Google Analytics
10. **Chat support** : Support client en direct

---

## 🐛 Problèmes connus

- [ ] Warning CSS appearance property (mineur)
- [ ] Images mockées avec Unsplash (à remplacer)
- [ ] Menu mobile non implémenté
- [ ] Accessibility (ARIA labels incomplets)

---

## 📞 Support

Pour toute question technique :
- Email : support@caveo.fr
- Documentation : Voir README.md

---

**Dernière mise à jour** : 25 novembre 2025
