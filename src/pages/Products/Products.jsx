import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { produitsApi, categoriesApi } from '../../services/api'
import './Products.css'

const Products = () => {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProduct, setSelectedProduct] = useState(null)
  const productsRef = useRef(null)

  // Chargement des données depuis le backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Construire les filtres
        const filters = {}
        if (selectedCategory) filters.categorieId = selectedCategory
        if (searchTerm) filters.search = searchTerm
        
        const [produitsData, categoriesData] = await Promise.all([
          produitsApi.getAll(filters),
          categoriesApi.getAll()
        ])
        
        setProducts(produitsData || [])
        setCategories(categoriesData || [])
      } catch (err) {
        console.error('Erreur lors du chargement:', err)
        setError('Impossible de charger les produits. Vérifiez que le serveur backend est démarré.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchData()
  }, [selectedCategory, searchTerm])

  useEffect(() => {
    if (!loading && products.length > 0) {
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
    }
  }, [loading, products])

  const handleAddToCart = (product) => {
    // Fonction à implémenter avec l'API
    console.log('Ajout au panier:', product)
  }

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchTerm(e.target.value)
    }
  }

  // Affichage pendant le chargement
  if (loading) {
    return (
      <div className="products-page">
        <div className="products-hero">
          <div className="container">
            <h1>Nos Vins d'Exception</h1>
            <p>Chargement des produits...</p>
          </div>
        </div>
      </div>
    )
  }

  // Affichage en cas d'erreur
  if (error) {
    return (
      <div className="products-page">
        <div className="products-hero">
          <div className="container">
            <h1>Nos Vins d'Exception</h1>
            <p style={{ color: '#ff6b6b' }}>{error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Réessayer
            </button>
          </div>
        </div>
      </div>
    )
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
            <label>Catégorie</label>
            <select 
              className="filter-select" 
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="">Toutes les catégories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.nom}</option>
              ))}
            </select>
          </div>
          
          <div className="filter-group">
            <label>Recherche</label>
            <input 
              type="text" 
              className="filter-select"
              placeholder="Rechercher un vin..."
              onKeyDown={handleSearch}
            />
          </div>
        </div>

        {products.length === 0 ? (
          <div className="no-products">
            <p>Aucun produit trouvé.</p>
          </div>
        ) : (
          <div ref={productsRef} className="products-grid">
            {products.map((product) => {
              // Récupérer le prix le plus bas depuis les conditionnements
              const prixMin = product.conditionnements?.length > 0 
                ? Math.min(...product.conditionnements.map(c => c.prixUnitaire))
                : null;
              const hasMultiplePrices = product.conditionnements?.length > 1;
              
              return (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img 
                      src={product.imageUrl || "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=800&fit=crop"} 
                      alt={product.nom} 
                    />
                    <div className="product-badge">
                      {product.actif ? 'En stock' : 'Épuisé'}
                    </div>
                  </div>
                  
                  <div className="product-info">
                    <div className="product-header">
                      <span className="product-region">{product.domaine?.nom || 'Domaine inconnu'}</span>
                      <span className="product-vintage">{product.millesime || ''}</span>
                    </div>
                    
                    <h3 className="product-name">{product.nom}</h3>
                    <p className="product-appellation">{product.categorie?.nom || ''}</p>
                    
                    <p className="product-description">{product.description || ''}</p>
                    
                    <div className="product-details">
                      <div className="detail-row">
                        <div className="detail-item">
                          <span className="detail-label">Alcool</span>
                          <span className="detail-value">{product.degreAlcool ? `${product.degreAlcool}%` : 'N/A'}</span>
                        </div>
                        <div className="detail-item">
                          <span className="detail-label">SKU</span>
                          <span className="detail-value">{product.sku || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="product-footer">
                      <div className="product-pricing">
                        <span className="product-price">
                          {prixMin !== null 
                            ? `${hasMultiplePrices ? 'À partir de ' : ''}${prixMin.toFixed(2)}€`
                            : 'Prix sur demande'
                          }
                        </span>
                      </div>
                      
                      <button 
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.actif}
                      >
                        {product.actif ? 'Ajouter au panier' : 'Indisponible'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Products
