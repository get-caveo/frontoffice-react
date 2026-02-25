import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import api from '../../services/api'
import './Cart.css'

const Cart = () => {
  const { isAuthenticated, user } = useAuth()
  const { cart, updateQuantity, removeItem, clearCart, fetchCart } = useCart()
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([])
  const [selectedAddressId, setSelectedAddressId] = useState('')
  const [orderLoading, setOrderLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(null)
  const [orderError, setOrderError] = useState(null)
  const [updatingItems, setUpdatingItems] = useState({})
  const cartRef = useRef(null)

  useEffect(() => {
    if (isAuthenticated) {
      loadAddresses()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (cart?.lignes?.length > 0) {
      gsap.set('.cart-item', { x: -30, opacity: 0 })
      gsap.to('.cart-item', {
        x: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power3.out',
        delay: 0.15,
      })
    }
  }, [cart?.lignes?.length])

  const loadAddresses = async () => {
    try {
      const data = await api.getAddresses()
      setAddresses(data || [])
      const defaultAddr = data?.find((a) => a.parDefaut)
      if (defaultAddr) setSelectedAddressId(defaultAddr.id)
    } catch {
      // Non crucial
    }
  }

  const handleQuantityChange = async (ligneId, newQty) => {
    if (newQty < 1) return
    setUpdatingItems((prev) => ({ ...prev, [ligneId]: true }))
    try {
      await updateQuantity(ligneId, newQty)
    } catch {
      // Handled in context
    } finally {
      setUpdatingItems((prev) => ({ ...prev, [ligneId]: false }))
    }
  }

  const handleRemove = async (ligneId) => {
    try {
      const el = document.getElementById(`cart-item-${ligneId}`)
      if (el) {
        await gsap.to(el, { x: 100, opacity: 0, height: 0, padding: 0, margin: 0, duration: 0.3, ease: 'power2.in' })
      }
      await removeItem(ligneId)
    } catch {
      // Handled in context
    }
  }

  const handleClearCart = async () => {
    if (!window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) return
    try {
      await clearCart()
    } catch {
      // Handled in context
    }
  }

  const handleCreateOrder = async () => {
    if (!selectedAddressId) {
      setOrderError('Veuillez sélectionner une adresse de livraison')
      return
    }

    setOrderLoading(true)
    setOrderError(null)
    try {
      const order = await api.createOrder(selectedAddressId)
      setOrderSuccess(order)
      await fetchCart()
    } catch (err) {
      setOrderError(err.message)
    } finally {
      setOrderLoading(false)
    }
  }

  const handlePayOrder = async (orderId) => {
    try {
      await api.payOrder(orderId)
      setOrderSuccess((prev) => ({ ...prev, statut: 'PAYEE' }))
    } catch (err) {
      setOrderError(err.message)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="cart-page">
        <section className="cart-hero">
          <div className="cart-hero-bg"></div>
          <div className="container cart-hero-content">
            <span className="cart-label">Mon Panier</span>
            <h1>Votre Sélection</h1>
          </div>
        </section>
        <div className="container">
          <div className="cart-auth-prompt">
            <div className="auth-prompt-icon">🔒</div>
            <h2>Connexion requise</h2>
            <p>Connectez-vous pour accéder à votre panier et passer commande</p>
            <Link to="/login" className="btn btn-primary">Se connecter</Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderSuccess) {
    return (
      <div className="cart-page">
        <section className="cart-hero cart-hero-success">
          <div className="cart-hero-bg"></div>
          <div className="container cart-hero-content">
            <span className="cart-label">Confirmation</span>
            <h1>Commande Confirmée</h1>
          </div>
        </section>
        <div className="container">
          <div className="order-confirmation">
            <div className="confirmation-icon">✓</div>
            <h2>Merci pour votre commande !</h2>
            <p>Votre commande <strong>#{orderSuccess.id}</strong> a été enregistrée avec succès.</p>
            <p className="confirmation-status">
              Statut : <span className={`status status-${orderSuccess.statut?.toLowerCase()}`}>{orderSuccess.statut}</span>
            </p>
            {orderSuccess.montantTotal && (
              <p className="confirmation-total">
                Total : <strong>{parseFloat(orderSuccess.montantTotal).toFixed(2)}€</strong>
              </p>
            )}
            <div className="confirmation-actions">
              {orderSuccess.statut === 'EN_ATTENTE' && (
                <button className="btn btn-gold" onClick={() => handlePayOrder(orderSuccess.id)}>
                  💳 Payer maintenant
                </button>
              )}
              <Link to="/orders" className="btn btn-outline">Voir mes commandes</Link>
              <Link to="/products" className="btn btn-secondary">Continuer mes achats</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const lignes = cart?.lignes || []
  const isEmpty = lignes.length === 0

  const total = lignes.reduce((sum, l) => {
    const prix = l.prixUnitaire || l.conditionnement?.prixUnitaire || 0
    return sum + prix * l.quantite
  }, 0)

  return (
    <div className="cart-page" ref={cartRef}>
      <section className="cart-hero">
        <div className="cart-hero-bg"></div>
        <div className="container cart-hero-content">
          <span className="cart-label">Mon Panier</span>
          <h1>Votre Sélection</h1>
          {!isEmpty && (
            <p>{lignes.length} article{lignes.length > 1 ? 's' : ''} dans votre panier</p>
          )}
        </div>
      </section>

      <div className="container">
        {isEmpty ? (
          <div className="cart-empty">
            <div className="empty-icon">🛒</div>
            <h2>Votre panier est vide</h2>
            <p>Découvrez notre sélection et ajoutez vos vins préférés</p>
            <Link to="/products" className="btn btn-primary">Découvrir nos vins</Link>
          </div>
        ) : (
          <div className="cart-layout">
            {/* Left: Items */}
            <div className="cart-items-section">
              <div className="cart-section-header">
                <h2>Articles</h2>
                <button className="clear-cart-btn" onClick={handleClearCart}>
                  Vider le panier
                </button>
              </div>

              <div className="cart-items-list">
                {lignes.map((ligne) => {
                  const prix = ligne.prixUnitaire || ligne.conditionnement?.prixUnitaire || 0
                  const subtotal = prix * ligne.quantite
                  const isUpdating = updatingItems[ligne.id]

                  return (
                    <div key={ligne.id} id={`cart-item-${ligne.id}`} className={`cart-item ${isUpdating ? 'updating' : ''}`}>
                      <div className="cart-item-image">
                        {ligne.produit?.imageUrl ? (
                          <img src={ligne.produit.imageUrl} alt={ligne.produit?.nom} />
                        ) : (
                          <div className="cart-item-placeholder">🍷</div>
                        )}
                      </div>
                      <div className="cart-item-details">
                        <h3 className="cart-item-name">{ligne.produit?.nom || 'Produit'}</h3>
                        {ligne.produit?.domaine && (
                          <p className="cart-item-domaine">
                            {ligne.produit.domaine.nom}
                            {ligne.produit.millesime ? ` · ${ligne.produit.millesime}` : ''}
                          </p>
                        )}
                        {ligne.uniteConditionnement && (
                          <p className="cart-item-cond">
                            Format : {ligne.uniteConditionnement.nom || ligne.uniteConditionnement.type}
                          </p>
                        )}
                        <p className="cart-item-unit-price">{prix.toFixed(2)}€ / unité</p>
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(ligne.id, ligne.quantite - 1)}
                            disabled={ligne.quantite <= 1 || isUpdating}
                          >−</button>
                          <span className="qty-value">{ligne.quantite}</span>
                          <button
                            className="qty-btn"
                            onClick={() => handleQuantityChange(ligne.id, ligne.quantite + 1)}
                            disabled={isUpdating}
                          >+</button>
                        </div>
                        <p className="cart-item-subtotal">{subtotal.toFixed(2)}€</p>
                        <button className="remove-btn" onClick={() => handleRemove(ligne.id)} title="Supprimer">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="cart-summary-section">
              <div className="cart-summary-card">
                <h2>Récapitulatif</h2>

                <div className="summary-lines">
                  <div className="summary-line">
                    <span>Sous-total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                  <div className="summary-line">
                    <span>Livraison</span>
                    <span className="free-delivery">Offerte</span>
                  </div>
                  <div className="summary-divider"></div>
                  <div className="summary-line summary-total">
                    <span>Total</span>
                    <span>{total.toFixed(2)}€</span>
                  </div>
                </div>

                {/* Address Selection */}
                <div className="address-section">
                  <h3>Adresse de livraison</h3>
                  {addresses.length === 0 ? (
                    <div className="no-address">
                      <p>Aucune adresse enregistrée</p>
                      <Link to="/profile" className="add-address-link">+ Ajouter une adresse</Link>
                    </div>
                  ) : (
                    <div className="address-list">
                      {addresses.filter(a => a.type === 'LIVRAISON' || !a.type).map((addr) => (
                        <label key={addr.id} className={`address-option ${selectedAddressId === addr.id ? 'selected' : ''}`}>
                          <input
                            type="radio"
                            name="address"
                            value={addr.id}
                            checked={selectedAddressId === addr.id}
                            onChange={() => setSelectedAddressId(addr.id)}
                          />
                          <div className="address-details">
                            <span className="address-name">
                              {addr.prenom} {addr.nom}
                              {addr.parDefaut && <span className="default-badge">Par défaut</span>}
                            </span>
                            <span className="address-street">{addr.rue}</span>
                            <span className="address-city">{addr.codePostal} {addr.ville}</span>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                {orderError && (
                  <div className="order-error">{orderError}</div>
                )}

                <button
                  className="checkout-btn"
                  onClick={handleCreateOrder}
                  disabled={orderLoading || !selectedAddressId}
                >
                  {orderLoading ? (
                    <span className="btn-loading-text">Commande en cours...</span>
                  ) : (
                    <>Passer la commande — {total.toFixed(2)}€</>
                  )}
                </button>

                <Link to="/products" className="continue-shopping-link">
                  ← Continuer mes achats
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
