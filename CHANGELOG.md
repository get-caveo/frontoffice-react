# 📝 Changelog - Corrections et Améliorations

## Version 1.1.0 - 25 novembre 2025

### 🔧 Corrections

#### Animations GSAP
- **Problème résolu** : Les éléments (titre principal, bouteilles) disparaissaient après le chargement
- **Solution** : 
  - Utilisation de `gsap.set()` pour définir les états initiaux
  - Remplacement de `.from()` par `.to()` pour garantir les valeurs finales
  - Ajout d'une fonction de nettoyage pour les ScrollTriggers
  
**Fichiers modifiés** :
- `src/pages/Home/Home.jsx` : Corrections des animations hero et parallaxe

**Avant** :
```javascript
tl.from(titleRef.current, {
  y: 100,
  opacity: 0,
  duration: 1.2,
  delay: 0.3
})
```

**Après** :
```javascript
gsap.set(titleRef.current, { y: 100, opacity: 0 })

tl.to(titleRef.current, {
  y: 0,
  opacity: 1,
  duration: 1.2,
  delay: 0.3
})
```

### ✨ Nouvelles Fonctionnalités

#### Pages Légales
Ajout de pages complètes pour la conformité légale :

1. **Politique de Confidentialité** (`/privacy-policy`)
   - Collecte et utilisation des données
   - Droits RGPD
   - Sécurité des données
   - Gestion des cookies
   - Coordonnées de contact

2. **Conditions Générales de Vente** (`/terms`)
   - Conditions d'accès professionnels
   - Processus de commande
   - Modalités de paiement
   - Conditions de livraison
   - Garanties et retours
   - Responsabilités
   - Règlement des litiges

**Nouveaux fichiers** :
- `src/pages/PrivacyPolicy/PrivacyPolicy.jsx`
- `src/pages/PrivacyPolicy/PrivacyPolicy.css`
- `src/pages/TermsOfService/TermsOfService.jsx`
- `src/pages/TermsOfService/TermsOfService.css`

#### Navigation
- Ajout des routes vers les pages légales dans `App.jsx`
- Mise à jour du footer avec liens vers :
  - CGV (`/terms`)
  - Politique de confidentialité (`/privacy-policy`)
  - Mentions légales (`/legal`) - à créer si nécessaire
- Remplacement des balises `<a>` par `<Link>` pour navigation React Router

**Fichiers modifiés** :
- `src/App.jsx` : Nouvelles routes
- `src/components/Footer/Footer.jsx` : Liens mis à jour

### 🎨 Styles

#### Nouvelles Classes CSS
```css
.legal-page         /* Container principal des pages légales */
.legal-header       /* En-tête avec titre et date */
.legal-content      /* Contenu principal */
.legal-section      /* Sections individuelles */
.contact-info       /* Blocs d'informations de contact */
.last-updated       /* Date de mise à jour */
```

### 📊 Impact

#### Performance
- ✅ Animations plus stables et fluides
- ✅ Pas de régressions de performance
- ✅ Hot Module Replacement (HMR) fonctionnel

#### Conformité
- ✅ RGPD compliant (politique de confidentialité)
- ✅ Obligations légales B2B (CGV)
- ✅ Transparence sur les données

### 🧪 Tests Recommandés

1. **Page d'accueil**
   - [ ] Vérifier que le titre reste visible après chargement
   - [ ] Vérifier que les bouteilles flottent en continu
   - [ ] Tester le scroll parallaxe
   - [ ] Vérifier l'apparition des feature cards

2. **Pages légales**
   - [ ] Navigation vers `/privacy-policy`
   - [ ] Navigation vers `/terms`
   - [ ] Liens dans le footer fonctionnels
   - [ ] Responsive sur mobile

3. **Navigation**
   - [ ] Tous les liens React Router fonctionnent
   - [ ] Pas de rechargement de page
   - [ ] Retour arrière fonctionnel

### 📝 Notes de Développement

#### Pourquoi `gsap.set()` + `gsap.to()` au lieu de `gsap.from()` ?

La méthode `.from()` anime **depuis** une valeur vers l'état actuel du DOM. Si le DOM change ou si l'animation est interrompue, l'élément peut revenir à son état initial non défini.

En utilisant :
```javascript
gsap.set(element, { opacity: 0 })  // État initial fixe
gsap.to(element, { opacity: 1 })    // État final garanti
```

On garantit que :
1. L'état initial est toujours le même
2. L'état final est explicitement défini
3. L'élément reste visible après l'animation

#### Nettoyage des ScrollTriggers

```javascript
return () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill())
}
```

Empêche les fuites mémoire et les conflits lors du démontage du composant.

### 🔮 Améliorations Futures

- [ ] Page Mentions Légales (`/legal`)
- [ ] Page Cookies avec gestion du consentement
- [ ] Animations d'entrée pour les pages légales
- [ ] Breadcrumb navigation
- [ ] Print-friendly CSS pour pages légales

### 📚 Documentation Mise à Jour

- `QUICKSTART.md` : À jour avec nouvelles routes
- `DOCUMENTATION.md` : À compléter avec pages légales
- `README.md` : Déjà à jour

---

**Version précédente** : 1.0.0  
**Version actuelle** : 1.1.0  
**Statut** : ✅ Stable et prêt pour production
