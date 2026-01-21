# 🚀 Guide de Démarrage Rapide - Caveo Frontend

## Prérequis
- Node.js 16+ installé
- npm ou yarn

## Installation en 3 étapes

### 1. Installer les dépendances
```bash
npm install
```

### 2. Lancer le serveur de développement
```bash
npm run dev
```

### 3. Ouvrir dans le navigateur
Ouvrir [http://localhost:3000](http://localhost:3000)

---

## 📂 Structure du Projet

```
src/
├── components/       # Composants réutilisables
│   ├── Header/      # Navigation
│   └── Footer/      # Pied de page
├── pages/           # Pages de l'application
│   ├── Home/        # Page d'accueil
│   ├── Products/    # Catalogue
│   └── Cart/        # Panier
├── App.jsx          # Routes
└── main.jsx         # Point d'entrée
```

---

## 🎯 Fonctionnalités Actuelles

✅ Page d'accueil avec animations GSAP  
✅ Catalogue de produits (2 vins mockés)  
✅ Panier d'achat avec calculs  
✅ Design responsive  
✅ Navigation fluide  

---

## 🔧 Commandes Utiles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Preview du build
npm run preview
```

---

## 🎨 Personnalisation

### Couleurs (src/index.css)
```css
--color-accent: #8b6f47    /* Couleur principale */
--color-gold: #c9a961      /* Couleur secondaire */
```

### Port (vite.config.js)
```javascript
server: {
  port: 3000  // Modifier ici
}
```

---

## 📡 Intégration Backend

Les données sont actuellement mockées dans :
- `src/pages/Products/Products.jsx` (ligne 6)
- `src/pages/Cart/Cart.jsx` (ligne 6)

Pour connecter l'API :
1. Créer `src/services/api.js`
2. Remplacer les données mockées par des appels API
3. Gérer le state avec Context API ou Redux

---

## 🐛 Dépannage

### Le serveur ne démarre pas
```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### Erreur de port occupé
Modifier le port dans `vite.config.js`

### Animations ne fonctionnent pas
Vérifier que GSAP est installé :
```bash
npm install gsap
```

---

## 📚 Documentation

- **README.md** : Vue d'ensemble du projet
- **DOCUMENTATION.md** : Documentation technique complète

---

## 🎓 Navigation

### Pages disponibles
- `/` - Page d'accueil
- `/products` - Catalogue de vins
- `/cart` - Panier d'achat

---

## 💡 Prochaines Étapes

1. Connecter l'API Java backend
2. Implémenter l'authentification
3. Ajouter plus de produits
4. Créer le processus de checkout
5. Ajouter des tests

---

## 📞 Support

Pour toute question, consulter la documentation complète ou contacter l'équipe de développement.

---

**Dernière mise à jour** : 25 novembre 2025
**Version** : 1.0.0
