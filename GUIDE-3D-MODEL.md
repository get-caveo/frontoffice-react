# 🍷 Guide d'intégration du modèle 3D de bouteille

## 📋 Format du modèle 3D

**Format recommandé : GLB (ou GLTF)**

Le format GLB est le format standard pour les modèles 3D sur le web :
- ✅ Compact et optimisé
- ✅ Compatible avec Three.js
- ✅ Inclut textures et matériaux
- ✅ Largement supporté

**Formats alternatifs acceptés :**
- GLTF (version JSON + fichiers séparés)
- OBJ + MTL (moins recommandé)
- FBX (nécessite conversion)

## 📁 Où placer le modèle 3D

### Structure des dossiers

```
frontoffice-react/
├── public/
│   └── models/
│       └── wine-bottle.glb    ← Placez votre modèle ici
├── src/
│   └── components/
│       └── WineBottle3D/
│           ├── WineBottle3D.jsx
│           └── WineBottle3D.css
```

### Étapes d'installation

1. **Créer le dossier models** (si nécessaire)
   ```bash
   mkdir public\models
   ```

2. **Placer votre fichier GLB**
   - Nom du fichier : `wine-bottle.glb`
   - Chemin : `public/models/wine-bottle.glb`

3. **Installer les dépendances**
   ```bash
   npm install
   ```

## 🎨 Caractéristiques du modèle 3D recommandées

### Optimisations
- **Polygones** : 5 000 - 20 000 triangles max
- **Textures** : 2048x2048 px max (idéalement 1024x1024)
- **Format de texture** : JPG ou PNG compressé
- **Matériaux** : PBR (Physically Based Rendering)

### Propriétés recommandées
- ✅ Modèle centré à l'origine (0,0,0)
- ✅ Échelle réaliste (environ 30-40cm de hauteur)
- ✅ Une seule mesh ou hiérarchie simple
- ✅ Matériaux avec roughness/metalness
- ✅ Textures optimisées

## 🛠️ Outils pour créer/convertir le modèle

### Création
- **Blender** (gratuit) : Export GLB natif
- **Maya/3ds Max** : Export via plugins GLB
- **SketchUp** : Export via extensions

### Conversion
Si vous avez un modèle dans un autre format :

1. **En ligne** : https://products.aspose.app/3d/conversion
2. **Blender** : 
   - Importer votre modèle
   - File → Export → glTF 2.0 (.glb)
3. **CLI** : 
   ```bash
   npm install -g gltf-pipeline
   gltf-pipeline -i model.obj -o wine-bottle.glb
   ```

### Optimisation du modèle
```bash
npm install -g gltf-pipeline
gltf-pipeline -i wine-bottle.glb -o wine-bottle-optimized.glb -d
```

## 📝 Ressources gratuites pour modèles 3D

### Télécharger des modèles gratuits
- **Sketchfab** : https://sketchfab.com/search?q=wine+bottle&type=models
- **Free3D** : https://free3d.com/3d-models/wine-bottle
- **TurboSquid Free** : https://www.turbosquid.com/Search/3D-Models/free/wine-bottle
- **CGTrader Free** : https://www.cgtrader.com/free-3d-models/wine-bottle

### Recommandation
Chercher : "wine bottle GLB" ou "wine bottle low poly"

## ⚙️ Configuration avancée

### Changer le chemin du modèle
Dans `Home.jsx`, modifiez :
```jsx
<WineBottle3DBackground modelPath="/models/votre-fichier.glb" />
```

### Utiliser plusieurs modèles
```jsx
// Exemple : modèle différent selon une condition
const modelPath = isChampagne 
  ? "/models/champagne-bottle.glb" 
  : "/models/wine-bottle.glb"

<WineBottle3DBackground modelPath={modelPath} />
```

### Désactiver le modèle 3D temporairement
Commentez la ligne dans `Home.jsx` :
```jsx
{/* <WineBottle3DBackground modelPath="/models/wine-bottle.glb" /> */}
```

## 🎯 Paramètres personnalisables

Dans `WineBottle3D.jsx`, vous pouvez ajuster :

```jsx
// Vitesse de rotation
groupRef.current.rotation.y += 0.003  // Plus grand = plus rapide

// Intensité du mouvement vertical
groupRef.current.position.y = Math.sin(...) * 0.2  // Plus grand = plus d'amplitude

// Échelle du modèle
const scale = 3 / maxDim  // Ajuster le 3 pour agrandir/réduire

// Position de la caméra
camera={{ position: [0, 0, 8], fov: 45 }}  // Modifier pour zoomer/dézoomer
```

## 🐛 Dépannage

### Le modèle n'apparaît pas
1. ✅ Vérifier que le fichier est dans `public/models/wine-bottle.glb`
2. ✅ Vérifier la console du navigateur pour les erreurs
3. ✅ Vérifier que le nom du fichier est exact (sensible à la casse)
4. ✅ S'assurer que les dépendances sont installées : `npm install`

### Le modèle est trop petit/grand
Ajuster l'échelle dans `WineBottle3D.jsx` :
```jsx
const scale = 5 / maxDim  // Augmenter pour agrandir
```

### Le modèle est tout noir
Le modèle manque de lumière ou de matériaux :
1. Ajouter des textures dans Blender
2. Vérifier que les lumières sont actives
3. Augmenter `ambientLight intensity`

### Performance lente
1. Réduire le nombre de polygones du modèle
2. Compresser les textures
3. Désactiver les ombres dans le code

## 📊 Exemple de fichier de test

Si vous voulez tester sans modèle 3D immédiatement, le code utilise un fallback vers les bouteilles CSS existantes.

Pour un test rapide, téléchargez un modèle gratuit de bouteille de vin au format GLB et placez-le dans `public/models/wine-bottle.glb`.

## 🚀 Commandes utiles

```bash
# Installer les dépendances
npm install

# Lancer le dev server
npm run dev

# Vérifier que le modèle est accessible
# Ouvrir dans le navigateur : http://localhost:3000/models/wine-bottle.glb
```

---

**Prêt à l'emploi !** Une fois votre modèle GLB placé dans `public/models/wine-bottle.glb`, il apparaîtra automatiquement en fond de la page d'accueil avec des animations GSAP fluides.
