import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import api from '../../services/api'
import './Products.css'

const Products = () => {
  const { isAuthenticated } = useAuth()
  const { addToCart } = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [domaines, setDomaines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [addingToCart, setAddingToCart] = useState(null)
  const [cartMessage, setCartMessage] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const productsRef = useRef(null)

  const [filters, setFilters] = useState({
    categorieId: '',
    domaineId: '',
    search: '',
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [filters])

  const fetchInitialData = async () => {
    try {
      const [cats, doms] = await Promise.all([
        api.getPublicCategories(),
        api.getPublicDomaines(),
      ])
      setCategories(cats || [])
      setDomaines(doms || [])
    } catch {
      // Non-blocking
    }
  }

  const fetchProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const activeFilters = {}
      if (filters.categorieId) activeFilters.categorieId = filters.categorieId
      if (filters.domaineId) activeFilters.domaineId = filters.domaineId
      if (filters.search) activeFilters.search = filters.search

      const data = await api.getPublicProducts(activeFilters)
      setProducts(data || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loading && products.length > 0) {
      gsap.set('.product-card', { y: 50, opacity: 0 })
      gsap.to('.product-card', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        delay: 0.1,
      })
    }
  }, [loading, products])

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    setFilters((prev) => ({ ...prev, search: searchTerm }))
  }

  const handleAddToCart = async (product, e) => {
    if (!isAuthenticated) {
      setCartMessage({ type: 'info', text: 'Connectez-vous pour ajouter au panier' })
      setTimeout(() => setCartMessage(null), 3000)
      return
    }

    const conditionnement = product.conditionnements?.find((c) => c.disponible)
    if (!conditionnement) {
      setCartMessage({ type: 'error', text: 'Aucun conditionnement disponible' })
      setTimeout(() => setCartMessage(null), 3000)
      return
    }

    setAddingToCart(product.id)
    try {
      await addToCart(product.id, conditionnement.uniteConditionnement.id, 1)
      setCartMessage({ type: 'success', text: `${product.nom} ajouté au panier` })

      if (e?.currentTarget) {
        gsap.fromTo(e.currentTarget, { scale: 0.9 }, { scale: 1, duration: 0.3, ease: 'back.out(1.7)' })
      }
    } catch (err) {
      setCartMessage({ type: 'error', text: err.message })
    } finally {
      setAddingToCart(null)
      setTimeout(() => setCartMessage(null), 3000)
    }
  }

  const getPrice = (product) => {
    const cond = product.conditionnements?.find((c) => c.disponible)
    return cond ? cond.prixUnitaire : null
  }

  const getCondLabel = (product) => {
    const cond = product.conditionnements?.find((c) => c.disponible)
    return cond ? cond.uniteConditionnement?.nom : null
  }

  return (
    <div className="products-page">
      {/* Hero Section */}
      <section className="products-hero">
        <div className="products-hero-bg"></div>
        <div className="container products-hero-content">
          <span className="products-label">Notre Sélection</span>
          <h1>Nos Vins d'Exception</h1>
          <p>Des cuvées rigoureusement sélectionnées pour les professionnels exigeants</p>
        </div>
      </section>

      <div className="container">
        {/* Toast */}
        {cartMessage && (
          <div className={`cart-toast cart-toast-${cartMessage.type}`}>
            {cartMessage.type === 'success' && '✓ '}
            {cartMessage.type === 'error' && '✕ '}
            {cartMessage.type === 'info' && 'ℹ '}
            {cartMessage.text}
            {cartMessage.type === 'info' && (
              <Link to="/login" className="toast-link"> Se connecter</Link>
            )}
          </div>
        )}

        {/* Filters Section */}
        <div className="products-filters-section">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher un vin, un domaine, une appellation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-btn">Rechercher</button>
          </form>

          <div className="filter-row">
            <div className="filter-group">
              <label>Catégorie</label>
              <select
                className="filter-select"
                value={filters.categorieId}
                onChange={(e) => handleFilterChange('categorieId', e.target.value)}
              >
                <option value="">Toutes les catégories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.nom}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Domaine / Région</label>
              <select
                className="filter-select"
                value={filters.domaineId}
                onChange={(e) => handleFilterChange('domaineId', e.target.value)}
              >
                <option value="">Tous les domaines</option>
                {domaines.map((dom) => (
                  <option key={dom.id} value={dom.id}>
                    {dom.nom}{dom.region ? ` — ${dom.region}` : ''}
                  </option>
                ))}
              </select>
            </div>

            {(filters.categorieId || filters.domaineId || filters.search) && (
              <button
                className="clear-filters-btn"
                onClick={() => {
                  setFilters({ categorieId: '', domaineId: '', search: '' })
                  setSearchTerm('')
                }}
              >
                ✕ Effacer les filtres
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="products-loading">
            <div className="loading-spinner"></div>
            <p>Chargement des vins...</p>
          </div>
        ) : error ? (
          <div className="products-error-box">
            <p>{error}</p>
            <button className="btn btn-primary" onClick={fetchProducts}>Réessayer</button>
          </div>
        ) : products.length === 0 ? (
          <div className="products-empty">
            <div className="empty-icon">🍷</div>
            <h2>Aucun vin trouvé</h2>
            <p>Essayez de modifier vos filtres ou votre recherche</p>
          </div>
        ) : (
          <>
            <div className="products-count">
              {products.length} vin{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
            </div>

            <div ref={productsRef} className="products-grid">
              {products.map((product) => {
                const price = getPrice(product)
                const condLabel = getCondLabel(product)
                const isAvailable = product.actif && product.conditionnements?.some((c) => c.disponible)

                return (
                  <div key={product.id} className="product-card">
                    <div className="product-image-wrapper">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.nom} className="product-image" />
                      ) : (
                        <div className="product-image-placeholder">
                          <span>🍷</span>
                        </div>
                      )}
                      <div className={`product-badge ${isAvailable ? '' : 'badge-unavailable'}`}>
                        {isAvailable ? 'En stock' : 'Épuisé'}
                      </div>
                      {product.millesime && (
                        <div className="product-year">{product.millesime}</div>
                      )}
                    </div>

                    <div className="product-content">
                      <div className="product-tags">
                        {product.categorie && (
                          <span className="tag tag-category">{product.categorie.nom}</span>
                        )}
                        {product.domaine?.region && (
                          <span className="tag tag-region">{product.domaine.region}</span>
                        )}
                      </div>

                      <h3 className="product-title">{product.nom}</h3>

                      {product.domaine && (
                        <p className="product-domaine-name">
                          {product.domaine.nom}
                          {product.domaine.appellation && ` · ${product.domaine.appellation}`}
                        </p>
                      )}

                      {product.description && (
                        <p className="product-desc">{product.description}</p>
                      )}

                      <div className="product-attributes">
                        {product.degreAlcool && (
                          <div className="attribute">
                            <span className="attr-icon">🌡️</span>
                            <span>{product.degreAlcool}% vol.</span>
                          </div>
                        )}
                        {condLabel && (
                          <div className="attribute">
                            <span className="attr-icon">📦</span>
                            <span>{condLabel}</span>
                          </div>
                        )}
                        {product.temperatureService && (
                          <div className="attribute">
                            <span className="attr-icon">🍷</span>
                            <span>{product.temperatureService}</span>
                          </div>
                        )}
                      </div>

                      {product.notesDegustation && (
                        <p className="product-notes">
                          <em>"{product.notesDegustation}"</em>
                        </p>
                      )}

                      <div className="product-bottom">
                        <div className="product-price-block">
                          {price ? (
                            <span className="price">{price.toFixed(2)}€</span>
                          ) : (
                            <span className="price price-na">N/A</span>
                          )}
                        </div>
                        <button
                          className="add-cart-btn"
                          onClick={(e) => handleAddToCart(product, e)}
                          disabled={!isAvailable || addingToCart === product.id}
                        >
                          {addingToCart === product.id ? (
                            <span className="btn-loading">⏳</span>
                          ) : isAvailable ? (
                            <>
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="9" cy="21" r="1"/>
                                <circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                              </svg>
                              Ajouter
                            </>
                          ) : (
                            'Indisponible'
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Products
