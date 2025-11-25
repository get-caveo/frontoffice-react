import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './Products.css'

// Mock data - à remplacer par les données de l'API
const mockProducts = [
  {
    id: 1,
    name: "Château Grand Cru 2018",
    region: "Bordeaux",
    appellation: "Saint-Émilion Grand Cru",
    vintage: 2018,
    price: 89.90,
    description: "Un vin élégant et complexe, aux arômes de fruits noirs et d'épices. Elevé 18 mois en fûts de chêne français. Structure tannique remarquable avec un potentiel de garde de 15 ans.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=800&fit=crop",
    alcohol: "14%",
    volume: "75cl",
    grapes: ["Merlot 60%", "Cabernet Franc 30%", "Cabernet Sauvignon 10%"],
    inStock: true,
    minOrder: 6
  },
  {
    id: 2,
    name: "Champagne Réserve Millésime 2015",
    region: "Champagne",
    appellation: "Champagne",
    vintage: 2015,
    price: 125.00,
    description: "Champagne d'exception issu d'une année exceptionnelle. Notes de brioche, d'agrumes et de fruits blancs. Bulles fines et persistantes. Parfait pour les grandes occasions.",
    image: "https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=400&h=800&fit=crop",
    alcohol: "12.5%",
    volume: "75cl",
    grapes: ["Chardonnay 60%", "Pinot Noir 40%"],
    inStock: true,
    minOrder: 3
  }
]

const Products = () => {
  const [products] = useState(mockProducts)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const productsRef = useRef(null)

  useEffect(() => {
    // Set initial state for product cards
    gsap.set('.product-card', { y: 60, opacity: 0 })
    
    // Animation des cartes produits au chargement
    gsap.to('.product-card', {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      delay: 0.2
    })
  }, [])

  const handleAddToCart = (product) => {
    // Fonction à implémenter avec l'API
    console.log('Ajout au panier:', product)
    // Animation de confirmation
    gsap.to(event.target, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="container">
          <h1>Nos Vins d'Exception</h1>
          <p>Une sélection rigoureuse pour les professionnels exigeants</p>
        </div>
      </div>

      <div className="container">
        <div className="products-filters">
          <div className="filter-group">
            <label>Région</label>
            <select className="filter-select">
              <option>Toutes les régions</option>
              <option>Bordeaux</option>
              <option>Bourgogne</option>
              <option>Champagne</option>
              <option>Vallée du Rhône</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Type</label>
            <select className="filter-select">
              <option>Tous les types</option>
              <option>Rouge</option>
              <option>Blanc</option>
              <option>Rosé</option>
              <option>Champagne</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Prix</label>
            <select className="filter-select">
              <option>Tous les prix</option>
              <option>Moins de 50€</option>
              <option>50€ - 100€</option>
              <option>100€ - 200€</option>
              <option>Plus de 200€</option>
            </select>
          </div>
        </div>

        <div ref={productsRef} className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-badge">
                  {product.inStock ? 'En stock' : 'Épuisé'}
                </div>
              </div>
              
              <div className="product-info">
                <div className="product-header">
                  <span className="product-region">{product.region}</span>
                  <span className="product-vintage">{product.vintage}</span>
                </div>
                
                <h3 className="product-name">{product.name}</h3>
                <p className="product-appellation">{product.appellation}</p>
                
                <p className="product-description">{product.description}</p>
                
                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Cépages</span>
                    <div className="detail-value">
                      {product.grapes.map((grape, index) => (
                        <span key={index}>{grape}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="detail-row">
                    <div className="detail-item">
                      <span className="detail-label">Alcool</span>
                      <span className="detail-value">{product.alcohol}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Volume</span>
                      <span className="detail-value">{product.volume}</span>
                    </div>
                  </div>
                </div>
                
                <div className="product-footer">
                  <div className="product-pricing">
                    <span className="product-price">{product.price.toFixed(2)}€</span>
                    <span className="min-order">Min. {product.minOrder} bouteilles</span>
                  </div>
                  
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                  >
                    {product.inStock ? 'Ajouter au panier' : 'Indisponible'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products
